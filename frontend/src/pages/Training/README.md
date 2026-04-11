# Scam Detection Training Module

A mobile-first React frontend for AI-powered scam awareness training that teaches users to detect scams through realistic simulations.

## Features

### 🎯 Core Training Flow
1. **Training Landing Page** - Entry point with "Start Training" button
2. **Message Classification Trainer** - SMS-style interface for identifying scams vs legitimate messages
3. **Scam Chat Simulator** - WhatsApp-style chat interface for practicing scam conversations
4. **Training Completion Screen** - Score display and personalized feedback
5. **Analyze My Message Tool** - AI-powered message analysis for suspicious content

### 📱 Mobile-First Design
- Large, accessible buttons (minimum 60px height)
- High contrast colors for better visibility
- Responsive layouts optimized for mobile devices
- Touch-friendly interfaces
- Simple navigation patterns

### 🛡️ Training Features
- **Interactive Learning**: Users learn through simulations, not lectures
- **Real-time Feedback**: AI explanations for scam indicators
- **Progress Tracking**: Score and completion metrics
- **Risk Assessment**: Personalized risk level evaluation
- **Safety Tips**: Educational content and best practices

## File Structure

```
src/pages/Training/
├── README.md
├── TrainingLanding/
│   ├── TrainingLanding.js
│   └── TrainingLanding.css
├── MessageClassification/
│   ├── MessageClassification.js
│   └── MessageClassification.css
├── ScamChatSimulator/
│   ├── ScamChatSimulator.js
│   └── ScamChatSimulator.css
├── TrainingComplete/
│   ├── TrainingComplete.js
│   └── TrainingComplete.css
└── AnalyzeMessage/
    ├── AnalyzeMessage.js
    └── AnalyzeMessage.css
```

## API Integration

The training module integrates with the backend API endpoints:

- `GET /api/train/message` - Get random message for classification
- `POST /api/train/answer` - Check user's answer
- `POST /api/train/start-chat` - Start scam chat simulation
- `POST /api/train/chat` - Continue chat with scammer AI
- `POST /api/train/analyze` - Analyze user's message

## Routes

- `/training` - Landing page
- `/training/classification` - Message classification trainer
- `/training/chat` - Scam chat simulator
- `/training/complete` - Training completion screen
- `/training/analyze` - Message analysis tool

## Key Components

### TrainingLanding
- Hero section with training overview
- Feature cards highlighting training modules
- Call-to-action button to start training
- Training duration and accessibility information

### MessageClassification
- Phone container simulating SMS interface
- Random message display from backend API
- Three answer options: Scam/Legitimate/Not Sure
- Detailed feedback with explanations and red flags
- Progress tracking across multiple rounds

### ScamChatSimulator
- WhatsApp-style chat interface
- AI-powered scammer responses
- Response options with safety indicators
- Chat ending conditions (safe response or message limit)
- Real-time typing indicators

### TrainingComplete
- Score display with accuracy percentage
- Risk level assessment (Low/Medium/High)
- Personalized recommendations
- Safety reminders and tips
- Navigation to next training modules

### AnalyzeMessage
- Text area for message input
- AI-powered risk analysis
- Detailed indicators and recommendations
- Educational tips for message analysis
- Clear navigation options

## Design Principles

### Accessibility
- Large touch targets (minimum 44px)
- High contrast ratios (4.5:1 minimum)
- Clear visual hierarchy
- Semantic HTML structure
- Screen reader friendly

### Mobile Optimization
- Responsive breakpoints at 768px and 480px
- Touch-optimized interactions
- Efficient loading patterns
- Minimal cognitive load
- Clear feedback mechanisms

### User Experience
- Progressive disclosure of information
- Clear error handling
- Loading states for async operations
- Intuitive navigation patterns
- Consistent visual language

## Usage

1. Navigate to `/training` to start
2. Complete message classification rounds
3. Practice with chat simulator
4. Review completion feedback
5. Use analysis tool for real messages

## Dependencies

- React 18+
- React Router DOM
- Axios for API calls
- Lucide React for icons

## Styling

- CSS custom properties for theming
- Mobile-first responsive design
- CSS Grid and Flexbox layouts
- Smooth transitions and micro-interactions
- High contrast color schemes
