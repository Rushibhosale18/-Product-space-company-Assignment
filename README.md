# SpaceTask: Mini SaaS Task Management System

**A Full Stack Developer Intern Screening Test Submission**

SpaceTask is a production-ready, multi-user Mini SaaS application designed to help users securely manage their personal task lists. Built with a focus on modern design principles, architectural best practices, and robust API security, this project demonstrates end-to-end full-stack development capabilities.

---

## 📌 Executive Summary

The primary objective of this project was to architect and develop a fully functional, secure task management ecosystem from scratch. 
The application guarantees data privacy by mapping tasks specifically to individual user accounts, authenticated via industry-standard JSON Web Tokens (JWT). The frontend is engineered to provide a seamless, premium, user-centric experience utilizing modern component structures and responsive design.

---

## 🚀 Key Capabilities & Features

### 1. Robust Authentication & Security
- **Encrypted Data:** User passwords are computationally hashed and salted using `bcrypt` prior to database storage.
- **Stateless Authentication:** Utilizing `jsonwebtoken` (JWT), the system securely maintains user sessions and API access without retaining session states in the backend. 
- **Endpoint Protection:** Custom Node.js middleware seamlessly enforces access controls, instantly validating tokens and rejecting unauthorized requests on all protected routes.

### 2. Multi-tenant Task Management (CRUD)
- **Data Isolation:** Enforced Sequelize relational design ensures a strict One-to-Many dependency. Users are restricted to globally executing CRUD operations (Create, Read, Update, Delete) strictly on tasks tethered to their unique ID.
- **Dynamic Status Tracking:** Users can seamlessly shift tasks between 'Pending' and 'Completed' states, updating the central Postgres database in real-time.

### 3. State-of-the-art UI/UX Architecture
- **Premium Aesthetics:** Moving past generic layouts, the UI utilizes beautiful gradients, glass-morphism effects, modern typography (Inter), and carefully constructed micro-animations.
- **Interactive Dashboards:** Built with dynamic React components that update state optimistically, ensuring a low-latency "snappy" feel for the end-user.
- **Centralized API Interceptor:** An Axios HTTP client automatically intercepts all outgoing frontend requests to seamlessly attach bearer tokens, drastically reducing code redundancy.

---

## 🛠 Technology Stack

### Frontend (User Interface)
- **Framework:** React.js powered by Vite for lightning-fast Hot Module Replacement (HMR).
- **Styling Pipeline:** Tailwind CSS paired with PostCSS to build consistent, utility-first UI elements.
- **Navigation:** React Router DOM handling seamless client-side single-page mapping.
- **Iconography:** Lucide-react for sharp, scaleable, and lightweight SVG icons.

### Backend (API Server)
- **Runtime Environment:** Node.js managing asynchronous IO effectively.
- **Framework:** Express.js formulating the RESTful API network.
- **Authentication Lifecycle:** JWT and Bcrypt operating hand-in-hand to maintain vault-level access security.

### Database Architecture
- **Relational Database:** PostgreSQL functioning as the primary data store, ensuring ACID compliance and heavy workload readiness.
- **ORM (Object Relational Mapping):** Sequelize structuring raw PostgreSQL relationships (`User.hasMany(Task)`) strictly through JavaScript objects.

---

## 🏗 Architectural Design Decisions

- **Modularity:** The codebase adheres to the MVC (Model-View-Controller) structure for the backend. Controllers strictly dictate request formatting, while Models maintain database schematics and Routes maintain the API web tree.
- **Error Handling Pipeline:** Structured try/catch pipelines ensure that all backend crashes are properly caught and transformed into human-readable 4xx or 5xx JSON responses, preventing server crashes.
- **Defensive Design:** Designed recognizing edge cases—like users attempting to delete tasks they don't own, or attempting to fetch a task payload without a valid Bearer token.

---

*Thank you to the Product Space team for the opportunity to present this technical capability screening test. The project is fully equipped to deploy on scalable edge networks such as Vercel (Frontend) and Render/Heroku (Backend).*
