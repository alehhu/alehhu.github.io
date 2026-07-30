---
title: "A Pragmatic Guide to Computer Engineering at Politecnico di Milano"
date: 2026-07-30 08:00:00 +0200
categories: [University, Degree Review]
tags: [polimi, computer-engineering, ingegneria-informatica, degree-review, academic-rigor, university-transfer]
description: "An honest course-by-course retrospective on theoretical endurance, degree strategy, and what happens when you decide pure software engineering isn't quite enough math punishment."
math: true
---

If you are reading this, you are likely standing at the exact same crossroads I navigated a few years ago: dissecting Politecnico di Milano's Computer Engineering curriculum and asking whether its intense theoretical grind yields durable engineering value, or if it simply amounts to academic endurance. 

Having completed the Bachelor's degree, my conclusion is clear: the program was profoundly worthwhile, provided you respect what an engineering education is fundamentally designed to achieve. Politecnico did not concern itself with teaching short-lived web frameworks or cloud provider CLI tools—skills whose half-life in industry rarely exceeds three years. Instead, the curriculum forced you to understand computing systems holistically across the entire physical and logical stack: from semiconductor physics and circuit equations up to high-level language runtimes using multivariable calculus, C memory models, and formal systems logic.

If you approach this degree expecting a practical software development bootcamp, you will almost certainly experience friction. However, if your goal is to build an enduring, first-principles technical foundation capable of outlasting industry hype cycles, it represents one of the finest engineering educations available. Below is my comprehensive, course-by-course retrospective—written from the perspective of an engineering student who transferred into Politecnico midway through the degree.

---

## My Story: Transferring in Year 2

Unlike students who spent their freshman year navigating Piazza Leonardo da Vinci* from day one, I transferred to Politecnico di Milano at the start of my second year from Milano-Bicocca. Prior to arriving at Politecnico, I had already completed the standard first-year foundational subjects: single-variable calculus, linear algebra, discrete logic, introductory computer architecture, and core programming principles.

Transferring into Year 2 provided me with a rare comparative lens across two distinct academic environments. Having my first-year credits recognized through credit validation allowed me to step directly into upper-year coursework including Operating Systems, Probability & Estimation, Control Theory, and Software Engineering. However, even with solid preparation, adapting to the degree's exam pacing—specifically the structural choice between progressive midterms and comprehensive session finals—demanded an immediate operational reality check. Politecnico expected a high degree of intellectual independence, mathematical maturity, and self-directed workload management from day one.

> Note on Switching from CS to Engineering: I transferred directly from a pure Computer Science degree into Computer Engineering. I dive into the complete credit validation process, institutional culture shifts, and lessons learned from leaving an 85% software-focused program in a dedicated section at the end of this post.
{: .prompt-info }

*\*Piazza Leonardo da Vinci is the iconic, tree-lined square positioned directly in front of Politecnico's main campus buildings in Milan.*

---

## Program Structure & Degree Mechanics

| Metric | Rating | Pragmatic Take |
| :--- | :--- | :--- |
| Overall Program | 4 / 5 | Rigorous theoretical foundation; highly structured multi-disciplinary curriculum. |
| Difficulty | 4 / 5 | Fast-paced, but thoroughly manageable with disciplined, continuous effort. |
| Theory vs. Practice | 70% / 30% | Heavily weighted toward mathematical modeling, proofs, and first principles. |
| Workload Pacing | High | Demands consistent semester progress over high-risk last-minute cramming. |

In the Italian university system, academic marks range from 18 to 30, with 18 representing the minimum passing threshold. My philosophy toward evaluation was centered on uncompromising mastery: striving to give 100% effort on every subject and engaging deeply with the theoretical foundations. Crucially, securing top marks near 30 is not about rote memorization or learning exam templates by heart. Exam problems are explicitly engineered to test the true depth of your understanding—often presenting novel, non-trivial scenarios that force you to actively reflect, reason through edge cases, and apply first-principles thinking under real-time constraints. Practicing past papers is valuable to understand the analytical rigor expected, but on exam day, success ultimately hinges on genuine problem-solving ability.

That said, execution strategy still mattered immensely. Taking progressive midterms whenever available was always the smartest operational move. Decomposing a massive syllabus into smaller evaluative checkpoints kept feedback loops tight and reinforced mastery incrementally, rather than gambling six months of complex material on a single comprehensive final exam.

> Administrative Essentials: Course materials, assignments, and lecture slides were centralized on WeBeep (the university's Moodle-based portal). Keep a strict eye on Online Services: you must explicitly register for exam sessions at least one week prior to the test date, or the administrative portal will automatically bar you from taking the exam.
{: .prompt-info }

---

## Course-by-Course Breakdown

> Note on Structure: The course retrospectives below are organized into 6 Technical Domain Pillars rather than strict chronological semesters. This domain-centric structure makes it easier to evaluate how Politecnico builds analytical depth across each core engineering discipline. Official Italian course designations are indexed in the Appendix table at the bottom of this post for reference.
{: .prompt-tip }

---

### 1. Mathematics & Physics Foundations

#### Calculus 1
> **TL;DR:** Limits, epsilon-delta rigor, sequences, infinite series, and single-variable differential and integral calculus.

My experience with Calculus 1 was somewhat non-standard because I had already covered computational calculus during high school, with the notable exception of sequences and infinite series. Ironically, sequences and series represented the most abstract and theoretical segment of the syllabus—and precisely the portion I found most intellectually engaging.

While the computational mechanics were not insurmountable, the course demanded significant effort because every concept was constructed as an unyielding, rigorous chain of formal definitions, epsilon-delta proofs, and theorems. Coming from high school where calculus was often taught as a set of mechanical recipes, I found the university's formal mathematical structure captivating. Every notion built logically upon prior axioms like a carefully engineered structure. Overall, it established an essential foundation for formal reasoning.

---

#### Calculus 2
> **TL;DR:** Multivariable calculus, partial derivatives, line and surface integrals, vector fields, differential equations, and series expansions.

Calculus 2 represented the natural, dimensional evolution of single-variable analysis. The core concepts of calculus underwent a structural upgrade: transitioning from 2D planar curves to multivariable functions defining 3D surfaces, manifolds, and vector fields—mathematical models that reflect physical and physical-system realities far more accurately.

Computer engineering students frequently underestimated Calculus 2, but its analytical reach across upper-year courses was immense. It underpinned Robotics (kinematic optimization manifolds and state estimation), Physics (electrodynamic field flux and vector calculus operators), and Probability & Statistics (multivariate continuous joint distributions). My syllabus also covered Fourier Series and Power Series. Although formal complex analysis was omitted from the Bachelor's curriculum, mastering series expansions proved vital in understanding frequency-domain transformations in Electronics and Control Theory.

---

#### Linear Algebra & Geometry
> **TL;DR:** Vector spaces, linear transformations, matrix algebra, Gaussian elimination, eigenvalues, eigenvectors, and quadratic forms.

Linear algebra is often misunderstood by incoming students who confuse it with elementary high school algebra. In reality, it demands a fundamental paradigm shift: learning to reason abstractly about multi-dimensional vector spaces, geometric linear transformations, matrix decompositions, and structural invariants.

Personally, this stood out as one of the most challenging courses of my degree. Geometrically and intuitively, I am far more naturally drawn to continuous calculus than abstract algebraic structures. At my previous university, the exam was notoriously brutal because the professor provided zero past exam papers, requiring exhaustive self-directed problem solving. Speaking with fellow students, Politecnico's Linear Algebra course maintained that exact same uncompromising level of mathematical rigor.

---

#### Logic & Abstract Algebra
> **TL;DR:** Propositional logic, first-order predicate calculus, set theory, Boolean algebras, groups, rings, and algebraic structures.

To this day, I remain somewhat skeptical regarding the direct, day-to-day utility of formal abstract algebra for practical software engineering. That said, its foundational logic components—specifically first-order predicate calculus, resolution rules, and formal proof structures—did unexpectedly resurface later in advanced topics like Artificial Intelligence.

Subjectively, this was a difficult course for me—not because the conceptual material was impossible, but primarily due to a personal lack of engagement with abstract algebraic rings, fields, and group symmetries. Despite low personal interest, securing high marks was entirely achievable if you mastered the underlying logical mechanics and systematically drilled past exam papers.

---

#### Physics 1: Mechanics & Thermodynamics
> **TL;DR:** Newtonian mechanics, rotational dynamics, work-energy theorems, fluid statics, gravitation, harmonic oscillators, and classical thermodynamics.

Beyond classical Newtonian mechanics and thermal systems, our syllabus incorporated comprehensive modules on Fluid Statics and Universal Gravitation. I enjoyed this course immensely, largely due to Professor Bussetti—an absolute legend of an educator. Whenever theoretical edge cases arose, he was remarkably approachable. On one occasion, being pressed for time, he invited me directly into his physics research laboratory so we could continue discussing thermodynamic principles while he conducted lab work.

During my oral examination, Professor Bussetti provided generous, detailed feedback that offered a tremendous confidence boost. That experience earned experimental physicists massive respect in my eyes—especially when contrasted with my far less approachable linear algebra instruction at Bicocca.

---

### 2. Core Computer Science, Software & Data

#### Algorithms & Principles of Computer Science
> **TL;DR:** Core data structures, asymptotic complexity ($O(N)$), automata theory (FSA, PDA, Turing Machines), computability & undecidability, and the individual C algorithm project.

I hold a glowing opinion of this subject because I thoroughly enjoyed it—a passion sparked by an extraordinary professor (Yuri Pirola) at my previous institution. At Bicocca, we participated in weekly 3-hour computer lab sessions implementing algorithmic variants in Java based directly on theoretical lectures. Hands-on implementation taught computer science principles by doing: you instantly understand *why* recursion requires a strict base case the moment your call stack overflows. 

Those lab sessions were intensely competitive and engaging. I fondly remember racing a classmate to see who could complete the lab challenges first under time pressure. Implementing complex linked list variations—navigating pointer manipulation, doubly-linked structures, and circular buffers—was particularly engaging, whereas tree traversal exercises felt somewhat less challenging by comparison.

Beyond classic data structures and asymptotic complexity, the syllabus established a deep foundation in theoretical computer science. For high school students, theoretical CS might sound abstract, but it essentially answers two fundamental questions: *how do we mathematically model a computing system?* and *what are the absolute limits of what computers can ever solve?*

The first major theoretical pillar covered formal models of computation. You learned to model computing devices progressively—starting from simple Finite-State Automata (think of basic machines with zero memory, like a subway turnstile or a vending machine), moving to Pushdown Automata (calculators equipped with a memory stack), and culminating in Turing Machines (the ultimate mathematical abstraction of modern digital computers). It also covered mathematical logic, teaching you to translate real-world system requirements into unyielding logic statements to verify system properties.

The second pillar explored Computability Theory and the Church-Turing thesis, focusing on undecidable problems. This is where computer science meets fundamental philosophy: you formally proved that certain computational problems—such as building a universal program that can inspect *any* code snippet and determine whether it will loop forever or eventually finish—are mathematically impossible for any computer to ever solve.

At my new institution, the program did not offer matching hands-on lab sessions for this course, likely because accommodating physical lab space for several thousand engineering students presented immense logistical constraints. However, the engineering department embedded an individual C programming project evaluated by an automated online benchmark server hosted by the faculty. Your code was benchmarked against strict memory allocation limits and execution time bounds across massive test suites.

I dedicated significantly more time to this project than strictly required, using the project window as an intensive hands-on sandbox to build deep operational fluency with Linux development tools—specifically GDB debugging, Valgrind memory leak profiling, and bash automation scripts. That investment in low-level CLI tooling yielded permanent dividends for my software development habits.

When the project prompt was released, I initially made the mistake of listening to classmates' implementation advice. Following their recommended architecture dragged me into a technical dead end where I could not reduce execution time without causing memory bloat—to the point where the automated benchmark server rejected my submission. Realizing the consensus trap, I discarded their advice entirely and reverted to my original architectural intuition—the exact approach my peers had warned against. Without needing minor micro-optimizations, my original implementation jumped instantly on the automated server from a failing grade straight to a 30 e Lode (30L).

> Key Takeaway: Never allow yourself to be swayed by peer noise or groupthink. When tackling complex technical challenges, clear out the distractions, trust your first-principles intuition, and solve the problem with your own head.
{: .prompt-tip }

---

#### Software Engineering
> **TL;DR:** Object-Oriented design in Java, SOLID principles, Design Patterns, JML specifications, and a distributed Java board game team project.

I frankly hated this course. The curriculum felt rigid, and the evaluation criteria were largely disconnected from modern, real-world engineering practices. In fact, the frustration experienced in this course served as a primary catalyst that encouraged me to look outside pure software engineering when selecting my Master's degree specialization.

A massive portion—accounting for fully 50% of the final exam grade—was dedicated to JML (Java Modeling Language). Memorizing JML syntax for formal contract specifications felt like an academic exercise with virtually zero practical utility in production software development. While reasoning about invariants, preconditions, and postconditions is important—resembling `assert` statements in automated testing—dedicating half an engineering exam to formal JML syntax was entirely unnecessary to convey that intuition.

The group project—building a distributed, networked turn-based board game in Java utilizing an Model-View-Controller (MVC) architecture—was enjoyable from a teamwork perspective. However, the project structure badly needed modernization. Every student team was required to implement essentially the exact same board game. It would have been far more compelling to provide teams with open-ended, modern engineering project options. Overall, the course was not intellectually difficult, just frustrating due to course design choices.

---

#### Database Systems
> **TL;DR:** Relational algebra, Datalog, complex SQL queries, Entity-Relationship (ER) conceptual & logical design, normalization (BCNF/3NF), and transaction management.

Another deeply frustrating course. Along with Software Engineering, Database Systems contributed to my growing disillusionment with pure Computer Science as taught in academia, especially when compared to more mature engineering branches like Mechanical or Chemical Engineering.

The exam was split into two distinct halves: formal querying (writing queries in Relational Algebra, Datalog, and complex SQL with artificial edge cases) and conceptual/logical ER design (normalizing database schemas to 3NF/BCNF). I actually achieved a perfect score on this exam, yet I still could not bring myself to respect how the material was framed and delivered. While not quite as poorly designed as Software Engineering, it was easily among the most tedious subjects in the program.

---

#### Information Systems
> **TL;DR:** Business Process Model and Notation (BPMN), ArchiMate enterprise architecture modeling, and textbook IT management theory.

I strongly disliked this course. While enterprise IT architecture, business process execution, and organizational workflows could theoretically be fascinating subjects, the lecture methodology and content delivery were terrible. Ultimately, the exam boiled down to memorizing a single textbook cover-to-cover and performing basic modeling exercises in BPMN and ArchiMate.

---

### 3. Computer Systems, Architecture & Networks

#### Digital Logic Design
> **TL;DR:** Boolean minimization (Karnaugh maps, Quine-McCluskey), binary arithmetic (Booth algorithm, IEEE 754 float32), sequential FSM optimization (Paul-Unger method), and the individual digital hardware project.

I actually appreciated the core content of this course quite a bit. The syllabus covered Boolean function minimization using Karnaugh maps and the Quine-McCluskey algorithm, data representation through Booth's multiplication and IEEE 754 floating-point standards, heuristic logic reduction to minimize silicon footprint, and sequential finite-state machine (FSM) synthesis via the Paul-Unger method.

The problem-solving methodology was heavily practical, but in a manual sense: you spent considerable time solving Quine-McCluskey minimizations by hand and drawing digital logic circuit schematics on paper. While I valued mastering these manual mechanics, I wished the lectures had explored the theoretical rationale deeper—exploring the fundamental reasons *why* silicon synthesis behaves the way it does, alongside practical industrial applications using hardware description languages like VHDL.

Importantly, Digital Logic Design featured one of the three major graduation projects required for the Bachelor's degree. The project required designing a custom digital hardware module—specifically a finite-state machine interacting with a memory unit under strict clock cycles dictated by a verification testbench. Passing the testbench was only the baseline; the final grade hinged heavily on a mandatory technical report where the professor scrutinized our experimental analysis, timing performance, and critical interpretation of the simulation results.

---

#### Computer Architecture & Operating Systems
> **TL;DR:** Assembly language, CPU logic gates, memory hierarchy, processes, threads, virtual memory paging, and OS kernels.

I enjoyed this course immensely. Having completed *Computer Architecture* at Bicocca, I initially found low-level hardware concepts difficult simply because I was not accustomed to analyzing computing systems from such a granular, silicon-adjacent perspective. However, once assembly instructions, CPU registers, execution datapaths, and cache hierarchies clicked, you permanently stopped treating computers as magic black boxes.

The Operating Systems half covered process scheduling, thread synchronization, semaphores, and virtual memory paging. As an active Arch Linux user with a deep interest in low-level systems, understanding kernel resource allocation and concurrency directly matched my technical passions.

---

#### Computer Networks & Internet Protocol
> **TL;DR:** OSI layer model, TCP/IP protocols, socket programming, routing algorithms, and network packet analysis.

To be blunt, this course felt like a total giveaway grade—easily the least demanding exam in the entire curriculum. The instruction felt disengaged, presenting the course through a fragmented format split across four separate midterms, padded with online quizzes explicitly designed to stack bonus points.

Because the delivery was so disengaged, I found the content uninspiring. Computer networking is a fundamental pillar of modern systems engineering, making it disappointing that this course urgently requires a ground-up redesign by Politecnico. Take full advantage of the easy points: complete every online assignment, and pass all 4 midterms as they occur—the comprehensive session final is far less forgiving by comparison.

---

### 4. Circuits, Electronics, Signals & Control

#### Electrical Engineering & Circuit Theory
> **TL;DR:** Kirchhoff laws, AC/DC circuit analysis, phasors, Thévenin/Norton equivalents, power calculations, and electromagnetism fundamentals for circuit components.

Electrical Engineering introduced a formal mathematical framework for modeling electrical circuits and component interactions under DC and AC steady-state conditions. Attending theoretical lectures was largely skippable for exam preparation—even though the professor, Paolo Maffezzoni, was exceptionally skilled and friendly. Be aware that the exam included a theoretical quiz testing conceptual details, including electromagnetism fundamentals for inductors, capacitors, and magnetic coupling.

---

#### Fundamentals of Electronics
> **TL;DR:** Diodes, MOSFETs, OP-AMPs, signal amplification, ADC/DAC conversion, Sample & Hold, frequency response, Slew Rate, Schmitt triggers, and feedback loop stability ($G_{\text{loop}}$).

This course covered semiconductor physics (Diodes, MOSFETs), Operational Amplifiers (OP-AMPs), signal amplification stages, Digital-to-Analog (DAC) and Analog-to-Digital (ADC) conversion, Sample & Hold circuits, non-ideal OP-AMP frequency responses, Slew Rate limits, Schmitt triggers, and loop gain ($G_{\text{loop}}$) feedback stability analysis backed by formal mathematical proofs.

I found the course genuinely interesting, even though analog electronics fell outside my primary specialization. It clearly demonstrated Politecnico's educational philosophy: providing a comprehensive understanding across the entire vertical stack—from physical silicon and analog signals up to software abstractions. The exam ended up being manageable, but *only* after intensive preparation. Initially, the problem formulations looked like complete gibberish.

---

#### Probability, Stochastic Processes & Estimation
> **TL;DR:** Probability theory, random variables, Central Limit Theorem, stochastic processes (Poisson/Bernoulli), Bayesian estimation (MAP, MMSE, LMMSE), Monte Carlo simulation, and Information Theory basics.

Politecnico offered two track options: Information & Estimation and Probability & Statistics. Both shared a common foundation in probability theory before diverging in the second half. I selected Information & Estimation.

Part 1 covered random variables, expectations, transformations, joint distributions, and the Central Limit Theorem. Probability could initially feel unintuitive if your multivariable calculus foundation was shaky; the key to mastering it was mapping probability density definitions geometrically to multivariable integration spaces.

Part 2 focused on Bernoulli and Poisson processes, followed by a rigorous Bayesian estimation framework—including Maximum A Posteriori (MAP), Minimum Mean Square Error (MMSE), and Linear MMSE (LMMSE) estimators to resolve computational complexity bounds. It also covered Monte Carlo simulation, Importance Sampling, continuous distribution sampling, and a brief intro to Information Theory. I thoroughly enjoyed the estimation framework!

---

#### Control Theory & Dynamic Systems
> **TL;DR:** Linear time-invariant systems, Laplace transforms, transfer functions, stability analysis, Bode plots, and feedback control loops.

I really enjoyed this course. The concepts built great general engineering literacy. Even if you do not design PID controllers or transfer functions daily in software engineering, they provide essential intuition for robotics, industrial automation, and dynamic system modeling.

The professor, Alessandro Falsone, was outstanding—extremely engaging and remarkably adept at breaking down complex control theory into intuitive engineering concepts. Thanks to clear lectures and logical structure, the course was very accessible.

---

### 5. Business & Economics

#### Economics and Business Administration
> **TL;DR:** Financial accounting (balance sheets/income statements), microeconomics (supply/demand, market structures), international economics, and global institutions.

I have always maintained a personal interest in economics outside of university. However, when we encountered financial accounting, I initially struggled because its logic was completely different from engineering mathematics. Once I worked through accounting principles independently, I grew to deeply appreciate that segment—and the course as a whole. As I like to say: *economic principles stay with you permanently, because we live in a world governed by economic reality.*

Our professor updated the syllabus during our year, incorporating fascinating modules on International Economics: mercantilism, free trade, absolute vs. comparative advantage (Adam Smith, David Ricardo), and global institutions (WTO, IMF, World Bank, European Union). Studying supply, demand, market equilibrium, perfect competition, and monopoly was eye-opening—demonstrating how simple market curves explain why pure competition can squeeze firm profit margins down to zero.

---

### 6. Elective Specializations

#### Applied Thermodynamics & Heat Transfer
> **TL;DR:** Applied thermodynamic cycles (Otto, Diesel, Brayton, Rankine, Refrigeration), heat transfer (conduction, convection, radiation), and black body physics.

| Metric | Rating |
| :--- | :--- |
| Difficulty | 2 / 5 |
| Utility | 3.5 / 5 (Fascinating applied physics; bridges mechanical engineering and energy systems) |

At the start of my second year, I was somewhat skeptical about committing 100% to pure computer science. I had always been deeply fascinated by engines, machines, and mechanical systems. In fact, when transferring to Politecnico, I was genuinely torn between Computer Engineering and Mechanical Engineering. Selecting Applied Thermodynamics from the restricted elective pool reflected that mechanical curiosity.

I enjoyed this course tremendously. It evolved the theoretical thermodynamics from Physics 1 into practical power cycles: Diesel, Otto (gasoline), Brayton (gas turbines), Rankine (steam power plants), and vapor-compression Refrigeration. It also covered heat transfer fundamentals (conduction, convection, radiation, black body physics). While the heat transfer module felt slightly rushed toward the end of the semester, the content was thoroughly engaging and the exam was straightforward.

---

#### Foundations of Artificial Intelligence
> **TL;DR:** Classical AI search (A*, Minimax/Alpha-Beta, CSPs), symbolic logic planning, Bayesian networks under uncertainty, and foundational Reinforcement Learning (Bellman equations).

| Metric | Rating |
| :--- | :--- |
| Difficulty | 2.5 / 5 |
| Utility | 3 / 5 (Mixed feelings; foundational historical overview of classic pre-deep learning AI) |

This course covered classical AI foundations—primarily symbolic and algorithmic approaches that have largely been superseded by modern deep learning and statistical methods.

I did not care much for the logical AI and classical planning modules, though having them for historical context was fine. Search algorithms (Minimax, Alpha-Beta, CSPs) were decent, and the uncertainty module covering Bayesian Networks was interesting (though I wished for deeper coverage).

The highlight was the introduction to Reinforcement Learning (RL). Even though it focused on core theoretical foundations—Markov Decision Processes, Bellman expectation equations, value iteration—it established a solid mental framework. It clarified that RL shines in discrete action spaces over time for learning optimal control policies or dynamic tuning—such as dynamically learning optimal scaling parameters for an application cluster.

The biggest drawback was the exam format, which devolved into a raw memory contest. The material itself was not difficult, but testing memorization over problem-solving understanding was a missed educational opportunity.

---

#### Robotics
> **TL;DR:** SLAM (Graph SLAM, FastSLAM), localization, custom kinematic action/sensor models, ROS 2 integration, trajectory planning, and autonomous robot navigation projects.

| Metric | Rating |
| :--- | :--- |
| Difficulty | 3.5 / 5 |
| Utility | 5 / 5 (Outstanding applied robotics course combining cutting-edge theory with ROS 2 projects) |

I thoroughly loved this course! The syllabus largely followed Sebastian Thrun’s classic textbook *Probabilistic Robotics*, diving into Simultaneous Localization and Mapping (SLAM), Graph SLAM, Online vs. Full SLAM, and FastSLAM algorithms.

A standout feature was the theoretical derivation of Sensor and Action Models. Rather than relying strictly on generic textbook equations, the professor derived custom physical and geometric action models for differential wheeled vehicles, tracked tanks, and crawling vehicles directly from first-principles mechanics and geometry.

The course transitioned entirely to ROS 2 during our year, incorporating two hands-on practical projects:
1. Odometry Verification: Calculating wheel odometry from sensor streams and benchmarking estimated poses against ground-truth trajectories recorded in ROS bag files (`.bag`).
2. Autonomous Navigation Pipeline: Synthesizing an occupancy grid map from raw sensor bag data recorded live by the professor running mobile robots in the lab, then implementing localization, motion control, and path planning to autonomously navigate the robot to 10 sequential goal targets.

Easily one of the most satisfying and well-executed electives in the entire degree program.

---

#### Computer Engineering Research Project
> **TL;DR:** Research-oriented elective project supervised by Prof. Danilo Ardagna, focusing on Reinforcement Learning autoscaling for Serverless FaaS video-search pipelines.

| Metric | Rating |
| :--- | :--- |
| Difficulty | 4 / 5 |
| Utility | 5 / 5 (High-impact research experience in serverless infrastructure & RL control) |

The university allowed students to select their 5-CFU engineering project from an official project registry portal ([pii.dei.polimi.it](https://pii.dei.polimi.it/)). My rationale was straightforward: standard software development projects could be built independently in my private time. I deliberately selected a research-oriented project to tackle open problems alongside university faculty.

Supervised by Professor Danilo Ardagna, my project focused on autoscaling Function-as-a-Service (FaaS) serverless applications using Reinforcement Learning. The workload was a multi-stage serverless video-search pipeline—processing video files to search for text strings by transcribing and analyzing audio tracks across sequential serverless pipeline functions.

Designing RL agents to dynamically manage horizontal pod autoscaling and resource allocation across FaaS functions under fluctuating request loads was a deeply rewarding research experience.

*(I will publish a detailed, dedicated technical post about this research project and its baseline benchmarks in the future—stay tuned for the link!)*

---

## Switching from CS to Engineering: Why I Transferred & Lessons Learned

Here is the complete retrospective on my transfer from pure Computer Science at Milano-Bicocca to Computer Engineering at Politecnico di Milano.

### Breaking Out of an 85% Software Box
At Bicocca, after completing my first year, I encountered a major curriculum constraint. Heading into Year 2, the program forced a restrictive choice: you could pick only *one* subject among Numerical Analysis, *Calculus 2*, OR *Physics 1*. You could not take all three. The degree was designed to be roughly 85% focused on software development—essentially a software engineering degree under a CS label.

I was deeply dissatisfied with that limitation. I genuinely missed studying physics and did not want to abandon rigorous mathematics. Deep mathematical and physical foundations are the true engine behind advanced computer science and hardware-software systems.

Furthermore, I have always been fascinated by the ideal of being a polymath—a multidisciplinary technical mind in the spirit of Leonardo da Vinci. I wanted a foundational engineering background so robust that, if I ever wanted to pivot into mechanical, aerospace, chemical, or electrical engineering during my adult life, I could do so with only a handful of bridge courses. Switching to Computer Engineering gave me that interdisciplinary baseline across the entire vertical stack.

### The Bureaucracy & 51-ECTS Convalida
I finished my first year at Bicocca with a 28.51 / 30 GPA, passing every required freshman exam. Because course syllabi rarely align 1:1 across universities, I initially feared the committee would validate a meager 30 credits, forcing me to repeat a semester.

To my relief, Politecnico granted me 51 ECTS credits out of 60. They even validated the combined *Computer Architecture & Operating Systems* course in full, despite my previous university covering only the architecture module. I am convinced my top-tier freshman GPA persuaded the evaluation committee not to penalize me with unnecessary retakes.

However, the administrative timeline was a nerve-wracking ordeal. The official credit validation arrived literally days before lectures started—I finalized my enrollment on a Friday, and classes began the following Monday!

### Lessons for Transfer Students

1. Start Early (May): If you plan to transfer, formulate your decision by May. Gathering syllabi, requesting official transcripts, and navigating credit validation procedures requires substantial lead time.
2. Never Treat High Grades as Optional: Students often claim *"grades don't matter, only understanding matters."* But how can anyone claim deep understanding if their evaluation results in a mediocre grade? Maintaining a high GPA was the single most convincing factor in securing 51 ECTS credits during my transfer.
3. Embrace the Breadth: Moving to engineering expands your scope beyond software into circuit theory (*Electrical Engineering*), analog electronics, signal processing, and physical dynamics. Even subjects I initially doubted (like analog electronics) became deeply rewarding once I understood their engineering purpose.

If you are torn between pure CS and Computer Engineering, know your own priorities. Friends who stayed in CS did so because they truly loved software development and wanted to concentrate strictly on code—a completely valid choice. But if you crave interdisciplinary breadth, hardware-software mechanics, and first-principles technical depth, transferring to Politecnico di Milano is one of the best moves you can make.

---

## Appendix: Chronological Curriculum Roadmap

For prospective students planning their study path, below is the year-by-year layout of the BSc in Computer Engineering at Politecnico di Milano, including the official Italian titles listed in Polimi's *Manifesto degli Studi*:

| Period | Primary English Title | Italian Title (*Manifesto degli Studi*) | Core Focus |
| :--- | :--- | :--- | :--- |
| **Year 1** | **Calculus 1** | *Analisi Matematica 1* | Single-variable Calculus & Series |
| | **Linear Algebra & Geometry** | *Geometria e Algebra Lineare* | Vector Spaces & Matrix Algebra |
| | **Physics 1** | *Fisica 1* | Mechanics & Classical Thermodynamics |
| | **Electrical Engineering** | *Elettrotecnica* | Circuit Analysis & Phasors |
| | **Computer Networks & Internet** | *Reti di Calcolatori / Reti Internet* | TCP/IP Networks & Protocols |
| **Year 2** | **Calculus 2** | *Analisi Matematica 2* | Multivariable Calculus & Vector Fields |
| | **Computer Architecture & OS** | *Architettura dei Calcolatori e Sistemi Operativi* | Low-Level Systems & OS Kernels |
| | **Logic & Abstract Algebra** | *Logica e Algebra* | Propositional Logic & Abstract Structures |
| | *Applied Thermodynamics* (Elective) | *Fisica Tecnica* | Applied Power Cycles & Heat Transfer |
| | **Algorithms & Graduation Project** | *Algoritmi e Principi dell'Informatica (API)* | Data Structures & C Algorithm Project |
| | **Probability, Stochastic Processes & Estimation** | *Informazione e Stima* | Probability & Bayesian Estimation |
| | **Control Theory & Dynamic Systems** | *Teoria dei Sistemi e del Controllo (Automatica)* | Control Theory & Transfer Functions |
| **Year 3** | **Fundamentals of Electronics** | *Fondamenti di Elettronica* | Analog Signals, MOSFETs & OP-AMPs |
| | **Digital Logic Design** | *Reti Logiche* | Silicon Logic, FSMs & Hardware Project |
| | **Software Engineering** | *Ingegneria del Software* | Java OO Design & JML Specs |
| | **Information Systems** | *Sistemi Informativi* | Enterprise Architecture & BPMN |
| | **Database Systems** | *Basi di Dati* | Relational Algebra & ER Design |
| | *Foundations of Artificial Intelligence* (Elective) | *Fondamenti di Intelligenza Artificiale* | Search, Logic & RL Foundations |
| | **Economics & Business Administration** | *Economia e Organizzazione Aziendale* | Accounting & Microeconomics |
| | *Robotics* (Elective) | *Robotica* | SLAM, ROS 2 & Autonomous Navigation |
| | *Research Project* (5 CFU Elective) | *Progetto di Ingegneria Informatica* | Serverless FaaS & RL Research Project |

---

## Retrospective: Why First Principles Matter

### 1. Knowledge Durability
High-level software frameworks and cloud tools change constantly. Low-level fundamentals—operating system concurrency, linear algebra, relational calculus, and network protocols—remain relevant for decades.

### 2. Analytical Confidence
When a production system fails, understanding memory layouts, CPU scheduling, and network latency allows you to diagnose root causes systematically instead of guessing or applying random fixes.

---

## Practical Takeaways

1. Handle Credit Validation Early: Submit detailed course syllabi to academic advisors immediately upon transfer.
2. Adopt Midterm Pacing: Do not wait for final exam sessions. Prepare for midterms from Week 1.
3. Use Past Exams: Engineering exams follow consistent structural patterns. Solving past papers is the most effective preparation method.
4. Value Progress Over Perfection: Pass your exams, maintain a steady routine, and complete your degree efficiently.

---

## Conclusion

The **BSc in Computer Engineering at Politecnico di Milano** was an intellectually disciplined, theoretically grounded program. It demanded consistency and rewarded first-principles thinking.

If you value engineering fundamentals and want a technical foundation that ages well, it is a sound choice.
