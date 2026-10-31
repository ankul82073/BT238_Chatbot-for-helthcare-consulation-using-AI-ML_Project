# MediMind AI 🏥

**AI/ML-Based Healthcare Consultation Chatbot**  
*B.Tech Computer Science — Final Year Project*

> ⚠️ **Academic Prototype Notice:** MediMind AI is a frontend-only educational prototype. It does not connect to a real ML model, medical database, or backend service. All data is fictional. Do not use for actual medical decisions.

---

## 🚀 Quick Start

```bash
# 1. Navigate to the project directory
cd medimind-ai

# 2. Install dependencies (if not already done)
npm install

# 3. Start the development server
npm run dev
```

Then open your browser at: **http://localhost:5173**

---

## 📋 Features

### ✅ Implemented (Frontend Demo)

| Feature | Description |
|---------|-------------|
| **Dashboard** | Welcome hero, quick action cards, health overview, recent consultations |
| **AI Health Chat** | Conversational chat with keyword-based mock responses, typing indicator, quick prompts |
| **Symptom Checker** | 4-step form wizard with searchable symptom chips, validation, and result display |
| **Health Insights** | Educational articles with category filters and full-text search |
| **Find a Doctor** | Doctor cards with specialty filter, profile expand, and appointment modal |
| **Health History** | Consultation records with search, filters, expandable details, clear history |
| **About Project** | Project overview, workflow diagram, tech stack, future scope |
| **Multi-Language** | English, Hindi (हिंदी), and Hinglish UI support |
| **Responsive Design** | Works on desktop, tablet, and mobile |
| **Collapsible Sidebar** | Desktop sidebar collapses; mobile uses a drawer |

### 🔄 Planned (Future Backend Integration)

- Python / FastAPI REST API backend
- NLP-based symptom entity extraction (spaCy / Hugging Face)
- ML disease classification (Scikit-learn)
- User authentication and persistent profiles
- Real appointment booking integration
- Voice input support

---

## 🛠️ Tech Stack

| Technology | Purpose | Status |
|-----------|---------|--------|
| React 18 | UI Library | ✅ Implemented |
| Vite 8 | Build tool | ✅ Implemented |
| Tailwind CSS v4 | Styling | ✅ Implemented |
| Lucide React | Icons | ✅ Implemented |
| React Context | State management | ✅ Implemented |
| Python / FastAPI | Backend API | 📅 Planned |
| spaCy / Transformers | NLP | 📅 Planned |
| Scikit-learn | ML Model | 📅 Planned |
| MongoDB | Database | 📅 Planned |

---

## 📁 Project Structure

```
src/
├── components/
│   └── Layout/
│       ├── Sidebar.jsx      # Collapsible sidebar with nav
│       ├── Topbar.jsx       # Top navigation bar
│       └── DisclaimerBar.jsx # Persistent medical disclaimer
├── context/
│   └── AppContext.jsx       # App-wide state (language, active page)
├── data/
│   ├── mockData.js          # All mock/demo data
│   ├── mockChatEngine.js    # Keyword-based chat response engine
│   └── translations.js      # EN / HI / Hinglish translations
├── pages/
│   ├── Dashboard.jsx        # Home dashboard
│   ├── AIChat.jsx           # Chat interface
│   ├── SymptomChecker.jsx   # Multi-step symptom form
│   ├── HealthInsights.jsx   # Educational articles
│   ├── FindDoctor.jsx       # Doctor discovery
│   ├── HealthHistory.jsx    # Consultation history
│   └── AboutProject.jsx     # Project info page
├── App.jsx                  # Main layout
├── main.jsx                 # Entry point
└── index.css                # Global styles + Tailwind v4
```

---

## 🔒 Privacy & Ethics

- **No real data is collected, stored, or transmitted**
- All doctor profiles, health records, and assessments are fictional
- The app explicitly labels all content as educational/demo
- A persistent medical disclaimer is displayed on every page
- Emergency guidance directs users to call 112 (India) in emergencies

---

## 🎓 Academic Information

- **Project Type:** B.Tech Computer Science Final Year Project
- **Domain:** Healthcare Technology / AI-ML
- **Technology Focus:** Frontend (React.js) with planned ML backend
- **Purpose:** To demonstrate the UX and frontend architecture of an AI-powered healthcare consultation system

---

## 📝 Current Limitations

1. Chat responses are keyword-based (not a real NLP/ML model)
2. No backend API — all data is local React state or mock data
3. No user authentication or persistent storage across sessions
4. Appointment requests do not book real appointments
5. Doctor profiles are entirely fictional

---

## 🔮 Future Integration Steps

To connect a real ML backend:

1. Set up a Python FastAPI server with symptom classification endpoints
2. Train an NLP model (spaCy NER) to extract symptom entities from chat text
3. Train a Scikit-learn classifier on a medical symptom dataset
4. Replace `mockChatEngine.js` with actual API calls to the FastAPI backend
5. Add JWT authentication and a MongoDB user profile store
6. Deploy backend on a cloud platform (AWS / GCP / Railway)

---

*Built with ❤️ for academic demonstration purposes.*
