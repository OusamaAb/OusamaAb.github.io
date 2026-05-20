window.OUSAMA = {
  email: "OusamaHAlabdullah@gmail.com",
  github: "https://github.com/OusamaAb",
  linkedin: "https://www.linkedin.com/in/ousama-alabdullah/",
  about: [
    "I am a Software Engineering graduate from Toronto Metropolitan University with experience in software development, data engineering, cloud technologies, and AI-powered applications.",
    "I have worked on backend systems, full-stack web apps, computer vision, distributed systems, automation scripts, and real-time data processing.",
    "I enjoy building practical software, especially when it involves working with data, creating useful systems, and solving real problems."
  ],
  now: [
    "Building Football Pick'ems, a friend-league app for predicting match outcomes, scorelines, and goalscorers across a season.",
    "Working toward the AWS Solutions Architect and AWS Machine Learning certifications, building on my Cloud Practitioner and AI Practitioner foundations.",
    "Integrating AI into my daily workflow: optimizing how I use Codex, Claude Code, and Cursor, and keeping up with the wider AI tooling landscape as it evolves."
  ],
  projects: [
    {
      id: "breakeven",
      title: "BreakEven",
      tag: "Full-stack · Finance",
      year: "2026",
      blurb: "A daily allowance budgeting app with carryover, expense tracking, and ledger-style summaries kept consistent on the backend.",
      detail: [
        "React frontend, Ruby on Rails backend, PostgreSQL through Supabase, Google OAuth sign-in, and JWT-protected APIs.",
        "Centralizes budget and carryover math on the server so summaries stay authoritative under edits and backdated expenses.",
        "Precomputed ledger paths keep the UI stable without recalculating on every navigation."
      ],
      stack: ["React", "Rails", "PostgreSQL", "Supabase", "OAuth", "JWT"],
      links: [
        { label: "Live demo", href: "https://breakeven-frontend.onrender.com/" },
        { label: "GitHub", href: "https://github.com/OusamaAb/BreakEven" }
      ]
    },
    {
      id: "nao-robot",
      title: "Chat with NAO",
      tag: "Robotics · Capstone",
      year: "2025 – 2026",
      blurb: "Fourth-year engineering design capstone: a NAO humanoid that talks, recognizes faces, identifies songs, and dances using laptop-side AI services.",
      detail: [
        "On-robot state machine in Python 2.7 with NAOqi runs four modes: idle, conversational, facial recognition, and listen-and-dance.",
        "Laptop-side Flask services in Python 3 wire up ChatGPT conversation, face recognition with OpenCV and dlib, AudD song ID, and Google speech-to-text.",
        "Tested under real lighting, battery, and Wi-Fi conditions for a reliable end-to-end demo."
      ],
      stack: ["NAOqi", "Python", "Flask", "OpenAI", "OpenCV", "face_recognition", "AudD"],
      links: [
        { label: "Watch demo", href: "https://youtu.be/k3GlubiHJS4" },
        { label: "GitHub", href: "https://github.com/OusamaAb/Chat-with-NAO-robot-using-ChatGPT" }
      ]
    },
    {
      id: "smart-parking",
      title: "Smart Parking System",
      tag: "Distributed · Cloud",
      year: "2026",
      blurb: "Team-built distributed smart parking web app with five FastAPI microservices, a React frontend, and real deployment patterns.",
      detail: [
        "API gateway routes browser traffic to Parking, Reservation, Sensor, and Pricing services with database-per-service ownership.",
        "React + Vite frontend deployed to GitHub Pages through a GitHub Actions CI/CD workflow.",
        "Cloudflare HTTPS tunnel bridges the hosted UI to local backends without mixed-content errors during demos."
      ],
      stack: ["FastAPI", "React", "Vite", "SQLite", "GitHub Actions", "Cloudflare Tunnel"],
      links: [
        { label: "GitHub", href: "https://github.com/OusamaAb/COE892-Project---Smart-Parking-System" }
      ]
    },
    {
      id: "portfolio-rag",
      title: "Portfolio RAG Chatbot",
      tag: "AI · RAG",
      year: "2026",
      blurb: "This site's chatbot, A retrieval-augmented Q&A grounded only in approved markdown about my projects, experience, and background.",
      detail: [
        "Markdown chunks embedded with OpenAI text-embedding-3-small and stored in Supabase Postgres with pgvector.",
        "HNSW vector index returns top-k chunks for a query before the model writes the answer.",
        "Server-side guardrails so responses stay inside approved portfolio content."
      ],
      stack: ["Supabase", "pgvector", "OpenAI", "Node.js", "RAG"],
      links: [
        { label: "GitHub", href: "https://github.com/OusamaAb/RAG-Powered-AI-Chatbot" }
      ]
    },
    {
      id: "document-scanner",
      title: "Document Scanner",
      tag: "Computer vision · OCR",
      year: "2025",
      blurb: "A classical CV pipeline that detects a page in a photo, corrects perspective, preprocesses for legibility, and extracts text with Tesseract.",
      detail: [
        "OpenCV edge detection and contour analysis locate page candidates, with aspect-ratio and area sanity checks.",
        "Homography warps the page to a fronto-parallel view; adaptive thresholding handles stubborn lighting.",
        "Tesseract OCR tuned so phone photos with mild perspective and shadow still yield readable text."
      ],
      stack: ["Python", "OpenCV", "Tesseract OCR", "NumPy"],
      links: [
        { label: "GitHub", href: "https://github.com/OusamaAb/CPS843-Project-Document-Scanner-with-Text-Extraction" }
      ]
    },
    {
      id: "football-pickems",
      title: "Football Pickems",
      tag: "Full-stack · Sports",
      year: "2026",
      blurb: "A friend-league football prediction web app where users pick outcomes, scorers, scorelines, and cards across a season.",
      detail: [
        "Models users, leagues, fixtures, picks, and standings with explicit pick states (open, locked, scored).",
        "Scoring runs deterministically when results arrive, so standings rebuild idempotently from stored picks.",
        "Designed for future sports data API integration and league admin tooling."
      ],
      stack: ["React", "Next.js", "TypeScript", "REST APIs"],
      links: [
        { label: "GitHub", href: "https://github.com/OusamaAb/football-pickems" }
      ]
    }
  ],
  experience: [
    {
      role: "Engineering Intern",
      org: "Ministry of Transportation Ontario",
      dates: "May 2024 – Aug 2025",
      bullets: [
        "Built Python pipelines that extracted, cleaned, compared, and reported traffic data from HERE, TomTom, Waze, Transnomis, and MTO Bluetooth.",
        "Used Pandas, GeoPandas, Shapely, and QGIS to match traffic segments to route geometry and shapefiles for travel time analysis.",
        "Maintained Oracle SQL transportation records and prepared cleaned datasets for Power BI dashboards and weekly reports.",
        "Contributed to the ITS Systems Inventory PowerApps tool and Microsoft DevOps release workflows."
      ]
    },
    {
      role: "Data Analyst Intern",
      org: "Vanguard Financial",
      dates: "Apr 2021 – Jul 2021",
      bullets: [
        "Improved SQL queries used for financial reporting and weekly data extraction.",
        "Automated repetitive data cleaning in Python so weekly reports stayed faster and more reliable.",
        "Built Power BI and Tableau dashboards to make business metrics easier to access for internal teams."
      ]
    }
  ],
  education: {
    school: "Toronto Metropolitan University",
    degree: "Bachelor of Engineering, Software Engineering",
    grad: "2026",
    coursework: [
      {
        code: "COE892",
        name: "Distributed & Cloud Computing",
        term: "4th Year, Winter",
        blurb: "Distributed and cloud-based systems: communication patterns, concurrency, microservices, containers, and cloud deployment.",
        theory: [
          "Distributed system fundamentals: how computation is spread across multiple machines, and the problems that creates around communication delays, partial failures, synchronization, and consistency.",
          "Distributed architectures, including client-server and peer-to-peer designs. Peer-to-peer splits further into structured systems (Distributed Hash Tables that route keys deterministically) and unstructured ones (Gnutella-style flooding).",
          "Concurrency, multithreading, locks, and shared memory in Python, including how the Global Interpreter Lock makes threads useful for I/O-bound work but not for CPU-bound work.",
          "Distributed communication models: gRPC with Protocol Buffers for strongly typed synchronous calls, REST for web-facing APIs, and message-oriented communication through RabbitMQ for asynchronous task queues.",
          "Replication, consistency, fault tolerance, and consensus, including the Raft algorithm for distributed agreement and the trade-offs between strong and eventual consistency.",
          "Virtualization, containers, Docker, and cloud service models, including how containerized applications are deployed and orchestrated."
        ],
        labs: [
          "Lab 1: rover simulation comparing sequential vs threaded execution and SHA-256 mine disarming.",
          "Lab 2: gRPC and Protocol Buffers for ground-control and rover communication.",
          "Lab 3: RabbitMQ deminer workers consuming async disarming jobs.",
          "Lab 4 and 5: FastAPI REST plus WebSockets, Dockerized and deployed to Azure."
        ],
        projects: [
          "Smart Parking System: a distributed web app with five FastAPI microservices, an API gateway, a React frontend on GitHub Pages, and a Cloudflare HTTPS tunnel into local backends."
        ],
        tools: ["Python", "FastAPI", "gRPC", "RabbitMQ", "Docker", "Azure"]
      },
      {
        code: "CPS843",
        name: "Computer Vision",
        term: "4th Year, Fall",
        blurb: "Classical computer vision: intensity transforms, filtering, projective geometry, SIFT and stitching, and OCR pipelines.",
        theory: [
          "Image intensity transformations, including log and inverse-log transforms, power-law gamma correction, bit-plane slicing, and histogram analysis and equalization for contrast enhancement.",
          "Spatial filtering and edge detection using first-order operators (Sobel, Prewitt, Roberts), the second-order Laplacian, image sharpening with unsharp masking, and noise removal with average and Gaussian filters.",
          "Projective geometry, including homogeneous coordinates, ideal points, the line at infinity, conics, and the properties of affine, similarity, and projective transformations.",
          "Camera models and projection, covering the intrinsic matrix (focal length, skew, principal point), extrinsic pose, projection matrices, optical centers, vanishing points, and the principal plane.",
          "Feature matching and image stitching using SIFT keypoints and descriptors, robust model fitting with MLESAC, homography estimation, and panorama generation from overlapping images."
        ],
        labs: [
          "Problem Set 1: intensity transforms, bit-plane slicing, and histogram equalization in MATLAB.",
          "Problem Set 2: Sobel, Prewitt, and Roberts edges, unsharp masking, and Gaussian noise filtering.",
          "Problem Set 3: projective geometry, MLESAC, and 3D point-cloud sphere fitting.",
          "Problem Set 4: camera projection matrices and panorama stitching with SIFT and AutoStitch."
        ],
        projects: [
          "Document Scanner with Text Extraction: page detection, homography warp, CLAHE and Otsu preprocessing, and Tesseract OCR with word and line bounding boxes."
        ],
        tools: ["MATLAB", "Python", "OpenCV", "Tesseract"]
      },
      {
        code: "COE70A / COE70B",
        name: "Engineering Design Capstone",
        term: "4th Year, Full Year",
        blurb: "Two-semester capstone: from problem definition and design alternatives to a working prototype, demo, and final report.",
        theory: [
          "The engineering design process: defining objectives and constraints, generating and comparing design alternatives, prototyping, testing, and iterating before final delivery.",
          "Modular system architecture and how responsibility is partitioned between hardware and software, especially when a constrained platform like a robot connects to a more capable host like a laptop or cloud service.",
          "State machine design for coordinating shared peripherals so that only one behaviour owns the microphone, camera, motor controller, or speaker at a time.",
          "Human-robot interaction, including speech-based conversation, facial recognition, motion control, choreography, and how each modality affects user experience.",
          "Engineering trade-off analysis and decision justification, comparing design alternatives on cost, performance, complexity, and risk, and supporting choices with measurable evidence.",
          "Project management, teamwork, milestones, requirements gathering, and the documentation that supports a two-semester capstone delivery."
        ],
        labs: [
          "COE70A: project scoping, design alternatives, milestone reviews, and oral exam.",
          "COE70B: full integration, testing under real lighting, battery, and network conditions, and the demo."
        ],
        projects: [
          "Chat with NAO: a NAO humanoid with idle, conversational, facial-recognition, and listen-and-dance states, backed by Flask services for ChatGPT, OpenCV face recognition, and AudD song ID."
        ],
        tools: ["NAOqi", "Python 2.7 / 3", "Flask", "OpenCV", "OpenAI"]
      },
      {
        code: "COE817",
        name: "Network Security",
        term: "4th Year, Winter",
        blurb: "Cryptography and authentication in networked Java systems: sockets, keys, signatures, and replay-attack prevention.",
        theory: [
          "Core security goals: confidentiality, integrity, authentication, non-repudiation, and availability, and how each is enforced in real networked systems.",
          "Symmetric-key and public-key cryptography, including AES for fast bulk encryption, RSA for key exchange and digital signatures, and the role of hash functions like HMAC-SHA256 for integrity.",
          "Authentication protocols based on nonces, challenge-response messages, shared keys, and digital signatures, and how they prevent replay and tampering attacks.",
          "Key management and distribution, including the Key Distribution Center model, master keys, session keys, and how short-lived keys protect long-term secrets.",
          "Higher-level network defenses: transport-level security, WiFi security, IP security, e-mail security, firewalls, intrusion detection systems, and encrypted audit logging for accountability."
        ],
        labs: [
          "Lab 1: Java sockets and a Vigenère-cipher chat with a multithreaded server.",
          "Lab 2: symmetric and RSA-based authentication with digital signatures.",
          "Lab 3: KDC-based hybrid key distribution between two clients.",
          "Lab 4: secure group chat with replay-attack prevention."
        ],
        projects: [
          "Secure banking app: a multi-client server with authenticated key distribution, AES plus HMAC-SHA256, nonce-based replay protection, and encrypted audit logs."
        ],
        tools: ["Java", "JCA / JCE", "AES", "RSA", "HMAC-SHA256"]
      },
      {
        code: "COE891",
        name: "Software Testing & QA",
        term: "4th Year, Winter",
        blurb: "Test design, automation, coverage, and mutation testing: applied through Java testing tools and Apache Commons Math.",
        theory: [
          "Software testing fundamentals: verification and validation, the levels of unit, integration, system, and acceptance testing, and how test plans and test documentation are structured.",
          "Input Space Partitioning and Boundary Value Analysis for designing test cases from the input domain using equivalence classes and edge values.",
          "Graph-based coverage criteria built on control-flow and data-flow graphs, including node, edge, edge-pair, prime-path, and DU-path coverage.",
          "Logic-based testing for boolean predicates, including predicate coverage, clause coverage, and Active Clause Coverage variants (GACC, CACC, RACC, GICC, RICC).",
          "Mutation testing as a way to evaluate test-suite strength by injecting artificial faults, and the limits of plain line coverage as a quality metric.",
          "AI-assisted test generation using LLMs and tools like ChatUniTest, and how generated tests compare to hand-written ones on coverage, correctness, and reliability."
        ],
        labs: [
          "Labs 1 and 2: JUnit, TestNG, parameterized tests, and OpenClover coverage.",
          "Lab 3: Selenium WebDriver browser automation with TestNG.",
          "Labs 4 and 5: control- and data-flow graph construction and logic-based test design.",
          "Lab 6: PIT mutation testing on Money and MoneyBag with mutator comparisons."
        ],
        projects: [
          "Apache Commons Math QA project: ISP and BVA for WeightedMean, CFG and DFG for matrix ops, logic coverage for matrix add and multiply, PIT on MultivariateNormalDistribution, plus an LLM-assisted ChatUniTest comparison."
        ],
        tools: ["JUnit", "TestNG", "Selenium", "OpenClover", "JaCoCo", "PIT"]
      },
      {
        code: "COE718",
        name: "Embedded Systems",
        term: "4th Year, Fall",
        blurb: "ARM Cortex-M3 embedded design: peripherals, interrupts, RTOS scheduling, and a multimedia integration project.",
        theory: [
          "Embedded and real-time systems fundamentals, including how embedded software differs from regular applications in its memory, timing, and direct-hardware constraints.",
          "ARM Cortex-M3 architecture, including the programming model, memory-mapped I/O, bit-banding, conditional execution, and barrel shifting.",
          "Peripheral control through GPIO, ADC, DAC, LCD, USB, and timers, along with interrupt-driven programming using interrupt service routines.",
          "Real-time operating system concepts, including preemptive, non-preemptive, round-robin, and cooperative scheduling, plus Rate Monotonic Scheduling and Earliest Deadline First.",
          "Task synchronization and shared-resource problems, including mutexes, signals, priority inversion, and priority elevation.",
          "Hardware-software co-design, system-on-programmable-chip concepts, and accelerator-based and fault-tolerant embedded systems."
        ],
        labs: [
          "Lab 1: joystick, LED, GLCD, and ADC GPIO basics in Keil µVision.",
          "Lab 2: bit-banding, masking, and barrel shifting for performance.",
          "Lab 3b: preemptive RTX scheduling with task signals and synchronization.",
          "Lab 4: Rate Monotonic Scheduling, virtual timers, and priority-inversion resolution."
        ],
        projects: [
          "Media Centre on MCB1700: a state-machine app with a photo gallery, USB-streamed audio player via timer and DAC, and a T-Rex Run game rendered on the GLCD."
        ],
        tools: ["C", "Keil µVision", "CMSIS-RTOS", "MCB1700"]
      },
      {
        code: "COE768",
        name: "Computer Networks",
        term: "4th Year, Fall",
        blurb: "TCP/IP fundamentals: sockets, packet analysis, and a peer-to-peer file-sharing project in C.",
        theory: [
          "OSI and TCP/IP layered architecture, encapsulation, and how data is wrapped with headers as it moves down the protocol stack and unwrapped on the way back up.",
          "Transport protocols: TCP for reliable connection-oriented byte streams (three-way handshake, ordered delivery, retransmission, flow and congestion control), and UDP for connectionless, unreliable datagrams with minimal overhead.",
          "Data-link layer concepts, including framing, error detection with checksums, frame check sequences and CRC, stop-and-wait, and sliding-window protocols like Go-Back-N and Selective Repeat.",
          "LAN technologies, including Ethernet, CSMA/CD, wireless LANs, VLANs, LAN switching, and the Spanning Tree Protocol for preventing loops.",
          "Network layer concepts: IP addressing, IP packet structure, ARP for resolving IP to MAC addresses, DNS for resolving names to addresses, IPv6, and the role of routers in forwarding packets.",
          "Application-layer protocols, BSD socket programming with TCP and UDP, and the design of custom application-layer protocols using Protocol Data Units."
        ],
        labs: [
          "Lab 1: VM-to-VM ping and Echo with Wireshark layer analysis.",
          "Lab 2: TCP three-way handshake, forking concurrent servers, and Hello sockets.",
          "Lab 3: TCP-based reliable file download.",
          "Lab 4: UDP time service and chunked UDP file transfer with custom PDUs."
        ],
        projects: [
          "P2P file sharing in C: an index server plus peers using UDP control PDUs and TCP transfers, with registration, search, deregistration, and dynamic port assignment via getsockname()."
        ],
        tools: ["C", "BSD sockets", "Linux", "Wireshark"]
      },
      {
        code: "ELE888",
        name: "Intelligent Systems (ML)",
        term: "4th Year, Winter",
        blurb: "Foundations of machine learning: implemented from scratch in Python on the IRIS dataset and image data.",
        theory: [
          "Bayesian decision theory and probabilistic classification, including prior and posterior probabilities, Gaussian class-conditional distributions, minimum-error and minimum-risk decision rules.",
          "Linear discriminant functions and decision boundaries, the perceptron criterion, and gradient descent as the basic optimization tool for binary classification.",
          "Multilayer neural networks, hidden layers, nonlinear activation functions, backpropagation, mean squared error, and learning-curve interpretation.",
          "Support Vector Machines, cost functions, kernels, and classifier evaluation through accuracy, bias-variance trade-off, and error analysis.",
          "Unsupervised learning, including K-means and nearest-neighbour clustering, sensitivity to initialization, and cluster-quality metrics like the Xie-Beni index.",
          "Dimensionality reduction with Principal Component Analysis for feature representation and visualization."
        ],
        labs: [
          "Lab 1: two-class Bayes classifier on IRIS with cost-sensitive thresholds.",
          "Lab 2: perceptron-based linear discriminant on Setosa, Versicolour, and Virginica.",
          "Lab 3: multilayer net solving XOR with hidden-space decision-boundary plots.",
          "Lab 4: K-means image-colour clustering with a two-run comparison."
        ],
        projects: [
          "The lab assignments served as the main project component: Bayes, perceptron, an XOR-solving neural net, and K-means all implemented from scratch."
        ],
        tools: ["Python", "NumPy", "Matplotlib", "scikit-learn"]
      },
      {
        code: "CPS510",
        name: "Database Systems",
        term: "3rd Year, Fall",
        blurb: "Relational database design: ER modeling, SQL, normalization, and a semester-long job-bank project in Oracle.",
        theory: [
          "Database system architecture, including conceptual, internal, and external schemas, data independence, and the responsibilities of the DBMS.",
          "Entity-Relationship modeling, including entities, attributes, relationships, weak entities, cardinality, participation constraints, specialization, and generalization, and how ER diagrams map to relational tables.",
          "The relational model and integrity constraints, including primary keys, foreign keys, domains, uniqueness, and referential integrity.",
          "Relational algebra and SQL, including selection, projection, joins, grouping, aggregation, HAVING, EXISTS, set operations, and views.",
          "Functional dependencies and normalization through 1NF, 2NF, 3NF, and BCNF, including candidate keys, superkeys, prime attributes, and dependency preservation.",
          "Physical database organization, including file structures, storage hierarchy, hashing, and indexing."
        ],
        labs: [
          "Weekly labs that built one piece at a time: ER diagram, Oracle DDL, simple and advanced SQL, FD analysis, 3NF, BCNF, and a shell plus GUI front end."
        ],
        projects: [
          "JobsForAll: an Oracle-backed job-bank system with Account, Applicant, Recruiter, Company, JobListing, and JobApplication tables, normalized to BCNF, plus SQL views and a GUI."
        ],
        tools: ["Oracle SQL", "SQL*Plus", "ER diagrams", "Relational algebra"]
      },
      {
        code: "CPS714",
        name: "Software Project Management",
        term: "4th Year, Fall",
        blurb: "How software projects are scoped, scheduled, executed, and closed across predictive and Agile life cycles.",
        theory: [
          "Project management fundamentals, including the triple constraint of scope, time, and cost, and the broader factors of quality, risk, resources, and stakeholder expectations.",
          "Project, program, and portfolio management, and how organizations select projects using SWOT analysis, weighted scoring models, balanced scorecards, and strategic alignment.",
          "Project life cycles, including predictive, Agile, iterative, incremental, adaptive, and hybrid approaches, with Scrum, sprints, backlogs, and retrospectives as the main Agile practices.",
          "Schedule planning, including Work Breakdown Structures, activity lists, milestones, dependency types, three-point and PERT estimation, Gantt charts, and the critical path.",
          "Project management knowledge areas: integration, scope, schedule, cost, quality, resource, communications, risk, procurement, and stakeholder management.",
          "Risk management, including risk identification, probability and impact analysis, mitigation strategies, and contingency planning."
        ],
        labs: [
          "Building Work Breakdown Structures from project scopes.",
          "Activity lists, milestones, and dependency-aware schedule design.",
          "Gantt charts and network diagrams for tracking progress.",
          "Agile sprint planning, standups, reviews, and retrospectives."
        ],
        projects: [
          "Team-managed software project: full life cycle including charter, scope, WBS, schedule, risk register, sprint plans, demos, and a final delivery presentation."
        ],
        tools: ["Gantt tools", "Jira / GitHub Projects", "WBS / risk-register templates"]
      },
      {
        code: "CPS688",
        name: "Advanced Algorithms",
        term: "3rd Year, Winter",
        blurb: "Algorithm design and analysis: greedy, DP, divide-and-conquer, graphs, NP-completeness, flows, and randomized algorithms.",
        theory: [
          "Stable matching and the Gale-Shapley propose-and-reject algorithm.",
          "Graph algorithms, including representations, BFS and DFS, shortest path with Dijkstra and Bellman-Ford, and minimum spanning trees with Kruskal and Prim.",
          "Greedy algorithm design, backtracking with state-space trees and pruning (N-Queens, M-coloring, rat in a maze), and divide-and-conquer with merge sort, quick sort, and recurrence-based runtime analysis.",
          "Dynamic programming for problems with overlapping subproblems and optimal substructure, including coin change, sequence alignment, and the knapsack problem.",
          "NP-completeness, polynomial-time reductions, and how problems like 3-SAT, vertex cover, Hamiltonian cycle, and the Traveling Salesman Problem classify computational hardness.",
          "Network flow with Ford-Fulkerson and the max-flow min-cut theorem, linear programming with the simplex method, substring search algorithms (KMP, Boyer-Moore, Rabin-Karp), and randomized algorithms for min-cut, MAX 3-SAT, hashing, and load balancing."
        ],
        labs: [],
        projects: [],
        tools: ["Pseudocode", "Big-O analysis", "Recurrence relations"]
      }
    ]
  },
  skills: {
    Languages: ["Python", "Java", "JavaScript", "TypeScript", "Ruby", "SQL", "HTML", "CSS", "C", "C++", "Bash", "MATLAB"],
    Frontend: ["React", "Next.js", "Tailwind CSS", "Vite", "Responsive design", "Component UI", "API integration"],
    Backend: ["FastAPI", "Ruby on Rails", "Flask", "REST APIs", "Microservices", "API gateways", "JWT", "OAuth"],
    Databases: ["PostgreSQL", "Supabase", "Oracle SQL", "SQLite", "pgvector", "Data modeling", "ETL workflows"],
    "Data Engineering": ["Pandas", "NumPy", "GeoPandas", "Shapely", "Excel automation", "Power BI", "Tableau", "Data pipelines"],
    "Cloud / DevOps": ["AWS", "Lambda", "S3", "SageMaker", "Docker", "Kubernetes", "CI/CD", "GitHub Actions", "Azure DevOps", "Databricks"],
    "AI / ML": ["OpenAI APIs", "RAG", "OpenCV", "Tesseract OCR", "Scikit-learn", "TensorFlow", "Face recognition", "NLP"],
    Testing: ["JUnit", "TestNG", "Selenium WebDriver", "PIT mutation testing", "Unit testing", "Integration testing"]
  },
  certs: [
    {
      name: "AWS Certified Cloud Practitioner",
      org: "Amazon Web Services",
      date: "2025",
      exp: "2028"
    },
    {
      name: "AWS Certified AI Practitioner",
      org: "Amazon Web Services",
      date: "2025",
      exp: "2028"
    }
  ]
};
