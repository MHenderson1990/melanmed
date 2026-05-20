# MelanMed

### Care That Understands You.

MelanMed is a full-stack web application that connects Black patients in the DFW area with Black doctors across 
all major medical specialties. Built to make culturally affirming healthcare accessible and easy to find.

---

## Live Demo

- **Frontend:** https://melanmed.vercel.app
- **Backend:** https://melanmed-backend.onrender.com

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, React Router, Context API |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcrypt |
| AI Feature | Claude API (Anthropic) |
| Frontend Deployment | Vercel |
| Backend Deployment | Render |
| Database Hosting | MongoDB Atlas |

---

## Key Features

- Browse and filter Black doctors in DFW by specialty, gender, LGBTQ+ friendly, gender affirming, visit type and insurance
- View detailed doctor profiles with bio, reviews and contact info
- Book, view and cancel appointments
- Leave star ratings and written reviews
- User registration and login with JWT authentication
- AI-powered doctor matching assistant powered by Claude API
- Responsive design for mobile and desktop

---

## AI-Powered Feature

MelanMed includes an AI chat assistant powered by the Claude API. Patients describe their 
healthcare needs in plain English and receive personalized doctor recommendations based on 
specialty, location, insurance and preferences.

Example: "I need a Black female therapist in Dallas who is LGBTQ+ friendly and takes Aetna" → Claude recommends Candy Jones 
with a full explanation of why she is the right match.

---

## Project Structure
melanmed/
├── client/                    → React frontend
│   └── src/
│       ├── components/        → Navbar, DoctorCard, AIChat
│       ├── pages/             → Home, Doctors, DoctorProfile, Booking, Dashboard, Login, Register
│       ├── context/           → AuthContext
│       └── services/          → api.js
└── server/                    → Express backend
├── controllers/           → authController, doctorController, appointmentController, reviewController, aiController
├── models/                → User, Doctor, Appointment, Review
├── routes/                → authRoutes, doctorRoutes, appointmentRoutes, reviewRoutes, aiRoutes
├── middleware/            → authMiddleware
└── server.js

## API Endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | /api/doctors | Get all doctors | Public |
| GET | /api/doctors/:id | Get one doctor | Public |
| GET | /api/doctors/specialty/:specialty | Filter by specialty | Public |
| POST | /api/auth/register | Register user | Public |
| POST | /api/auth/login | Login user | Public |
| POST | /api/appointments | Book appointment | Protected |
| GET | /api/appointments/mine | Get my appointments | Protected |
| PUT | /api/appointments/:id/cancel | Cancel appointment | Protected |
| POST | /api/reviews | Create review | Protected |
| GET | /api/reviews/:doctorId | Get doctor reviews | Public |
| POST | /api/ai/chat | AI doctor matching | Public |

---

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB Atlas account
- Anthropic API key

### Clone the Repository
git clone https://github.com/MHenderson1990/melanmed.git cd melanmed

### Backend Setup
cd server
npm install

Create a `.env` file in the server folder:
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ANTHROPIC_API_KEY=your_claude_api_key

Start the server:
node server.js

### Frontend Setup
cd client
npm install

Create a `.env` file in the client folder:
VITE_API_URL=http://localhost:5001/api

Start the frontend:
npm run dev

---

## GitHub Commits

This project was built incrementally with meaningful commits demonstrating the 
full development process from initial setup through deployment.

---

## AI Usage During Development

AI tools were used throughout the entire Software Development Lifecycle including planning, 
architecture design, code generation, debugging, and documentation. All code was reviewed, 
tested and validated by the developer. AI served as a development assistant and teaching tool, 
not a replacement for engineering judgment.

---

## Developer

Morgan Henderson | Software Engineering Bootcamp | 2026

GitHub: https://github.com/MHenderson1990
