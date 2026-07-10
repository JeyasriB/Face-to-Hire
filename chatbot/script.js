document.addEventListener("DOMContentLoaded", () => {
  const messages = document.getElementById("messages");
  const userInput = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");

  let role = "";
  let currentQuestions = [];
  let questionIndex = -1;
  let score = 0;
  const level = localStorage.getItem("interviewLevel") || "easy";

  const commonQuestions = [
    { question: "Tell me about yourself.", answerKeywords: ["name", "place", "education", "family", "goals", "hobbies"] },
    { question: "What are your main skills?", answerKeywords: ["skills", "strengths", "expertise", "experience"] },
    { question: "What motivates you to do your best work?", answerKeywords: ["motivation", "passion", "growth", "impact", "learning"] },
    { question: "Why should we hire you?", answerKeywords: ["strengths", "skills", "team player", "dedication", "experience"] }
  ];

  // Replace this sample with your full 32-role object
  const roleQuestions = {
  "data analyst": {
    easy: [
      { question: "Tell me about yourself.", answerKeywords: ["name","place","education","family","goals","hobbies"] },
      { question: "What tools do you use for data analysis?", answerKeywords: ["Excel","SQL","Python","R","Tableau","Power BI"] },
      { question: "What is data cleaning?", answerKeywords: ["remove errors","missing values","inconsistent data","preprocess"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    intermediate: [
      { question: "Explain SQL Joins in simple words.", answerKeywords: ["inner join","left join","right join","full join"] },
      { question: "What is a dashboard and why is it useful?", answerKeywords: ["visualization","insights","metrics","monitoring"] },
      { question: "Difference between descriptive and predictive analytics?", answerKeywords: ["past data","trends","forecast","prediction"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    hard: [
      { question: "How would you handle missing data in a dataset?", answerKeywords: ["imputation","drop","mean","median","interpolation"] },
      { question: "Explain hypothesis testing with an example.", answerKeywords: ["null hypothesis","alternative hypothesis","p-value","test"] },
      { question: "Critical Thinking: How would you detect fraud using data?", answerKeywords: ["anomaly","patterns","ML model","alert","fraud detection"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ]
  },

  "software developer": {
    easy: [
      { question: "Tell me about yourself.", answerKeywords: ["name","place","education","family","goals","hobbies"] },
      { question: "What is programming?", answerKeywords: ["write code","logic","software","develop"] },
      { question: "What languages do you know?", answerKeywords: ["JavaScript","Python","Java","C++"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    intermediate: [
      { question: "Explain OOP concepts.", answerKeywords: ["class","object","inheritance","polymorphism","encapsulation"] },
      { question: "What is version control?", answerKeywords: ["Git","commit","repository","branch"] },
      { question: "What is debugging?", answerKeywords: ["error","fix","test","issue"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    hard: [
      { question: "How would you optimize a large application?", answerKeywords: ["performance","refactor","scalability","profiling"] },
      { question: "Explain design patterns.", answerKeywords: ["Singleton","Factory","Observer","Strategy"] },
      { question: "Critical Thinking: How would you design a scalable backend system?", answerKeywords: ["architecture","load balancing","database","API"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ]
  },

  "web developer": {
    easy: [
      { question: "Tell me about yourself.", answerKeywords: ["name","place","education","family","goals","hobbies"] },
      { question: "What is HTML and why do we use it?", answerKeywords: ["markup","structure","web pages"] },
      { question: "Difference between <div> and <span>?", answerKeywords: ["block","inline","HTML elements"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    intermediate: [
      { question: "Explain the difference between Flexbox and Grid.", answerKeywords: ["layout","CSS","rows","columns"] },
      { question: "What are semantic HTML tags and why are they important?", answerKeywords: ["<header>","<footer>","<article>","SEO"] },
      { question: "How does CSS specificity work?", answerKeywords: ["inline","id","class","element","priority"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    hard: [
      { question: "How would you improve the performance of a large React application?", answerKeywords: ["lazy loading","memoization","code splitting","optimization"] },
      { question: "Explain the concept of Virtual DOM.", answerKeywords: ["React","DOM","diffing","rendering"] },
      { question: "Critical Thinking: How would you design a scalable UI library?", answerKeywords: ["components","reusability","modular","maintainable"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ]
  },

  "data scientist": {
    easy: [
      { question: "Tell me about yourself.", answerKeywords: ["name","place","education","family","goals","hobbies"] },
      { question: "What is supervised vs unsupervised learning?", answerKeywords: ["labels","clusters","classification","regression"] },
      { question: "What is overfitting?", answerKeywords: ["model","accuracy","training","generalization"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    intermediate: [
      { question: "Explain linear regression vs logistic regression.", answerKeywords: ["continuous","categorical","predict","model"] },
      { question: "What is feature engineering?", answerKeywords: ["transform","features","data","improve model"] },
      { question: "What is cross-validation?", answerKeywords: ["training","testing","folds","accuracy"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    hard: [
      { question: "How would you build a recommendation system?", answerKeywords: ["collaborative filtering","content-based","user-item matrix","algorithm"] },
      { question: "Explain gradient boosting.", answerKeywords: ["ensemble","trees","weak learners","model"] },
      { question: "Critical Thinking: How would you predict customer churn?", answerKeywords: ["data","patterns","predictive model","alerts"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ]
  },

  "cloud engineer": {
    easy: [
      { question: "Tell me about yourself.", answerKeywords: ["name","place","education","family","goals","hobbies"] },
      { question: "What is cloud computing?", answerKeywords: ["internet","servers","storage","services"] },
      { question: "Name 3 popular cloud providers.", answerKeywords: ["AWS","Azure","Google Cloud"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    intermediate: [
      { question: "Difference between IaaS, PaaS, SaaS?", answerKeywords: ["infrastructure","platform","software","cloud model"] },
      { question: "What is serverless computing?", answerKeywords: ["functions","scaling","no server management"] },
      { question: "Explain cloud storage vs database services.", answerKeywords: ["object storage","databases","persistence","management"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    hard: [
      { question: "How would you migrate a legacy system to cloud?", answerKeywords: ["planning","strategy","lift-and-shift","refactor"] },
      { question: "Explain cloud load balancing.", answerKeywords: ["distribution","traffic","availability","redundancy"] },
      { question: "Critical Thinking: How would you design a multi-region fault tolerant system?", answerKeywords: ["regions","replication","failover","resiliency"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ]
  },

  "ui/ux designer": {
    easy: [
      { question: "Tell me about yourself.", answerKeywords: ["name","place","education","family","goals","hobbies"] },
      { question: "What is wireframing?", answerKeywords: ["layout","prototype","design","structure"] },
      { question: "What tools do you use for designing?", answerKeywords: ["Figma","Sketch","Adobe XD","Photoshop"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    intermediate: [
      { question: "What are the principles of good UX design?", answerKeywords: ["usability","accessibility","consistency","feedback"] },
      { question: "What is user journey mapping?", answerKeywords: ["flow","steps","interaction","experience"] },
      { question: "Difference between low-fidelity and high-fidelity prototypes?", answerKeywords: ["sketch","interactive","details","design"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    hard: [
      { question: "How would you design for accessibility?", answerKeywords: ["contrast","screen reader","keyboard navigation","WCAG"] },
      { question: "Explain design thinking methodology.", answerKeywords: ["empathize","define","ideate","prototype","test"] },
      { question: "Critical Thinking: How would you improve the UX of a banking app?", answerKeywords: ["user needs","simplify flow","feedback","secure"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ]
  },

  "cybersecurity analyst": {
    easy: [
      { question: "Tell me about yourself.", answerKeywords: ["name","place","education","family","goals","hobbies"] },
      { question: "What is phishing?", answerKeywords: ["fraud","email","credentials","attack"] },
      { question: "What is a firewall?", answerKeywords: ["security","network","filter","traffic"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    intermediate: [
      { question: "Explain symmetric vs asymmetric encryption.", answerKeywords: ["key","encryption","decryption","security"] },
      { question: "What is penetration testing?", answerKeywords: ["ethical hacking","vulnerability","assessment","security"] },
      { question: "Difference between IDS and IPS?", answerKeywords: ["intrusion","detection","prevention","network"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    hard: [
      { question: "How would you secure a cloud application?", answerKeywords: ["authentication","encryption","permissions","monitoring"] },
      { question: "Explain zero trust security.", answerKeywords: ["never trust","verify","least privilege","network"] },
      { question: "Critical Thinking: How would you handle a ransomware attack?", answerKeywords: ["backup","isolate","decrypt","notify"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ]
  },

  "network engineer": {
    easy: [
      { question: "Tell me about yourself.", answerKeywords: ["name","place","education","family","goals","hobbies"] },
      { question: "What is an IP address?", answerKeywords: ["network","unique","identify","device"] },
      { question: "What is a router?", answerKeywords: ["device","forward","packets","network"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    intermediate: [
      { question: "Explain OSI vs TCP/IP model.", answerKeywords: ["layers","protocols","communication","network"] },
      { question: "What is subnetting?", answerKeywords: ["IP","network","mask","division"] },
      { question: "Difference between switch and hub?", answerKeywords: ["forward","broadcast","traffic","network"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    hard: [
      { question: "How would you secure a corporate network?", answerKeywords: ["firewall","VPN","monitoring","policies"] },
      { question: "Explain VPN working.", answerKeywords: ["encrypted","tunnel","remote","connection"] },
      { question: "Critical Thinking: How would you troubleshoot intermittent network failures?", answerKeywords: ["logs","ping","monitoring","diagnostics"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ]
  },

  "database administrator": {
    easy: [
      { question: "Tell me about yourself.", answerKeywords: ["name","place","education","family","goals","hobbies"] },
      { question: "What is a database?", answerKeywords: ["store","data","tables","records"] },
      { question: "What is SQL?", answerKeywords: ["query","database","language","records"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    intermediate: [
      { question: "Explain normalization.", answerKeywords: ["reduce redundancy","tables","relationships","data"] },
      { question: "What is indexing and why is it used?", answerKeywords: ["performance","search","key","database"] },
      { question: "Difference between clustered and non-clustered index?", answerKeywords: ["table","data","storage","performance"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    hard: [
      { question: "How would you optimize a slow-running query?", answerKeywords: ["index","query plan","optimize","database"] },
      { question: "Explain database replication.", answerKeywords: ["copy","sync","availability","redundancy"] },
      { question: "Critical Thinking: How would you secure sensitive user data?", answerKeywords: ["encryption","access control","backup","monitor"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ]
  },

  "mobile app developer": {
    easy: [
      { question: "Tell me about yourself.", answerKeywords: ["name","place","education","family","goals","hobbies"] },
      { question: "What is the difference between Android and iOS?", answerKeywords: ["platform","OS","devices","apps"] },
      { question: "What is an APK?", answerKeywords: ["package","Android","application","install"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    intermediate: [
      { question: "Explain activity lifecycle in Android.", answerKeywords: ["onCreate","onStart","onResume","onPause"] },
      { question: "What is Swift used for?", answerKeywords: ["iOS","programming","language","Apple"] },
      { question: "What is push notification?", answerKeywords: ["alerts","messages","mobile","app"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    hard: [
      { question: "How would you optimize a mobile app for low bandwidth?", answerKeywords: ["compression","caching","lazy load","optimize"] },
      { question: "Explain hybrid vs native apps.", answerKeywords: ["platform","native","web","cross"] },
      { question: "Critical Thinking: How would you design a secure fintech mobile app?", answerKeywords: ["encryption","auth","secure","transactions"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ]
  },

  "devops engineer": {
    easy: [
      { question: "Tell me about yourself.", answerKeywords: ["name","place","education","family","goals","hobbies"] },
      { question: "What is DevOps?", answerKeywords: ["development","operations","automation","CI/CD"] },
      { question: "What tools are used in DevOps?", answerKeywords: ["Jenkins","Docker","Kubernetes","Git"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    intermediate: [
      { question: "Explain CI/CD pipelines.", answerKeywords: ["integration","deployment","automation","pipeline"] },
      { question: "What is containerization?", answerKeywords: ["Docker","isolated","environment","application"] },
      { question: "What is Infrastructure as Code?", answerKeywords: ["automation","scripts","cloud","resources"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    hard: [
      { question: "How would you ensure zero-downtime deployment?", answerKeywords: ["blue-green","rolling update","monitoring","backup"] },
      { question: "Explain monitoring & alerting in production.", answerKeywords: ["logs","metrics","alerts","incident"] },
      { question: "Critical Thinking: How would you handle a sudden production outage?", answerKeywords: ["rollback","monitor","notify","fix"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ]
  },

  "ai engineer": {
    easy: [
      { question: "Tell me about yourself.", answerKeywords: ["name","place","education","family","goals","hobbies"] },
      { question: "What is AI?", answerKeywords: ["intelligence","machine","learning","automation"] },
      { question: "What is ML?", answerKeywords: ["machine","learning","model","algorithm"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    intermediate: [
      { question: "Explain supervised vs unsupervised learning.", answerKeywords: ["labeled","unlabeled","data","training"] },
      { question: "What is neural network?", answerKeywords: ["layers","nodes","weights","activation"] },
      { question: "What is natural language processing?", answerKeywords: ["text","language","model","analysis"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    hard: [
      { question: "How would you deploy an AI model in production?", answerKeywords: ["API","scaling","monitoring","model"] },
      { question: "Explain reinforcement learning.", answerKeywords: ["agent","environment","reward","policy"] },
      { question: "Critical Thinking: How would you design an AI system for fraud detection?", answerKeywords: ["data","model","alerts","anomaly"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ]
  },

  "business analyst": {
    easy: [
      { question: "Tell me about yourself.", answerKeywords: ["name","place","education","family","goals","hobbies"] },
      { question: "What is business analysis?", answerKeywords: ["requirements","stakeholders","process","analysis"] },
      { question: "What is a use case?", answerKeywords: ["scenario","system","user","action"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    intermediate: [
      { question: "Explain requirement gathering.", answerKeywords: ["interview","stakeholders","document","clarify"] },
      { question: "What is SWOT analysis?", answerKeywords: ["strength","weakness","opportunity","threat"] },
      { question: "Difference between functional and non-functional requirements?", answerKeywords: ["behavior","performance","security","usability"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    hard: [
      { question: "How would you handle conflicting requirements?", answerKeywords: ["stakeholders","prioritize","trade-off","agreement"] },
      { question: "Explain gap analysis.", answerKeywords: ["current","desired","process","improvement"] },
      { question: "Critical Thinking: How would you improve business process efficiency?", answerKeywords: ["automation","workflow","metrics","analysis"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ]
  },

  "product manager": {
    easy: [
      { question: "Tell me about yourself.", answerKeywords: ["name","place","education","family","goals","hobbies"] },
      { question: "What is product management?", answerKeywords: ["plan","develop","launch","strategy"] },
      { question: "What is a product roadmap?", answerKeywords: ["timeline","features","plan","goal"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    intermediate: [
      { question: "Explain MVP.", answerKeywords: ["minimum","features","test","market"] },
      { question: "How do you gather customer feedback?", answerKeywords: ["survey","interview","metrics","analyze"] },
      { question: "Difference between agile and waterfall?", answerKeywords: ["iteration","planning","flexible","process"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    hard: [
      { question: "How would you prioritize features?", answerKeywords: ["value","effort","impact","stakeholder"] },
      { question: "Explain product-market fit.", answerKeywords: ["market","needs","solution","validation"] },
      { question: "Critical Thinking: How would you handle a failing product?", answerKeywords: ["analyze","pivot","feedback","strategy"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ]
  },

  "game developer": {
    easy: [
      { question: "Tell me about yourself.", answerKeywords: ["name","place","education","family","goals","hobbies"] },
      { question: "What game engines have you used?", answerKeywords: ["Unity","Unreal","Godot","CryEngine"] },
      { question: "What is a game loop?", answerKeywords: ["update","render","input","loop"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    intermediate: [
      { question: "Explain physics in game development.", answerKeywords: ["collision","movement","gravity","simulation"] },
      { question: "What is AI in games?", answerKeywords: ["NPC","behavior","decision","algorithm"] },
      { question: "Difference between 2D and 3D games?", answerKeywords: ["dimension","graphics","sprites","3D model"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    hard: [
      { question: "How would you optimize a game for performance?", answerKeywords: ["fps","load","memory","optimization"] },
      { question: "Explain multiplayer networking basics.", answerKeywords: ["server","client","sync","latency"] },
      { question: "Critical Thinking: How would you design a mobile game monetization strategy?", answerKeywords: ["ads","purchase","engagement","analytics"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ]
  },

  "qa engineer": {
    easy: [
      { question: "Tell me about yourself.", answerKeywords: ["name","place","education","family","goals","hobbies"] },
      { question: "What is software testing?", answerKeywords: ["validate","bugs","quality","application"] },
      { question: "Difference between manual and automated testing?", answerKeywords: ["manual","automated","scripts","execution"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    intermediate: [
      { question: "Explain unit testing vs integration testing.", answerKeywords: ["module","combined","test","code"] },
      { question: "What is regression testing?", answerKeywords: ["repeat","changes","bugs","verify"] },
      { question: "What is a test case?", answerKeywords: ["steps","input","expected","result"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    hard: [
      { question: "How would you design a test strategy for a complex system?", answerKeywords: ["plan","coverage","automation","risk"] },
      { question: "Explain continuous testing in DevOps.", answerKeywords: ["CI/CD","automation","feedback","quality"] },
      { question: "Critical Thinking: How would you detect intermittent bugs?", answerKeywords: ["logs","reproduce","debug","monitor"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ]
  },

  "blockchain developer": {
    easy: [
      { question: "Tell me about yourself.", answerKeywords: ["name","place","education","family","goals","hobbies"] },
      { question: "What is blockchain?", answerKeywords: ["ledger","decentralized","transactions","cryptography"] },
      { question: "Difference between Bitcoin and Ethereum?", answerKeywords: ["cryptocurrency","Ethereum","smart contract","Bitcoin"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    intermediate: [
      { question: "What is a smart contract?", answerKeywords: ["code","blockchain","execute","automatic"] },
      { question: "Explain consensus algorithms.", answerKeywords: ["PoW","PoS","validation","network"] },
      { question: "What is a dApp?", answerKeywords: ["decentralized","application","blockchain","users"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    hard: [
      { question: "How would you design a secure blockchain system?", answerKeywords: ["encryption","nodes","ledger","consensus"] },
      { question: "Explain tokenomics in blockchain.", answerKeywords: ["token","economy","supply","utility"] },
      { question: "Critical Thinking: How would you implement a voting system on blockchain?", answerKeywords: ["security","smart contract","ledger","verification"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ]
  },

  "system administrator": {
    easy: [
      { question: "Tell me about yourself.", answerKeywords: ["name","place","education","family","goals","hobbies"] },
      { question: "What is system administration?", answerKeywords: ["manage","servers","network","users"] },
      { question: "What is an OS?", answerKeywords: ["operating system","software","manage","hardware"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    intermediate: [
      { question: "Explain user management in servers.", answerKeywords: ["permissions","roles","groups","accounts"] },
      { question: "Difference between Windows and Linux servers?", answerKeywords: ["OS","commands","security","usage"] },
      { question: "What is virtualization?", answerKeywords: ["VM","host","guest","hypervisor"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    hard: [
      { question: "How would you troubleshoot a server crash?", answerKeywords: ["logs","diagnostics","restore","monitor"] },
      { question: "Explain backup and disaster recovery.", answerKeywords: ["backup","restore","failover","recovery"] },
      { question: "Critical Thinking: How would you secure a corporate server?", answerKeywords: ["firewall","patches","access control","monitor"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ]
  },

  "it support specialist": {
    easy: [
      { question: "Tell me about yourself.", answerKeywords: ["name","place","education","family","goals","hobbies"] },
      { question: "What is IT support?", answerKeywords: ["assist","users","troubleshoot","systems"] },
      { question: "What is helpdesk ticket?", answerKeywords: ["issue","log","resolve","support"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    intermediate: [
      { question: "Explain troubleshooting steps.", answerKeywords: ["identify","diagnose","resolve","verify"] },
      { question: "What is remote support?", answerKeywords: ["remote","access","control","assistance"] },
      { question: "Difference between hardware and software support?", answerKeywords: ["hardware","software","issues","repair"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    hard: [
      { question: "How would you handle multiple critical support tickets?", answerKeywords: ["prioritize","communicate","resolve","document"] },
      { question: "Explain IT asset management.", answerKeywords: ["inventory","tracking","lifecycle","devices"] },
      { question: "Critical Thinking: How would you prevent repeated user errors?", answerKeywords: ["training","automation","documentation","monitor"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ]
  },

  "machine learning engineer": {
    easy: [
      { question: "Tell me about yourself.", answerKeywords: ["name","place","education","family","goals","hobbies"] },
      { question: "What is supervised learning?", answerKeywords: ["labeled","data","model","predict"] },
      { question: "What is unsupervised learning?", answerKeywords: ["unlabeled","cluster","pattern","data"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    intermediate: [
      { question: "Explain train/test split.", answerKeywords: ["dataset","split","model","evaluate"] },
      { question: "What is cross-validation?", answerKeywords: ["folds","accuracy","training","testing"] },
      { question: "Difference between regression and classification?", answerKeywords: ["continuous","categorical","predict","model"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    hard: [
      { question: "How would you prevent overfitting?", answerKeywords: ["regularization","dropout","cross-validation","simplify"] },
      { question: "Explain gradient descent.", answerKeywords: ["optimization","loss","minimize","algorithm"] },
      { question: "Critical Thinking: How would you deploy ML model to production?", answerKeywords: ["API","scaling","monitor","performance"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ]
  },

  "full stack developer": {
    easy: [
      { question: "Tell me about yourself.", answerKeywords: ["name","place","education","family","goals","hobbies"] },
      { question: "What is front-end vs back-end?", answerKeywords: ["UI","server","database","logic"] },
      { question: "What is a REST API?", answerKeywords: ["endpoint","HTTP","request","response"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    intermediate: [
      { question: "Explain MVC architecture.", answerKeywords: ["model","view","controller","pattern"] },
      { question: "What is state management?", answerKeywords: ["React","Redux","data","flow"] },
      { question: "Explain CRUD operations.", answerKeywords: ["create","read","update","delete","database"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    hard: [
      { question: "How would you optimize a full-stack application?", answerKeywords: ["frontend","backend","database","performance"] },
      { question: "Explain authentication and authorization.", answerKeywords: ["login","role","token","security"] },
      { question: "Critical Thinking: How would you design a scalable e-commerce app?", answerKeywords: ["load balancing","database","API","frontend"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ]
  },

  "systems analyst": {
    easy: [
      { question: "Tell me about yourself.", answerKeywords: ["name","place","education","family","goals","hobbies"] },
      { question: "What is systems analysis?", answerKeywords: ["requirements","process","improvement","systems"] },
      { question: "What is a flowchart?", answerKeywords: ["diagram","steps","process","visual"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    intermediate: [
      { question: "Explain feasibility study.", answerKeywords: ["technical","economic","operational","study"] },
      { question: "Difference between AS-IS and TO-BE models?", answerKeywords: ["current","future","process","improvement"] },
      { question: "What is gap analysis?", answerKeywords: ["difference","current","desired","solution"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    hard: [
      { question: "How would you improve system efficiency?", answerKeywords: ["automation","optimization","monitor","metrics"] },
      { question: "Explain risk analysis in systems.", answerKeywords: ["identify","evaluate","mitigate","impact"] },
      { question: "Critical Thinking: How would you handle conflicting system requirements?", answerKeywords: ["stakeholders","prioritize","solution","communication"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ]
  },

  "erp consultant": {
    easy: [
      { question: "Tell me about yourself.", answerKeywords: ["name","place","education","family","goals","hobbies"] },
      { question: "What is ERP?", answerKeywords: ["enterprise","resource","planning","system"] },
      { question: "Name popular ERP software.", answerKeywords: ["SAP","Oracle","Microsoft Dynamics","Odoo"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    intermediate: [
      { question: "Explain modules in ERP.", answerKeywords: ["finance","HR","supply chain","manufacturing"] },
      { question: "Difference between on-premise and cloud ERP?", answerKeywords: ["hosting","deployment","maintenance","cost"] },
      { question: "What is ERP customization?", answerKeywords: ["modify","fit","business","process"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    hard: [
      { question: "How would you handle ERP implementation failure?", answerKeywords: ["stakeholders","root cause","plan","solution"] },
      { question: "Explain ERP integration with other systems.", answerKeywords: ["API","data flow","connect","modules"] },
      { question: "Critical Thinking: How would you optimize ERP for a multi-national company?", answerKeywords: ["process","automation","scaling","customization"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ]
  },

  "digital marketing specialist": {
    easy: [
      { question: "Tell me about yourself.", answerKeywords: ["name","place","education","family","goals","hobbies"] },
      { question: "What is digital marketing?", answerKeywords: ["online","promotion","SEO","ads"] },
      { question: "Name some social media platforms.", answerKeywords: ["Facebook","Instagram","LinkedIn","Twitter"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    intermediate: [
      { question: "Explain SEO vs SEM.", answerKeywords: ["search","optimization","ads","ranking"] },
      { question: "What is email marketing?", answerKeywords: ["campaign","subscribe","email","engage"] },
      { question: "Difference between content marketing and paid marketing?", answerKeywords: ["organic","ads","strategy","reach"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    hard: [
      { question: "How would you improve conversion rate?", answerKeywords: ["landing page","A/B testing","analytics","optimize"] },
      { question: "Explain marketing automation.", answerKeywords: ["workflow","automation","campaign","tools"] },
      { question: "Critical Thinking: How would you launch a product in a new country?", answerKeywords: ["research","strategy","ads","engagement"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ]
  },

  "hr specialist": {
    easy: [
      { question: "Tell me about yourself.", answerKeywords: ["name","place","education","family","goals","hobbies"] },
      { question: "What is HR?", answerKeywords: ["recruitment","employee","policies","training"] },
      { question: "What is onboarding?", answerKeywords: ["process","new","employee","integration"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    intermediate: [
      { question: "Explain performance appraisal.", answerKeywords: ["review","evaluation","feedback","employee"] },
      { question: "What is employee engagement?", answerKeywords: ["motivation","satisfaction","team","culture"] },
      { question: "Difference between HRBP and HR generalist?", answerKeywords: ["strategy","operations","roles","support"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    hard: [
      { question: "How would you resolve workplace conflict?", answerKeywords: ["mediate","communication","solution","policy"] },
      { question: "Explain succession planning.", answerKeywords: ["future","roles","employees","development"] },
      { question: "Critical Thinking: How would you improve retention rate?", answerKeywords: ["benefits","growth","engagement","feedback"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ]
  },

  "financial analyst": {
    easy: [
      { question: "Tell me about yourself.", answerKeywords: ["name","place","education","family","goals","hobbies"] },
      { question: "What is financial analysis?", answerKeywords: ["evaluate","financial","data","performance"] },
      { question: "What are financial statements?", answerKeywords: ["balance sheet","income statement","cash flow"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    intermediate: [
      { question: "Explain ratio analysis.", answerKeywords: ["liquidity","profitability","efficiency","solvency"] },
      { question: "Difference between equity and debt?", answerKeywords: ["ownership","loan","capital","investment"] },
      { question: "What is budgeting?", answerKeywords: ["plan","expenses","forecast","financial"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    hard: [
      { question: "How would you assess a company for investment?", answerKeywords: ["valuation","risk","return","analysis"] },
      { question: "Explain financial modeling.", answerKeywords: ["projection","assumptions","scenario","analysis"] },
      { question: "Critical Thinking: How would you optimize company expenses?", answerKeywords: ["cost","efficiency","budget","plan"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ]
  },

  "content writer": {
    easy: [
      { question: "Tell me about yourself.", answerKeywords: ["name","place","education","family","goals","hobbies"] },
      { question: "What is content writing?", answerKeywords: ["create","articles","blogs","text"] },
      { question: "Difference between copywriting and content writing?", answerKeywords: ["ads","informative","persuade","text"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    intermediate: [
      { question: "Explain SEO content writing.", answerKeywords: ["keywords","rank","search","engine"] },
      { question: "What is content strategy?", answerKeywords: ["plan","publish","goal","audience"] },
      { question: "Difference between B2B and B2C content?", answerKeywords: ["audience","business","consumer","style"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ],
    hard: [
      { question: "How would you write content for engagement?", answerKeywords: ["audience","hook","value","CTA"] },
      { question: "Explain content audit.", answerKeywords: ["review","update","analyze","improve"] },
      { question: "Critical Thinking: How would you handle negative feedback on content?", answerKeywords: ["analyze","respond","update","engagement"] },
      { question: "⭐ Interview Completed!", answerKeywords: [] }
    ]
  },
   "research scientist": {
  easy: [
    { question: "Tell me about yourself.", answerKeywords: ["name","place","education","family","goals","hobbies"] },
    { question: "What is your field of research?", answerKeywords: ["topic","study","experiments","analysis"] },
    { question: "What research methods do you use?", answerKeywords: ["qualitative","quantitative","experiment","survey"] },
    { question: "⭐ Interview Completed!", answerKeywords: [] }
  ],
  intermediate: [
    { question: "Explain your most significant research finding.", answerKeywords: ["discovery","impact","data","analysis"] },
    { question: "How do you validate your research results?", answerKeywords: ["peer review","replication","data","analysis"] },
    { question: "What is hypothesis testing?", answerKeywords: ["null","alternative","experiment","conclusion"] },
    { question: "⭐ Interview Completed!", answerKeywords: [] }
  ],
  hard: [
    { question: "How would you design a large-scale research study?", answerKeywords: ["planning","sample","controls","data collection"] },
    { question: "Explain statistical significance.", answerKeywords: ["p-value","confidence","test","results"] },
    { question: "Critical Thinking: How would you handle conflicting experimental results?", answerKeywords: ["analyze","review","adjust","report"] },
    { question: "⭐ Interview Completed!", answerKeywords: [] }
  ]
},

"robotics engineer": {
  easy: [
    { question: "Tell me about yourself.", answerKeywords: ["name","place","education","family","goals","hobbies"] },
    { question: "What is robotics?", answerKeywords: ["machines","automation","robots","control"] },
    { question: "Name sensors used in robots.", answerKeywords: ["ultrasonic","IR","gyroscope","camera"] },
    { question: "⭐ Interview Completed!", answerKeywords: [] }
  ],
  intermediate: [
    { question: "Explain path planning.", answerKeywords: ["navigation","algorithm","obstacles","motion"] },
    { question: "What is ROS?", answerKeywords: ["robot","operating system","nodes","topics"] },
    { question: "Difference between actuator and sensor?", answerKeywords: ["motion","feedback","input","output"] },
    { question: "⭐ Interview Completed!", answerKeywords: [] }
  ],
  hard: [
    { question: "How would you design an autonomous robot?", answerKeywords: ["planning","control","navigation","AI"] },
    { question: "Explain SLAM (Simultaneous Localization and Mapping).", answerKeywords: ["mapping","localization","algorithm","environment"] },
    { question: "Critical Thinking: How would you build a robot for disaster recovery?", answerKeywords: ["strategy","design","sensors","automation"] },
    { question: "⭐ Interview Completed!", answerKeywords: [] }
  ]
},

"biomedical engineer": {
  easy: [
    { question: "Tell me about yourself.", answerKeywords: ["name","place","education","family","goals","hobbies"] },
    { question: "What is biomedical engineering?", answerKeywords: ["medical","devices","healthcare","technology"] },
    { question: "Give examples of biomedical devices.", answerKeywords: ["prosthetics","imaging","monitoring","implants"] },
    { question: "⭐ Interview Completed!", answerKeywords: [] }
  ],
  intermediate: [
    { question: "Explain bioinstrumentation.", answerKeywords: ["sensors","measurement","medical","equipment"] },
    { question: "What is tissue engineering?", answerKeywords: ["cells","scaffold","growth","regeneration"] },
    { question: "Difference between biomedical and clinical engineering?", answerKeywords: ["medical","device","hospital","applications"] },
    { question: "⭐ Interview Completed!", answerKeywords: [] }
  ],
  hard: [
    { question: "How would you design a medical device for home use?", answerKeywords: ["safety","user-friendly","accuracy","technology"] },
    { question: "Explain FDA regulations for medical devices.", answerKeywords: ["compliance","testing","approval","standards"] },
    { question: "Critical Thinking: How would you innovate in healthcare technology?", answerKeywords: ["research","design","implementation","impact"] },
    { question: "⭐ Interview Completed!", answerKeywords: [] }
  ]
},

"seo specialist": {
  easy: [
    { question: "Tell me about yourself.", answerKeywords: ["name","place","education","family","goals","hobbies"] },
    { question: "What is SEO?", answerKeywords: ["search","engine","optimization","ranking"] },
    { question: "What is a backlink?", answerKeywords: ["link","reference","authority","website"] },
    { question: "⭐ Interview Completed!", answerKeywords: [] }
  ],
  intermediate: [
    { question: "Explain keyword research.", answerKeywords: ["search","volume","competition","ranking"] },
    { question: "What is domain authority?", answerKeywords: ["score","trust","website","ranking"] },
    { question: "Difference between on-page and off-page SEO?", answerKeywords: ["content","links","optimization","ranking"] },
    { question: "⭐ Interview Completed!", answerKeywords: [] }
  ],
  hard: [
    { question: "How would you optimize a website for a competitive niche?", answerKeywords: ["strategy","content","links","technical"] },
    { question: "Explain technical SEO optimizations.", answerKeywords: ["speed","indexing","schema","mobile"] },
    { question: "Critical Thinking: How would you improve SEO for a global e-commerce site?", answerKeywords: ["strategy","analytics","international","content"] },
    { question: "⭐ Interview Completed!", answerKeywords: [] }
  ]
},

"ai researcher": {
  easy: [
    { question: "Tell me about yourself.", answerKeywords: ["name","place","education","family","goals","hobbies"] },
    { question: "What is AI?", answerKeywords: ["artificial","intelligence","machine","learning"] },
    { question: "What libraries or frameworks do you use for AI?", answerKeywords: ["TensorFlow","PyTorch","Keras","Scikit-learn"] },
    { question: "⭐ Interview Completed!", answerKeywords: [] }
  ],
  intermediate: [
    { question: "Explain supervised vs unsupervised learning.", answerKeywords: ["labeled","unlabeled","pattern","prediction"] },
    { question: "What is neural network?", answerKeywords: ["layers","nodes","activation","learning"] },
    { question: "Explain overfitting and underfitting.", answerKeywords: ["model","generalization","training","data"] },
    { question: "⭐ Interview Completed!", answerKeywords: [] }
  ],
  hard: [
    { question: "How would you design a novel AI algorithm?", answerKeywords: ["innovation","data","optimization","evaluation"] },
    { question: "Explain reinforcement learning with an example.", answerKeywords: ["agent","environment","reward","policy"] },
    { question: "Critical Thinking: How would you evaluate AI ethics in research?", answerKeywords: ["bias","transparency","impact","decision"] },
    { question: "⭐ Interview Completed!", answerKeywords: [] }
  ]
}

};


  const motivationalQuotes = [
    "Believe in yourself, you are stronger than you think.",
    "Every expert was once a beginner.",
    "Success comes to those who prepare.",
    "Your future is created by what you do today, not tomorrow."
  ];

  function addMessage(text, sender = "bot") {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.textContent = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  function findRoleKey(input) {
    const inLower = (input || "").toLowerCase().trim();
    if (!inLower) return null;
    for (const key of Object.keys(roleQuestions)) {
      if (key.toLowerCase() === inLower) return key;
    }
    for (const key of Object.keys(roleQuestions)) {
      const k = key.toLowerCase();
      if (inLower.includes(k) || k.includes(inLower)) return key;
    }
    const tokens = inLower.split(/\s+/);
    for (const key of Object.keys(roleQuestions)) {
      const k = key.toLowerCase();
      for (const t of tokens) {
        if (k.includes(t) || t.includes(k)) return key;
      }
    }
    return null;
  }

  function showStarsAndQuote() {
    const starDiv = document.createElement("div");
    starDiv.classList.add("stars");
    starDiv.innerHTML = "⭐⭐⭐";
    messages.appendChild(starDiv);

    const quoteDiv = document.createElement("div");
    quoteDiv.classList.add("quote");
    quoteDiv.textContent = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    messages.appendChild(quoteDiv);
  }

  function resetInterview() {
    role = "";
    currentQuestions = [];
    questionIndex = -1;
    score = 0;
  }

  function showQuestion() {
    if (questionIndex < 0 || questionIndex >= currentQuestions.length) return;
    const qObj = currentQuestions[questionIndex];
    const text = typeof qObj === "string" ? qObj : qObj.question;
    if (text.includes("⭐")) {
      addMessage(text, "bot");
      const total = currentQuestions.filter(q => !(q.question || q).includes("⭐")).length;
      addMessage("🎉 Interview completed!", "bot");
      addMessage(`Your score: ${score}/${total}`, "bot");
      showStarsAndQuote();
      resetInterview();
      addMessage("👋 If you'd like another interview, tell me a role (e.g., Data Analyst).", "bot");
      return;
    }
    addMessage(text, "bot");
  }

  function evaluateAnswer(answer) {
    const qObj = currentQuestions[questionIndex];
    const keywords = (qObj.answerKeywords || []).map(k => k.toLowerCase());
    const lower = answer.toLowerCase();

    if (lower === "hint") {
      addMessage(keywords.length ? "Hint: " + keywords.join(", ") : "No specific keywords.", "bot");
      return false;
    }
    if (lower === "skip") {
      addMessage("Skipped.", "bot");
      return true;
    }
    if (!keywords.length) {
      addMessage("✅ Thanks for your answer.", "bot");
      score++;
      return true;
    }
    const matched = keywords.filter(k => lower.includes(k));
    if (matched.length) {
      addMessage(`✅ Good answer — mentioned ${matched.length}/${keywords.length} terms.`, "bot");
      score++;
      return true;
    }
    addMessage("⚠️ Missing key points. Try again, or type 'hint' or 'skip'.", "bot");
    return false;
  }

  function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;
    addMessage(text, "user");
    userInput.value = "";

    if (!role) {
      const matched = findRoleKey(text);
      if (matched) {
        role = matched;
        currentQuestions = [...commonQuestions];
        currentQuestions = currentQuestions.concat(roleQuestions[role][level] || []);
        questionIndex = 0;
        addMessage(`Great — starting ${role} interview (${level} level).`, "bot");
        showQuestion();
      } else {
        addMessage("Role not found. Try again (e.g., Data Analyst).", "bot");
      }
      return;
    }

    if (questionIndex >= 0 && questionIndex < currentQuestions.length) {
      const advance = evaluateAnswer(text);
      if (advance) {
        questionIndex++;
        if (questionIndex >= currentQuestions.length) {
          addMessage("🎉 Interview completed!", "bot");
          resetInterview();
        } else {
          showQuestion();
        }
      }
    }
  }

  userInput.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });
  if (sendBtn) sendBtn.addEventListener("click", sendMessage);

  addMessage(`👋 Welcome! You chose **${level.toUpperCase()}** level. What is your dream role?`, "bot");
});
