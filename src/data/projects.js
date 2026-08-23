export const projects = [
  {
    slug: "phantom-post",
    title: "PhantomPost",
    tagline:
      "Anonymous social platform with authentication and real-time messaging.",
    problemStatement:
      "Creating a secure and truly anonymous platform where users can communicate in real-time without exposing their identities.",
    solutionOverview:
      "Developed a full-stack social platform featuring secure authentication, real-time messaging via WebSockets, and a robust backend to handle concurrent connections.",
    architecture:
      "Frontend built with React/Next.js communicating via REST APIs and WebSockets to a Node.js backend. Data is persisted in MongoDB.",
    techStack: [
      "Next.js",
      "Node.js",
      "Express",
      "MongoDB",
      "WebSockets",
      "Tailwind CSS",
    ],
    keyFeatures: [
      "Secure user authentication",
      "Real-time anonymous messaging",
      "WebSocket communication",
      "Responsive UI",
    ],
    engineeringChallenges:
      "Implementing scalable WebSocket connections for real-time messaging and ensuring data privacy for anonymous users.",
    designDecisions:
      "Chose WebSockets over long-polling for reduced latency in messaging. Used a dark, minimalist UI to emphasize the 'phantom' aspect of the platform.",
    screenshots: ["/images/projects/phantom-post-1.jpg"], // placeholder paths to be updated
    githubLink: "https://github.com/nimishagrawal/PhantomPost",
  },
  {
    slug: "restaurant-management-system",
    title: "Restaurant Management System",
    tagline:
      "Comprehensive system for managing restaurant operations, orders, and inventory.",
    problemStatement:
      "Restaurants need an efficient way to track orders, manage inventory in real-time, and handle table reservations seamlessly.",
    solutionOverview:
      "Built a complete management dashboard that allows staff to process orders, monitor inventory levels, and manage seating arrangements.",
    architecture:
      "React frontend integrated with a Node.js API, backed by a relational database for transactional integrity.",
    techStack: ["React", "Node.js", "PostgreSQL", "Express", "Tailwind CSS"],
    keyFeatures: [
      "Order processing and tracking",
      "Real-time inventory management",
      "Table reservation system",
      "Admin dashboard with analytics",
    ],
    engineeringChallenges:
      "Ensuring database transaction integrity when multiple orders are placed simultaneously.",
    designDecisions:
      "Opted for PostgreSQL to leverage ACID compliance for critical transactional data related to orders and payments.",
    screenshots: ["/images/projects/restaurant-1.jpg"],
    githubLink: "https://github.com/nimishagrawal/RestaurantManagementSystem",
  },
  {
    slug: "ml-fraud-detection",
    title: "ML Fraud Detection Project",
    tagline:
      "Machine learning model to identify fraudulent transactions in financial data.",
    problemStatement:
      "Financial institutions face significant losses due to undetected fraudulent transactions.",
    solutionOverview:
      "Developed a machine learning pipeline that preprocesses transaction data, trains various classification models, and evaluates them to detect anomalies and fraud.",
    architecture:
      "Python-based pipeline using Scikit-learn, Pandas, and XGBoost for data processing and model training.",
    techStack: ["Python", "Scikit-learn", "Pandas", "NumPy", "XGBoost"],
    keyFeatures: [
      "Data preprocessing and feature engineering",
      "Model training and hyperparameter tuning",
      "Evaluation using precision, recall, and F1-score",
      "Anomaly detection",
    ],
    engineeringChallenges:
      "Handling highly imbalanced datasets where fraudulent transactions are extremely rare compared to legitimate ones.",
    designDecisions:
      "Utilized XGBoost for its performance on structured data and applied SMOTE (Synthetic Minority Over-sampling Technique) to address class imbalance.",
    screenshots: ["/images/projects/ml-fraud-1.jpg"],
    githubLink: "https://github.com/nimishagrawal/ML-Fraud-Detection",
  },
];
