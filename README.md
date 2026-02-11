<div align="center">

# 🤖 AI Resume Analyzer

**Beat Applicant Tracking Systems with AI-Powered Resume Analysis**

An intelligent full-stack web application that analyzes resumes against ATS standards using OpenAI GPT-4.1, providing actionable scores, skill assessments, and improvement suggestions.

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7+-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4.1-412991?logo=openai&logoColor=white)](https://openai.com/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](#license)

[Features](#-features) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [API Reference](#-api-reference) · [Architecture](#-architecture)

</div>

---

## 📸 Overview

AI Resume Analyzer helps job seekers optimize their resumes for Applicant Tracking Systems. Upload a PDF or DOCX resume and get an instant AI-driven analysis including:

- **ATS Compatibility Score** (0–100)
- **Skills Found** in your resume
- **Missing Skills** you should consider adding
- **Summary** of your resume's overall strength
- **Actionable Suggestions** to improve your chances

---

## ✨ Features

### 🔐 Authentication
- Email/password registration & login with bcrypt hashing
- **OAuth 2.0** — Sign in with Google or Facebook
- JWT access tokens (15 min) + refresh tokens (7 days) stored as HTTP-only cookies
- Automatic token refresh via Axios interceptor
- Server-side session revocation

### 📄 Resume Upload & Processing
- Drag-and-drop file upload interface
- Supports **PDF** and **DOCX** (up to 5 MB)
- MIME type + extension validation
- Text extraction via `pdf-parse` and `mammoth`
- Extracted text stored in database for re-analysis

### 🧠 AI-Powered Analysis
- OpenAI **GPT-4.1** with structured JSON output mode
- Returns ATS score, skills found/missing, summary, and suggestions
- Deterministic results with low temperature (0.2)

### 📊 Dashboard & Reports
- Dashboard with feature overview and quick-action buttons
- Full report history with skill tags and detailed insights
- Delete reports (cascading cleanup of resume files)

### 🎨 Modern UI/UX
- Clean, responsive design with gradient theme
- Built with React 19 + Vite 7
- Zustand for state management, React Router v7 for navigation
- Loading states, error handling, and empty-state prompts

---

## 🛠 Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| **Node.js + Express** | REST API server |
| **MongoDB + Mongoose** | Database & ODM |
| **JWT + Passport.js** | Authentication (local + OAuth) |
| **OpenAI SDK** | GPT-4.1 resume analysis |
| **Multer** | File upload handling |
| **pdf-parse / mammoth** | PDF & DOCX text extraction |
| **Joi** | Request validation |
| **bcryptjs** | Password hashing |

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **Vite 7** | Build tool & dev server |
| **React Router v7** | Client-side routing |
| **Zustand** | Global state management |
| **Axios** | HTTP client with interceptors |
| **React Icons** | Icon library |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **MongoDB** (local instance or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **OpenAI API Key** ([Get one here](https://platform.openai.com/api-keys))
- *(Optional)* Google / Facebook OAuth credentials

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ai-resume-analyzer.git
cd ai-resume-analyzer
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend/` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ai-resume-analyzer
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
CLIENT_URL=http://localhost:5173
OPENAI_API_KEY=sk-...

# Optional: OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_CLIENT_ID=your-facebook-client-id
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret
```

Start the server:

```bash
npm run dev      # Development (with hot reload via nodemon)
npm start        # Production
```

The API will be available at `http://localhost:5000`.

### 3. Frontend Setup

```bash
cd Frontend
npm install
```

Create a `.env` file in the `Frontend/` directory:

```env
VITE_BACKEND_API_URL=http://localhost:5000/api/v1
```

Start the dev server:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 📡 API Reference

All endpoints are prefixed with `/api/v1`. Protected routes require a valid JWT (sent automatically via HTTP-only cookies).

### Auth — `/api/v1/auth`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/register` | Create a new account | No |
| `POST` | `/login` | Log in & receive tokens | No |
| `POST` | `/logout` | Invalidate session | Yes |
| `POST` | `/refresh` | Refresh access token | Cookie |
| `GET`  | `/me` | Get current user info | Yes |

### OAuth — `/api/v1/oauth`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/google` | Initiate Google OAuth flow |
| `GET` | `/google/callback` | Google OAuth callback |
| `GET` | `/facebook` | Initiate Facebook OAuth flow |
| `GET` | `/facebook/callback` | Facebook OAuth callback |

### Resumes — `/api/v1/resumes`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/upload` | Upload a PDF/DOCX resume | Yes |

### Analysis — `/api/v1/analyze`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/report` | Get all user reports | Yes |
| `POST` | `/report/:id` | Analyze a specific resume | Yes |
| `DELETE` | `/report/:id` | Delete report & resume | Yes |

---

## 🏗 Architecture

```
┌──────────────┐        ┌──────────────┐        ┌──────────────┐
│              │  HTTP   │              │  Query  │              │
│   React SPA  │◄──────►│  Express API │◄──────►│   MongoDB    │
│  (Vite + RR) │  Axios  │  (Node.js)   │Mongoose │   (Atlas)    │
│              │        │              │        │              │
└──────────────┘        └──────┬───────┘        └──────────────┘
                               │
                               │ OpenAI SDK
                               ▼
                        ┌──────────────┐
                        │   OpenAI     │
                        │  GPT-4.1     │
                        └──────────────┘
```

### Project Structure

```
AI Resume Analyzer/
├── Backend/
│   ├── server.js               # Entry point — starts Express server
│   ├── app.js                  # Express app config, middleware, routes
│   ├── auth/
│   │   └── passport.js         # Google & Facebook OAuth strategies
│   ├── config/
│   │   ├── database.js         # MongoDB connection
│   │   └── multer.js           # File upload config (5 MB, PDF/DOCX)
│   ├── controllers/
│   │   ├── analyzeController.js# Resume analysis + report CRUD
│   │   ├── authController.js   # Register, login, logout, refresh, me
│   │   └── resumeController.js # Resume upload handler
│   ├── helpers/
│   │   └── authHelper.js       # Token generation & cookie helpers
│   ├── middleware/
│   │   ├── authVerify.js       # JWT verification middleware
│   │   └── errorHandler.js     # Global error handler
│   ├── models/
│   │   ├── User.js             # User schema (local + OAuth providers)
│   │   ├── Resume.js           # Resume metadata + extracted text
│   │   └── Report.js           # AI analysis report schema
│   ├── routes/                 # Express route definitions
│   └── utils/
│       ├── aiClient.js         # OpenAI API integration
│       ├── textExtractor.js    # PDF/DOCX → plain text
│       ├── joiValidation.js    # Input validation schemas
│       └── sanitizer.js        # XSS sanitization utilities
│
└── Frontend/
    └── src/
        ├── App.jsx             # Root component with providers
        ├── main.jsx            # React DOM entry point
        ├── api/
        │   └── api.js          # Axios client + token refresh interceptor
        ├── context/
        │   └── AuthContext.jsx  # Authentication state (Context API)
        ├── store/
        │   └── useReportsStore.js # Reports state (Zustand)
        ├── pages/
        │   ├── Dashboard.jsx   # Landing page with features overview
        │   ├── Login.jsx       # Login form + OAuth buttons
        │   ├── Register.jsx    # Registration form
        │   ├── Upload.jsx      # Drag-and-drop upload + analysis
        │   ├── Report.jsx      # Report history & details
        │   └── OAuthSuccess.jsx# OAuth callback handler
        ├── components/
        │   ├── ReportCard.jsx  # Individual report display card
        │   └── Layout/         # Header, Footer, app shell
        └── Routes/
            ├── AppRoutes.jsx   # Route definitions
            └── ProtectedRoute.jsx # Auth-gated route wrapper
```

### Database Models

**User** — Supports local and OAuth authentication
```
username · email (unique) · passwordHash · refreshTokenHash
provider (local|google|facebook) · providerId · timestamps
```

**Resume** — Uploaded file metadata with extracted text
```
userId → User · filePath · originalName · fileType (pdf|docx)
extractedText · uploadedAt · timestamps
```

**Report** — AI analysis results linked to user and resume
```
userId → User · resumeId → Resume · atsScore (0-100)
skillsFound [String] · skillsMissing [String]
summary · suggestions · timestamps
```

---

## 🔒 Security

- **Password Hashing** — bcrypt with salt rounds
- **HTTP-Only Cookies** — Prevents XSS token theft
- **JWT Rotation** — Refresh tokens are hashed and rotated on every refresh
- **Input Validation** — Joi schemas with XSS sanitization
- **CORS** — Restricted origins with credentials support
- **File Validation** — MIME type + extension checks, 5 MB size limit
- **Protected Routes** — Both backend (middleware) and frontend (route guards)

---

## 🚢 Deployment

### Backend
Deploy to any Node.js hosting platform (Render, Railway, Heroku, etc.):
- Set all environment variables from `.env`
- Use **MongoDB Atlas** for the database
- Consider cloud storage (S3) for resume files in production

### Frontend
Deploy as a static site (Vercel, Netlify, Cloudflare Pages):
```bash
cd Frontend
npm run build    # Outputs to dist/
```
- Set `VITE_BACKEND_API_URL` to your production API URL
- Includes `vercel.json` with SPA rewrites for Vercel deployment

---

## 🗺 Roadmap

- [ ] Job description matching — compare resume against specific job postings
- [ ] Resume comparison — diff multiple resume versions side-by-side
- [ ] Export reports as PDF
- [ ] Industry-specific analysis templates
- [ ] Rate limiting & Redis caching
- [ ] Email notifications on analysis completion
- [ ] Two-factor authentication
- [ ] TypeScript migration

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with ❤️ using **React**, **Node.js**, **MongoDB**, and **OpenAI GPT-4.1**

</div>
