═══════════════════════════════════════════════════════════════════════════
                    AI RESUME ANALYZER - FRONTEND UI PLAN
═══════════════════════════════════════════════════════════════════════════


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎨 DESIGN TOKENS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COLORS
──────
Primary:      #6366F1 (Indigo)     → buttons, links, active states
Success:      #10B981 (Green)      → high scores (80+), success messages
Warning:      #F59E0B (Amber)      → medium scores (60-79)
Danger:       #EF4444 (Red)        → low scores (<60), errors, delete
Background:   #F8FAFC              → page background
Surface:      #FFFFFF              → cards
Text:         #1E293B              → headings
Text Light:   #64748B              → secondary text
Border:       #E2E8F0              → borders, dividers

TYPOGRAPHY
──────────
Font: 'Inter', system-ui, sans-serif
Sizes: 14px (small) | 16px (body) | 20px (h3) | 24px (h2) | 32px (h1)

SPACING
───────
8px | 16px | 24px | 32px | 48px

RADIUS
──────
6px (buttons/inputs) | 12px (cards) | 9999px (pills/avatars)


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📦 TECH STACK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- React 19 + Vite
- React Router DOM
- Axios (API client)
- React Icons (icons) → npm install react icons
- Plain CSS with CSS variables


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📁 FOLDER STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

src/
├── api/
│   └── api.js              # Axios + interceptors
├── components/
│   ├── Layout.jsx          # Navbar + page wrapper
│   ├── Button.jsx          # Reusable button
│   ├── Input.jsx           # Reusable input
│   ├── Card.jsx            # Card container
│   ├── ScoreRing.jsx       # Circular ATS score display
│   └── FileDropzone.jsx    # Drag & drop upload
├── context/
│   └── AuthContext.jsx
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── Upload.jsx
│   └── Reports.jsx
├── styles/
│   └── globals.css         # All styles + CSS variables
├── App.jsx
└── main.jsx


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧩 COMPONENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BUTTON
──────
Variants: primary (filled) | secondary (outlined) | danger (red)
Props: variant, loading, fullWidth, icon

INPUT
─────
Props: label, error, icon, type
Shows red border + error text when error prop is set

CARD
────
Simple white box with shadow and rounded corners
Props: title, children

ALERT
─────
Use third party lib 

SCORE RING
──────────
Circular progress showing ATS score (0-100)
Color changes: green (80+) | amber (60-79) | red (<60)

FILE DROPZONE
─────────────
Dashed border box for drag & drop
States: default | dragging (blue border) | file selected | uploading


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📄 PAGE LAYOUTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LAYOUT (wraps all auth pages)
─────────────────────────────
┌──────────────────────────────────────────────────────────────┐
│  🎯 ResumeAI     Dashboard  Upload  Reports      👤 User ▾  │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│                      PAGE CONTENT                            │
│                                                              │
└──────────────────────────────────────────────────────────────┘


LOGIN / REGISTER
────────────────
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│              ╭────────────────────────────╮                  │
│              │  🎯 ResumeAI               │                  │
│              │                            │                  │
│              │  Welcome Back              │                  │
│              │                            │                  │
│              │  ┌──────────────────────┐  │                  │
│              │  │ Email                │  │                  │
│              │  └──────────────────────┘  │                  │
│              │  ┌──────────────────────┐  │                  │
│              │  │ Password             │  │                  │
│              │  └──────────────────────┘  │                  │
│              │                            │                  │
│              │  ┌──────────────────────┐  │                  │
│              │  │      Sign In         │  │                  │
│              │  └──────────────────────┘  │                  │
│              │                            │                  │
│              │  Don't have account?       │                  │
│              │  Register →                │                  │
│              ╰────────────────────────────╯                  │
│                                                              │
└──────────────────────────────────────────────────────────────┘


DASHBOARD
─────────
┌──────────────────────────────────────────────────────────────┐
│  Welcome back, John! 👋                                      │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ 📄 Resumes   │  │ 📊 Reports   │  │ ⭐ Avg Score │       │
│  │     3        │  │     5        │  │     78%      │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  Quick Actions                                          ││
│  │                                                         ││
│  │  ┌──────────────────┐    ┌──────────────────┐          ││
│  │  │  📤 Upload New   │    │  📋 View Reports │          ││
│  │  └──────────────────┘    └──────────────────┘          ││
│  └─────────────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────────┘


UPLOAD
──────
┌──────────────────────────────────────────────────────────────┐
│  Upload Resume                                               │
│                                                              │
│  ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐│
│  ╎                                                         ╎│
│  ╎                    📄                                   ╎│
│  ╎                                                         ╎│
│  ╎         Drag & drop your resume here                    ╎│
│  ╎              or click to browse                         ╎│
│  ╎                                                         ╎│
│  ╎         PDF, DOC, DOCX (max 5MB)                        ╎│
│  └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘│
│                                                              │
│             ┌────────────────────────┐                       │
│             │    Upload & Analyze    │                       │
│             └────────────────────────┘                       │
└──────────────────────────────────────────────────────────────┘


REPORTS
───────
┌──────────────────────────────────────────────────────────────┐
│  Analysis Reports                                            │
│                                                              │
│  ╭──────────────────────────────────────────────────────────╮│
│  │  ╭────╮                                                  ││
│  │  │85% │  Resume_v3.pdf                      Dec 27       ││
│  │  ╰────╯                                                  ││
│  │                                                          ││
│  │  Skills: [React] [Node.js] [Python] [AWS]                ││
│  │  Missing: [Docker] [Kubernetes]                          ││
│  │                                                          ││
│  │  Summary: Strong frontend skills with React...           ││
│  │                                                          ││
│  │  Suggestions:                                            ││
│  │  • Add quantifiable achievements                         ││
│  │  • Include DevOps experience                             ││
│  │                                                          ││
│  │  [Delete]                                                ││
│  ╰──────────────────────────────────────────────────────────╯│
│                                                              │
│  [More reports...]                                           │
└──────────────────────────────────────────────────────────────┘


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 CSS VARIABLES (globals.css)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

:root {
  --primary: #6366F1;
  --primary-dark: #4F46E5;
  --success: #10B981;
  --warning: #F59E0B;
  --danger: #EF4444;
  --bg: #F8FAFC;
  --surface: #FFFFFF;
  --text: #1E293B;
  --text-light: #64748B;
  --border: #E2E8F0;
  --radius: 6px;
  --radius-lg: 12px;
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 IMPLEMENTATION ORDER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Set up globals.css with CSS variables
2. Create Button, Input, Card, Alert components
3. Create Layout with Navbar
4. Style Login & Register pages
5. Create FileDropzone, style Upload page
6. Create ScoreRing, style Reports page
7. Add stats cards to Dashboard
8. Test & polish


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 KEY POINTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Backend handles tokens via httpOnly cookies
• Axios interceptor auto-refreshes tokens
• All API calls use withCredentials: true
• Protected routes check user in context
• Keep it simple - no heavy UI libraries


═══════════════════════════════════════════════════════════════════════════
                              END OF PLAN
═══════════════════════════════════════════════════════════════════════════