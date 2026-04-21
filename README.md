# Smart Student Management System (SmartEdu)

A production-grade, Full Stack Education ERP built with the MERN stack, TypeScript, and Three.js.

## ✨ Features

- **Premium UI/UX**: Glassmorphism design with Three.js animations and Framer Motion transitions.
- **Batch Hopper**: Signature feature allowing admins to transfer students between batches with capacity validation and audit logs.
- **Role-Based Access (RBAC)**: Specialized dashboards for Admins, Teachers, and Students.
- **Analytics**: Visual trends for attendance, performance, and batch distribution.
- **Clean Architecture**: Backend following SOLID principles and MVC pattern with Repository/Service/Controller layers.

## 🛠 Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS (v4), Three.js, Framer Motion, Zustand.
- **Backend**: Node.js, Express, TypeScript, MongoDB (Mongoose).
- **Authentication**: JWT (Access/Refresh Tokens), Bcrypt.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB

### Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd Smart-Student-Management-System
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env # Update with your DB URI and JWT Secret
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 📂 Project Structure

### Backend
- `src/models`: Mongoose discriminators for User roles (Admin, Teacher, Student).
- `src/services`: Business logic including the Batch Hopper transfer service.
- `src/repositories`: Database abstraction layer.
- `src/controllers`: Request handling and response formatting.

### Frontend
- `src/components/three`: Hero scene with floating 3D academic assets.
- `src/pages/dashboard`: Role-specific views and the Batch Hopper interface.
- `src/components/dashboard`: Glassmorphism layout components.

## 📜 Documentation
Full documentation and diagrams are available in the `docs/` directory:
- [System Idea](docs/idea.md)
- [Class Diagram](docs/diagrams/classDiagram.md)
- [Sequence Diagram](docs/diagrams/sequenceDiagram.md)
- [ER Diagram](docs/diagrams/ErDiagram.md)
