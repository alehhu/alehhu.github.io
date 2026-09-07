(function () {
  "use strict";

  var viewList = document.getElementById("view-list");
  var viewEditor = document.getElementById("view-editor");
  var pagesListEl = document.getElementById("pages-list");
  var postsListEl = document.getElementById("posts-list");
  var portfolioListEl = document.getElementById("portfolio-list");
  var listError = document.getElementById("list-error");

  var fieldTitle = document.getElementById("field-title");
  var fieldDate = document.getElementById("field-date");
  var fieldTags = document.getElementById("field-tags");
  var fieldExcerpt = document.getElementById("field-excerpt");
  var fieldDraft = document.getElementById("field-draft");
  var fieldDateWrap = document.getElementById("field-date-wrap");
  var fieldTagsWrap = document.getElementById("field-tags-wrap");
  var fieldExcerptWrap = document.getElementById("field-excerpt-wrap");
  var fieldDraftWrap = document.getElementById("field-draft-wrap");
  var editorStatus = document.getElementById("editor-status");
  var btnToggleDraft = document.getElementById("btn-toggle-draft");
  var btnDelete = document.getElementById("btn-delete");
  var preview = document.getElementById("preview");

  var PAGE_TITLES = { home: "Home", cv: "CV" };

  // current item being edited:
  //  - page:       { kind: 'page', name, isNew: false }
  //  - post/entry: { kind: 'item', filename, collection, draft, isNew }
  var current = null;

  var cm = CodeMirror.fromTextArea(document.getElementById("markdown-source"), {
    mode: "markdown",
    lineWrapping: true,
    lineNumbers: false,
  });

  // --- math protection (mirrors admin/lib/render.js so the preview matches the published site) ---
  function protectMath(src) {
    var blocks = [];
    var out = src.replace(/\$\$([\s\S]+?)\$\$/g, function (_, expr) {
      blocks.push({ display: true, expr: expr });
      return "@@MATHBLOCK" + (blocks.length - 1) + "@@";
    });
    out = out.replace(/\$([^\n$]+?)\$/g, function (_, expr) {
      blocks.push({ display: false, expr: expr });
      return "@@MATHBLOCK" + (blocks.length - 1) + "@@";
    });
    return { out: out, blocks: blocks };
  }

  function restoreMath(html, blocks) {
    return html.replace(/@@MATHBLOCK(\d+)@@/g, function (_, idxStr) {
      var block = blocks[Number(idxStr)];
      if (!block) return "";
      var esc = block.expr.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return block.display ? "$$" + esc + "$$" : "$" + esc + "$";
    });
  }

  function renderMarkdown(src) {
    var protectedSrc = protectMath(src);
    var html = marked.parse(protectedSrc.out);
    return restoreMath(html, protectedSrc.blocks);
  }

  var previewTimer = null;
  function updatePreview() {
    clearTimeout(previewTimer);
    previewTimer = setTimeout(function () {
      preview.innerHTML = renderMarkdown(cm.getValue());
      if (window.renderMathInElement) {
        renderMathInElement(preview, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
          ],
          throwOnError: false,
        });
      }
    }, 200);
  }
  cm.on("change", updatePreview);

  // --- API helpers ---
  function api(method, url, body) {
    return fetch(url, {
      method: method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    }).then(function (res) {
      if (!res.ok) {
        return res.json().then(function (err) {
          throw new Error(err.error || res.statusText);
        });
      }
      return res.status === 204 ? null : res.json();
    });
  }

  function todayISO() {
    return new Date().toISOString().slice(0, 10);
  }

  // --- list view ---
  function renderItemRow(item) {
    var row = document.createElement("div");
    row.className = "item-row";

    var title = document.createElement("span");
    title.className = "title";
    title.textContent = item.title || item.filename;
    row.appendChild(title);

    if (item.date) {
      var date = document.createElement("span");
      date.className = "date";
      date.textContent = item.date;
      row.appendChild(date);
    }

    if (item.draft) {
      var badge = document.createElement("span");
      badge.className = "badge draft";
      badge.textContent = "draft";
      row.appendChild(badge);
    }

    var editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = function () {
      openEditor(item.filename, item.collection, item.draft);
    };
    row.appendChild(editBtn);

    return row;
  }

  function renderPageRow(name, title) {
    var row = document.createElement("div");
    row.className = "item-row";

    var titleEl = document.createElement("span");
    titleEl.className = "title";
    titleEl.textContent = title;
    row.appendChild(titleEl);

    var editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = function () {
      openPage(name);
    };
    row.appendChild(editBtn);

    return row;
  }

  function loadList() {
    listError.hidden = true;
    pagesListEl.innerHTML = "";
    postsListEl.innerHTML = "";
    portfolioListEl.innerHTML = "";

    Object.keys(PAGE_TITLES).forEach(function (name) {
      pagesListEl.appendChild(renderPageRow(name, PAGE_TITLES[name]));
    });

    Promise.all([
      api("GET", "/api/posts?collection=posts&include_drafts=true"),
      api("GET", "/api/posts?collection=portfolio"),
    ])
      .then(function (results) {
        var posts = results[0];
        var portfolio = results[1];
        posts.sort(function (a, b) {
          return (b.date || "").localeCompare(a.date || "");
        });
        if (!posts.length) {
          postsListEl.innerHTML = "<p>No posts yet.</p>";
        } else {
          posts.forEach(function (item) {
            postsListEl.appendChild(renderItemRow(item));
          });
        }
        if (!portfolio.length) {
          portfolioListEl.innerHTML = "<p>No projects yet.</p>";
        } else {
          portfolio.forEach(function (item) {
            portfolioListEl.appendChild(renderItemRow(item));
          });
        }
      })
      .catch(function (err) {
        listError.hidden = false;
        listError.textContent = "Error loading content: " + err.message;
      });
  }

  function showList() {
    current = null;
    viewEditor.hidden = true;
    viewList.hidden = false;
    loadList();
  }

  // --- editor view ---
  function fillForm(frontmatter) {
    fieldTitle.value = (frontmatter && frontmatter.title) || "";
    fieldDate.value = (frontmatter && frontmatter.date) || todayISO();
    fieldTags.value = (frontmatter && frontmatter.tags) ? [].concat(frontmatter.tags).join(", ") : "";
    fieldExcerpt.value = (frontmatter && frontmatter.excerpt) || "";
  }

  function readForm() {
    var tags = fieldTags.value
      .split(",")
      .map(function (t) { return t.trim(); })
      .filter(Boolean);
    return {
      title: fieldTitle.value.trim(),
      date: fieldDate.value || todayISO(),
      tags: tags,
      excerpt: fieldExcerpt.value.trim(),
    };
  }

  function setPageMode(isPage) {
    fieldDateWrap.hidden = isPage;
    fieldTagsWrap.hidden = isPage;
    fieldExcerptWrap.hidden = isPage;
    fieldDraftWrap.hidden = isPage;
  }

  function updateToggleDraftButton() {
    if (!current || current.kind !== "item" || current.isNew || current.collection !== "posts") {
      btnToggleDraft.hidden = true;
      return;
    }
    btnToggleDraft.hidden = false;
    btnToggleDraft.textContent = current.draft ? "Publish" : "Move to drafts";
  }

  function openEditor(filename, collection, draft) {
    listError.hidden = true;
    api("GET", "/api/posts/" + encodeURIComponent(filename) + "?collection=" + collection + "&draft=" + !!draft)
      .then(function (data) {
        current = { kind: "item", filename: filename, collection: collection, draft: !!draft, isNew: false };
        setPageMode(false);
        fillForm(data.frontmatter);
        fieldDraft.checked = !!draft;
        fieldDraft.disabled = collection !== "posts";
        cm.setValue(data.body || "");
        editorStatus.textContent = filename;
        btnDelete.hidden = false;
        updateToggleDraftButton();
        viewList.hidden = true;
        viewEditor.hidden = false;
        cm.refresh();
        updatePreview();
      })
      .catch(function (err) {
        listError.hidden = false;
        listError.textContent = "Error opening item: " + err.message;
      });
  }

  function openPage(name) {
    listError.hidden = true;
    api("GET", "/api/pages/" + encodeURIComponent(name))
      .then(function (data) {
        current = { kind: "page", name: name, isNew: false };
        setPageMode(true);
        fillForm(data.frontmatter);
        cm.setValue(data.body || "");
        editorStatus.textContent = PAGE_TITLES[name] || name;
        btnDelete.hidden = true;
        btnToggleDraft.hidden = true;
        viewList.hidden = true;
        viewEditor.hidden = false;
        cm.refresh();
        updatePreview();
      })
      .catch(function (err) {
        listError.hidden = false;
        listError.textContent = "Error opening page: " + err.message;
      });
  }

  function newItem(collection) {
    current = { kind: "item", filename: null, collection: collection, draft: false, isNew: true };
    setPageMode(false);
    fillForm(null);
    fieldDraft.checked = false;
    fieldDraft.disabled = collection !== "posts";
    cm.setValue("");
    editorStatus.textContent = collection === "posts" ? "New post" : "New project";
    btnDelete.hidden = true;
    updateToggleDraftButton();
    viewList.hidden = true;
    viewEditor.hidden = false;
    cm.refresh();
    updatePreview();
    fieldTitle.focus();
  }

  function save() {
    var form = readForm();
    if (!form.title) {
      alert("Title is required.");
      return;
    }
    var body = cm.getValue();

    if (current.kind === "page") {
      api("PUT", "/api/pages/" + encodeURIComponent(current.name), {
        frontmatter: { title: form.title },
        body: body,
      })
        .then(function () {
          editorStatus.textContent = (PAGE_TITLES[current.name] || current.name) + " — saved";
        })
        .catch(function (err) {
          alert("Error saving: " + err.message);
        });
      return;
    }

    if (current.isNew) {
      api("POST", "/api/posts", {
        title: form.title,
        date: form.date,
        tags: form.tags,
        excerpt: form.excerpt,
        draft: current.collection === "posts" ? fieldDraft.checked : false,
        body: body,
        collection: current.collection,
      })
        .then(function (res) {
          current.filename = res.filename;
          current.isNew = false;
          current.draft = current.collection === "posts" ? fieldDraft.checked : false;
          editorStatus.textContent = res.filename + " — saved";
          btnDelete.hidden = false;
          updateToggleDraftButton();
        })
        .catch(function (err) {
          alert("Error saving: " + err.message);
        });
    } else {
      var frontmatter = { title: form.title, date: form.date };
      if (form.tags.length) frontmatter.tags = form.tags;
      if (form.excerpt) frontmatter.excerpt = form.excerpt;
      api("PUT", "/api/posts/" + encodeURIComponent(current.filename), {
        frontmatter: frontmatter,
        body: body,
        draft: current.draft,
        collection: current.collection,
      })
        .then(function () {
          editorStatus.textContent = current.filename + " — saved";
        })
        .catch(function (err) {
          alert("Error saving: " + err.message);
        });
    }
  }

  function toggleDraft() {
    if (!current || current.kind !== "item" || current.isNew) return;
    var to = current.draft ? "posts" : "drafts";
    api("POST", "/api/posts/" + encodeURIComponent(current.filename) + "/move", { to: to })
      .then(function (res) {
        current.filename = res.filename;
        current.draft = to === "drafts";
        fieldDraft.checked = current.draft;
        editorStatus.textContent = res.filename + (current.draft ? " — moved to drafts" : " — published");
        updateToggleDraftButton();
      })
      .catch(function (err) {
        alert("Error: " + err.message);
      });
  }

  function remove() {
    if (!current || current.kind !== "item" || current.isNew) return;
    if (!confirm("Permanently delete this content?")) return;
    api(
      "DELETE",
      "/api/posts/" + encodeURIComponent(current.filename) + "?collection=" + current.collection + "&draft=" + current.draft
    )
      .then(function () {
        showList();
      })
      .catch(function (err) {
        alert("Error deleting: " + err.message);
      });
  }

  document.getElementById("btn-new-post").onclick = function () { newItem("posts"); };
  document.getElementById("btn-new-project").onclick = function () { newItem("portfolio"); };
  document.getElementById("btn-back").onclick = showList;
  document.getElementById("btn-save").onclick = save;
  document.getElementById("btn-delete").onclick = remove;
  btnToggleDraft.onclick = toggleDraft;

  showList();
})();
