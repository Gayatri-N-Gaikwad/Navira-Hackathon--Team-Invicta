# GuardianSathi - Digital Safety Training Platform

A modern, accessible React.js web application designed to help users learn digital safety and protect themselves from online scams, particularly targeting beginners and elderly users.

![GuardianSathi Logo](https://img.shields.io/badge/GuardianSathi-Digital%20Safety-green?style=for-the-badge&color=2E7D32)

## 🎯 Features

### Authentication
- **Signup Page**: Complete registration with username, email, birth year, and password
- **Login Page**: Secure authentication using localStorage
- **Age-Based UI**: Automatic detection of users aged 55+ with enhanced accessibility features

### Pages
- **Home Page**: Hero section, problem/solution awareness, mission statement, target users
- **Sandbox Page**: Interactive training cards for Banking and Government ID scams
- **Quiz Page**: Test your knowledge with different difficulty levels
- **About Page**: Information about the platform, team, and contact details

### Accessibility (Age-Based UI)
When user age > 55:
- Larger font sizes (18px-22px)
- Bold headings
- Bigger buttons with more padding
- Increased spacing
- High contrast colors

### Responsive Design
- **Desktop**: Sidebar + main content layout
- **Tablet**: Medium spacing
- **Mobile**: Hamburger menu, full-width buttons, vertical stacking

## 🎨 Design System

| Element | Color |
|---------|-------|
| Primary | #2E7D32 (Green - trust & safety) |
| Secondary | #1565C0 (Blue - reliability) |
| Background | #F5F7FA (light grey) |
| Accent | #FFC107 (warning/highlight) |
| Danger | #D32F2F (scam alerts) |

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Install dependencies**
```bash
npm install
```

2. **Start the development server**
```bash
npm start
```

3. **Open your browser**
Navigate to `http://localhost:3000`

## 📁 Project Structure

```
hackathon/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── Layout/
│   │       ├── Layout.js
│   │       ├── Layout.css
│   │       ├── Navbar.js
│   │       ├── Navbar.css
│   │       ├── Sidebar.js
│   │       └── Sidebar.css
│   ├── context/
│   │   └── AuthContext.js
│   ├── pages/
│   │   ├── Auth/
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   └── Auth.css
│   │   ├── Home/
│   │   │   ├── Home.js
│   │   │   └── Home.css
│   │   ├── Sandbox/
│   │   │   ├── Sandbox.js
│   │   │   └── Sandbox.css
│   │   ├── Quiz/
│   │   │   ├── Quiz.js
│   │   │   └── Quiz.css
│   │   └── About/
│   │       ├── About.js
│   │       └── About.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🛠️ Technical Stack

- **React 18** - Modern React with hooks
- **React Router DOM 6** - Client-side routing
- **Lucide React** - Beautiful icons
- **CSS3** - Modern styling with CSS variables
- **LocalStorage** - Client-side data persistence

## 🔐 Data Storage

User data is stored in localStorage:
- `guardiansathi_users` - Array of registered users
- `guardiansathi_session` - Current user session

### User Object Structure
```javascript
{
  username: string,
  email: string,
  password: string,
  age: number,      // Calculated from birthYear
  birthYear: number
}
```

## 📝 Key Components

### AuthContext
Provides authentication state and methods:
- `user` - Current user data
- `isAuthenticated` - Login status
- `isElderly` - True if age > 55
- `login(email, password)` - User login
- `signup(userData)` - User registration
- `logout()` - User logout

### Layout
Main application layout with:
- Fixed top navbar with user dropdown
- Collapsible sidebar navigation
- Responsive design with mobile hamburger menu

### Home Page
Comprehensive landing page with:
- Dynamic welcome message (logged in/out states)
- Hero section with CTA buttons
- Problem awareness section
- Solution overview
- Safety tips
- Target users information
- Mission statement

### Sandbox Page
Interactive training center with:
- Banking Training card (OTP fraud, phishing, UPI scams)
- Government Training card (Aadhaar, ABHA, KYC scams)
- Step-by-step learning guide
- Safety reminders

## 🧪 Testing Elderly Mode

To test the elderly mode (age > 55 UI):
1. Sign up with a birth year that makes you older than 55
   - Example: If current year is 2024, use birth year 1960 or earlier
2. The UI will automatically adjust with:
   - Larger text
   - Bigger buttons
   - More spacing
   - Higher contrast

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px (full sidebar)
- **Tablet**: 768px - 1024px (collapsible sidebar)
- **Mobile**: < 768px (hamburger menu, stacked layout)
- **Small Mobile**: < 480px (compact layout)

## 🎓 Learning Modules

### Banking Training
- Fake bank calls asking for OTP
- Phishing emails requesting login details
- UPI payment frauds
- Fake banking websites

### Government Training
- Fake Aadhaar update messages
- ABHA health ID scams
- Fake government websites
- KYC update frauds

## 🤝 Contributing

This project was created for a hackathon. Feel free to:
- Add more training scenarios
- Implement actual quiz functionality
- Add backend API integration
- Enhance accessibility features

## 📄 License

This project is open source and available for educational purposes.

---

**GuardianSathi** - Making the digital world safer for everyone. 🛡️
