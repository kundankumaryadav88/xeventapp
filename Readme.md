# 🎉 The Social Hub – Events Management App

A full-stack MERN (MongoDB, Express, React, Node.js) web application for managing and discovering events. Built with clean UI and role-based features for Participants, Organizers, and Admins.

---

## 🚀 Project Overview

The Social Hub lets users:
- 📝 Sign up / Login
- 🔍 Explore events
- 📅 Register / Cancel participation
- 🎭 Request Organizer role
- 📂 Create / Edit events (Organizer/Admin)
- ✅ Admins approve/reject Organizer requests
- 🔐 Role-based Dashboards

This project is built to pass automated Cypress test suites with specific layout and functionality requirements.

---

## 🧩 Tech Stack

- **Frontend:** React (with Vite), React Router, Axios, Context API
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT
- **Styling:** CSS (Responsive layout)
- **Testing:** Cypress (E2E)
- **Media Storage (Optional):** Cloudinary

---

## 📁 Folder Structure

\`\`\`
frontend/
├── api/              # Axios API handlers
├── components/       # Reusable UI components
├── context/          # Auth context
├── pages/            # Route pages
├── routes/           # Route definitions
├── utils/            # Helpers (config, date utils)
├── App.jsx
├── main.jsx
└── index.css
\`\`\`

---

## 🛠️ Installation Instructions

### 1. Clone the repo
\`\`\`bash
git clone https://github.com/your-username/events-app.git
cd events-app
\`\`\`

### 2. Set up the Backend
\`\`\`bash
cd backend
npm install
# Create .env with your MongoDB URI and JWT_SECRET
npm run dev
\`\`\`

### 3. Set up the Frontend
\`\`\`bash
cd frontend
npm install
# Create .env file
echo "VITE_API_BASE_URL=http://localhost:5000" > .env
npm run dev
\`\`\`

The frontend runs at: \`http://localhost:3000\`

---

## 🧪 Run Cypress Tests

### 1. Make sure both frontend (port 3000) and backend (port 5000) are running.

### 2. Run Cypress E2E tests
\`\`\`bash
cd assessment
npx cypress run --spec "cypress/e2e/frontend.cy.js"
\`\`\`

> ✅ Ensure routes like \`/events\`, \`/login\`, \`/profile\` render exact text/layout from mock screenshots.

---

## 💡 Usage Guidelines

- Use the navbar to navigate: Home | Login | Signup
- Participants can:
  - View events
  - Register / Cancel registrations
  - Request Organizer role
- Organizers/Admins can:
  - View registrations
  - Create / Edit Events
- Admin can:
  - Approve/Reject organizer requests

---

## 🔗 Useful Links

- [React Docs](https://reactjs.org/docs/getting-started.html)
- [Vite Docs](https://vitejs.dev/)
- [Cypress Docs](https://docs.cypress.io/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Cloudinary](https://cloudinary.com/)

---

## 📌 Notes

- Cypress tests require *exact* text matching.
- Every button should have \`type="submit"\` and inputs must have \`name\` matching the label.
- Frontend must run on port \`3000\`, backend on \`5000\`.

---

## 👨‍💻 Author

**Kundan Kumar Yadav**  
Contributions, issues, and feature suggestions are welcome!
