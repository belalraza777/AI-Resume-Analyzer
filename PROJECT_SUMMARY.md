# AI Resume Analyzer - Project Summary

## 📋 Overview

**AI Resume Analyzer** is a full-stack web application that helps job seekers optimize their resumes for Applicant Tracking Systems (ATS). The application uses OpenAI's GPT-4 to analyze uploaded resumes (PDF/DOCX), providing ATS compatibility scores, skill assessments, and actionable improvement suggestions.

## 🏗️ Architecture

### Technology Stack

**Backend:**
- **Runtime:** Node.js with Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (access/refresh tokens) + OAuth 2.0 (Google, Facebook)
- **File Processing:** Multer, pdf-parse, mammoth
- **AI Integration:** OpenAI API (GPT-4.1)
- **Validation:** Joi with custom sanitization
- **Security:** bcryptjs, HTTP-only cookies, Passport.js

**Frontend:**
- **Framework:** React 19 with Vite
- **Routing:** React Router DOM v7
- **State Management:** Zustand + Context API
- **HTTP Client:** Axios with token refresh interceptor
- **UI:** Custom CSS with React Icons
- **Build Tool:** Vite 7

## 📁 Project Structure

```
AI Resume Analyzer/
├── Backend/
│   ├── server.js                 # Express app entry point
│   ├── auth/
│   │   └── passport.js           # OAuth strategies (Google, Facebook)
│   ├── config/
│   │   ├── database.js           # MongoDB connection
│   │   └── multer.js             # File upload configuration
│   ├── controllers/
│   │   ├── analyzeController.js  # Resume analysis logic
│   │   ├── authController.js     # Auth endpoints (register, login, logout)
│   │   └── resumeController.js   # Resume upload handler
│   ├── helpers/
│   │   └── authHelper.js         # Token generation & cookie management
│   ├── middleware/
│   │   ├── authVerify.js         # JWT verification middleware
│   │   └── errorHandler.js       # Global error handler
│   ├── models/
│   │   ├── User.js               # User schema (local + OAuth)
│   │   ├── Resume.js             # Resume metadata schema
│   │   └── Report.js             # Analysis report schema
│   ├── routes/
│   │   ├── auth.js               # /api/v1/auth routes
│   │   ├── oauth.js              # /api/v1/oauth routes
│   │   ├── resume.js             # /api/v1/resumes routes
│   │   └── analyze.js            # /api/v1/analyze routes
│   └── utils/
│       ├── aiClient.js           # OpenAI API integration
│       ├── textExtractor.js      # PDF/DOCX text extraction
│       ├── joiValidation.js      # Request validation schemas
│       └── sanitizer.js          # XSS sanitization utilities
│
└── Frontend/
    ├── src/
    │   ├── main.jsx              # App entry point
    │   ├── App.jsx               # Route configuration
    │   ├── api/
    │   │   └── api.js            # Axios client with interceptors
    │   ├── context/
    │   │   └── AuthContext.jsx   # User authentication state
    │   ├── store/
    │   │   └── useReportsStore.js # Reports state (Zustand)
    │   ├── pages/
    │   │   ├── Dashboard.jsx     # Overview with stats & recent reports
    │   │   ├── Login.jsx         # Login form + OAuth buttons
    │   │   ├── Register.jsx      # Registration form
    │   │   ├── Upload.jsx        # Resume upload & analysis trigger
    │   │   ├── Reports.jsx       # Full report history
    │   │   └── OAuthSuccess.jsx  # OAuth callback handler
    │   └── components/
    │       ├── Layout.jsx        # App shell with navigation
    │       ├── Button.jsx        # Reusable button component
    │       ├── Card.jsx          # Content container component
    │       ├── Input.jsx         # Form input component
    │       ├── FileDropzone.jsx  # Drag-and-drop file uploader
    │       ├── ReportCard.jsx    # Individual report display
    │       └── ScoreRing.jsx     # Circular ATS score visualization
    └── vite.config.js            # Vite build configuration
```

## 🔑 Core Features

### 1. Authentication System
- **Local Authentication:** Email/password with bcrypt hashing
- **OAuth 2.0:** Google and Facebook login integration
- **Token Management:** 
  - Short-lived JWT access tokens (15 minutes)
  - Long-lived refresh tokens (7 days, stored hashed in DB)
  - HTTP-only cookies for secure token storage
  - Automatic token refresh on 401 responses
- **Session Revocation:** Server-side refresh token invalidation

### 2. Resume Upload & Processing
- **Supported Formats:** PDF and DOCX (up to 5MB)
- **File Validation:** MIME type and extension checking
- **Storage:** Local filesystem with unique filenames
- **Text Extraction:**
  - PDF: `pdf-parse` library
  - DOCX: `mammoth` library
  - Text cleaning and normalization

### 3. AI-Powered Analysis
- **OpenAI Integration:** GPT-4.1 model with JSON response format
- **Analysis Output:**
  - **ATS Score:** 0-100 compatibility rating
  - **Skills Found:** Array of identified skills
  - **Skills Missing:** Recommended skills to add
  - **Summary:** Overall resume assessment
  - **Suggestions:** Actionable improvement recommendations
- **Error Handling:** Comprehensive error logging and recovery

### 4. Report Management
- **Report Storage:** MongoDB documents linked to users and resumes
- **Report Viewing:** Dashboard overview + detailed report history
- **Report Statistics:**
  - Total reports count
  - Average ATS score across all reports
  - Best score achieved
  - Latest score
- **Report Actions:** Delete reports (cascades to resume files)

### 5. User Interface
- **Dashboard:** Welcome page with stats, quick actions, recent reports
- **Upload Page:** Drag-and-drop interface with instant analysis
- **Reports Page:** Full history with skill tags and detailed insights
- **Responsive Design:** Clean, modern UI with consistent theming
- **Loading States:** Visual feedback for async operations
- **Error Display:** User-friendly error messages

## 🔐 Security Features

### Backend Security
- **Password Hashing:** bcrypt with salt rounds
- **JWT Signing:** Secure secret key from environment
- **Input Validation:** Joi schemas with XSS sanitization
- **HTTP-Only Cookies:** Prevents XSS token theft
- **CORS Configuration:** Restricted origin with credentials
- **File Upload Limits:** 5MB max, type restrictions
- **Refresh Token Rotation:** New token on every refresh
- **Token Expiration:** Time-limited access tokens

### Frontend Security
- **Credentials Mode:** `withCredentials: true` for cookie transmission
- **Protected Routes:** Authentication-gated pages
- **Token Refresh:** Automatic retry on 401 errors
- **XSS Prevention:** React's built-in escaping
- **Environment Variables:** API URLs from `.env` files

## 📡 API Endpoints

### Authentication (`/api/v1/auth`)
- `POST /register` - Create new account
- `POST /login` - Authenticate user
- `POST /logout` - Invalidate session
- `POST /refresh` - Refresh access token
- `GET /me` - Get current user info (protected)

### OAuth (`/api/v1/oauth`)
- `GET /google` - Initiate Google OAuth
- `GET /google/callback` - Google OAuth callback
- `GET /facebook` - Initiate Facebook OAuth
- `GET /facebook/callback` - Facebook OAuth callback

### Resume Upload (`/api/v1/resumes`)
- `POST /upload` - Upload PDF/DOCX (protected)

### Analysis (`/api/v1/analyze`)
- `GET /report` - Get all user reports (protected)
- `POST /report/:id` - Analyze specific resume (protected)
- `DELETE /report/:id` - Delete report and resume (protected)

## 💾 Database Schema

### User Model
```javascript
{
  username: String,
  email: String (unique),
  passwordHash: String,
  refreshTokenHash: String (hashed, select: false),
  refreshTokenExpiresAt: Date,
  provider: String (local | google | facebook),
  providerId: String,
  timestamps: true
}
```

### Resume Model
```javascript
{
  userId: ObjectId (ref: User),
  filePath: String,
  originalName: String,
  fileType: String (pdf | docx),
  uploadedAt: Date,
  timestamps: true
}
```

### Report Model
```javascript
{
  userId: ObjectId (ref: User),
  resumeId: ObjectId (ref: Resume),
  atsScore: Number (0-100),
  skillsFound: [String],
  skillsMissing: [String],
  summary: String,
  suggestions: String,
  cleanText: String,
  timestamps: true
}
```

## 🚀 Key Workflows

### User Registration Flow
1. User submits registration form
2. Joi validates and sanitizes input
3. Check for existing email/username
4. Hash password with bcrypt
5. Create user document
6. Generate access + refresh tokens
7. Store hashed refresh token in DB
8. Set HTTP-only cookies
9. Return user data

### Resume Analysis Flow
1. User uploads PDF/DOCX via dropzone
2. Multer validates file type and size
3. File saved to `/uploads` directory
4. Resume metadata stored in MongoDB
5. Text extracted from file (pdf-parse or mammoth)
6. Text sent to OpenAI GPT-4.1 with structured prompt
7. AI returns JSON with score, skills, summary, suggestions
8. Report document created and saved
9. Frontend displays analysis results
10. User can view report in history

### Token Refresh Flow
1. Frontend makes API request with expired access token
2. Backend returns 401 Unauthorized
3. Axios interceptor catches 401 error
4. Frontend calls `/auth/refresh` with refresh token cookie
5. Backend validates refresh token hash against database
6. Generate new access + refresh tokens
7. Rotate refresh token (store new hash)
8. Set new cookies in response
9. Retry original request with new access token

### OAuth Authentication Flow
1. User clicks "Continue with Google/Facebook"
2. Redirect to OAuth provider consent screen
3. User authorizes application
4. Provider redirects to callback URL with authorization code
5. Passport strategy exchanges code for profile
6. Find or create user in database
7. Generate access + refresh tokens
8. Set HTTP-only cookies
9. Redirect to frontend `/oauth-success` page
10. Frontend calls `/auth/me` to populate auth context
11. Redirect to dashboard

## 🛠️ Configuration

### Environment Variables (Backend)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ai-resume-analyzer
JWT_SECRET=your-secret-key
NODE_ENV=development
CLIENT_URL=http://localhost:5173
OPENAI_API_KEY=sk-...
API_BASE_URL=https://api.openai.com/v1 (optional)
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
FACEBOOK_CLIENT_ID=...
FACEBOOK_CLIENT_SECRET=...
```

### Environment Variables (Frontend)
```env
VITE_API_URL=http://localhost:5000/api/v1
```

## 📦 Dependencies

### Backend Core Dependencies
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `dotenv` - Environment configuration
- `cors` - Cross-origin resource sharing
- `cookie-parser` - Cookie handling
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT generation/verification
- `joi` - Input validation
- `multer` - File upload handling
- `pdf-parse` - PDF text extraction
- `mammoth` - DOCX text extraction
- `openai` - OpenAI API client
- `passport` - OAuth authentication
- `passport-google-oauth20` - Google OAuth strategy
- `passport-facebook` - Facebook OAuth strategy

### Frontend Core Dependencies
- `react` - UI framework
- `react-dom` - React DOM rendering
- `react-router-dom` - Client-side routing
- `axios` - HTTP client
- `zustand` - State management
- `react-icons` - Icon library
- `vite` - Build tool and dev server

## 🎨 UI/UX Features

### Design System
- **Color Palette:** Modern gradient theme (purple/blue)
- **Typography:** System font stack with proper hierarchy
- **Spacing:** Consistent 8px grid system
- **Components:** Reusable, accessible components
- **Icons:** Feather icons via react-icons
- **Animations:** Smooth transitions and loading states

### User Experience
- **Loading States:** Skeleton screens and spinners
- **Error Handling:** Clear, actionable error messages
- **Empty States:** Helpful prompts for first-time users
- **Optimistic Updates:** Immediate UI feedback
- **Responsive Layout:** Mobile-friendly design
- **Keyboard Navigation:** Accessible forms and interactions

## 🔄 State Management

### Frontend State Architecture
- **AuthContext:** Global user authentication state
- **useReportsStore (Zustand):** Report data and operations
- **Local Component State:** Form inputs and UI toggles
- **URL State:** React Router for navigation

### Backend State
- **Database:** MongoDB as source of truth
- **In-Memory:** No session storage (stateless JWT)
- **File System:** Resume uploads in `/uploads` directory

## 🚦 Error Handling

### Backend Error Strategy
- **Validation Errors:** 400 with Joi error messages
- **Authentication Errors:** 401 for invalid/expired tokens
- **Authorization Errors:** 403 for insufficient permissions
- **Not Found:** 404 for missing resources
- **Server Errors:** 500 with sanitized error messages
- **Error Middleware:** Centralized error formatting

### Frontend Error Strategy
- **Network Errors:** Retry with exponential backoff (via interceptor)
- **Validation Errors:** Display field-specific messages
- **API Errors:** Show user-friendly error cards
- **Fallback UI:** Empty states and error boundaries

## 🧪 Testing Considerations

### Recommended Testing Approach
- **Backend Unit Tests:** Controller logic, auth helpers, text extraction
- **Backend Integration Tests:** API endpoints with test database
- **Frontend Unit Tests:** Component rendering and behavior
- **Frontend Integration Tests:** User flows with mocked API
- **E2E Tests:** Complete user journeys (Playwright/Cypress)

### Test Coverage Goals
- Authentication flows (local + OAuth)
- Resume upload and validation
- AI analysis integration
- Token refresh mechanism
- Error handling paths

## 🚀 Deployment Considerations

### Backend Deployment
- **Hosting:** Node.js platform (Heroku, Railway, Render)
- **Database:** MongoDB Atlas (managed)
- **Environment:** Secure secrets management
- **File Storage:** Consider cloud storage (S3, Cloudinary)
- **Logs:** Structured logging (Winston, Pino)
- **Monitoring:** Application performance monitoring

### Frontend Deployment
- **Hosting:** Static site hosting (Vercel, Netlify, Cloudflare Pages)
- **Build:** `npm run build` produces optimized bundle
- **Environment:** Configure production API URL
- **CDN:** Automatic with most static hosts

## 📈 Potential Improvements

### Feature Enhancements
- **Resume Templates:** ATS-optimized templates
- **Comparison View:** Compare multiple resume versions
- **Industry Targeting:** Tailor analysis by job sector
- **Batch Processing:** Analyze multiple resumes at once
- **Export Reports:** Download analysis as PDF
- **Email Notifications:** Analysis completion alerts
- **Resume Editor:** In-app resume modification
- **Job Posting Analysis:** Match resume to job descriptions

### Technical Improvements
- **Caching:** Redis for API response caching
- **Rate Limiting:** Protect against abuse
- **WebSockets:** Real-time analysis progress
- **Background Jobs:** Queue-based processing (Bull/Bee)
- **File Cleanup:** Scheduled job to remove old files
- **Analytics:** Track usage patterns and success metrics
- **A/B Testing:** Experiment with UI variations
- **Internationalization:** Multi-language support
- **Accessibility:** WCAG 2.1 AA compliance audit
- **Performance:** Code splitting, lazy loading
- **TypeScript:** Type safety across codebase

### Security Enhancements
- **Rate Limiting:** Per-user and global limits
- **CSRF Protection:** Token-based protection
- **Content Security Policy:** Strict CSP headers
- **Audit Logging:** Track security-relevant events
- **File Scanning:** Malware detection for uploads
- **Two-Factor Authentication:** TOTP or SMS codes
- **Account Recovery:** Email-based password reset
- **Session Management:** Device tracking and revocation

## 📝 Development Setup

### Backend Setup
```bash
cd Backend
npm install
# Configure .env file
npm run dev  # Uses nodemon for hot reload
```

### Frontend Setup
```bash
cd Frontend
npm install
# Configure .env file
npm run dev  # Starts Vite dev server on port 5173
```

### Database Setup
```bash
# Install MongoDB locally or use MongoDB Atlas
# Connection string in Backend/.env as MONGO_URI
```

## 🎯 Project Goals

The AI Resume Analyzer aims to:
1. **Empower Job Seekers:** Provide actionable insights to improve resume quality
2. **Increase ATS Pass Rates:** Help candidates get past automated screening
3. **Democratize Career Tools:** Free alternative to expensive resume services
4. **Leverage AI Effectively:** Use GPT-4 for nuanced resume analysis
5. **Maintain Privacy:** User data stays secure and is not shared

## 📄 License & Credits

- **Project Type:** Educational/Portfolio project
- **AI Provider:** OpenAI GPT-4.1
- **Icons:** Feather Icons (react-icons)
- **Frontend Framework:** React 19
- **Backend Framework:** Express.js

---

**Last Updated:** December 31, 2025  
**Status:** Functional MVP with core features implemented  
**Version:** 1.0.0
