const { exec } = require("child_process");

module.exports = function openBrowser(url) {
  const platform = process.platform;
  const cmd =
    platform === "darwin" ? `open "${url}"` : platform === "win32" ? `start "" "${url}"` : `xdg-open "${url}"`;
  exec(cmd, () => {});
};
