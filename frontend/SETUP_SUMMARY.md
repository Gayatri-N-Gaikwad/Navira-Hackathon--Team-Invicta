# 🚀 Google Cloud TTS Quick Setup

## What We Just Created:

### Backend Files:
- ✅ `server.js` - Express server with Google Cloud TTS API endpoints
- ✅ `.env.example` - Environment variable template
- ✅ `.gitignore` - Excludes API keys from Git

### Frontend Updates:
- ✅ `VoiceContext.js` - Now uses Google Cloud API first, falls back to browser TTS

### Documentation:
- ✅ `GOOGLE_CLOUD_TTS_SETUP.md` - Detailed setup guide
- ✅ `VOICE_TEST.html` - Test page for voices

---

## 🎯 Next Steps (Do These Now):

### Step 1: Install Backend Dependencies
```bash
npm install express cors @google-cloud/text-to-speech
```

### Step 2: Create Google Cloud Project
1. Go to https://console.cloud.google.com/
2. Create new project named "GuardianSathi-TTS"
3. Enable "Cloud Text-to-Speech API"
4. Create service account and download JSON key
5. Rename key file to `guardiansathi-tts-key.json`

### Step 3: Configure Environment
```bash
# Create .env file
copy .env.example .env

# Edit .env with your key path:
GOOGLE_APPLICATION_CREDENTIALS=./guardiansathi-tts-key.json
PORT=5000
```

### Step 4: Run Both Servers

**Terminal 1 (Backend):**
```bash
node server.js
```
You should see: "🚀 Server running on port 5000"

**Terminal 2 (Frontend):**
```bash
npm start
```

### Step 5: Test
1. Open http://localhost:3000
2. Switch language to Marathi (मराठी)
3. Click 🔊 speaker icon
4. You should hear high-quality Marathi audio!

---

## 🔊 Voice Quality Comparison:

| Method | Marathi Support | Quality | Setup |
|--------|----------------|---------|-------|
| **Browser TTS** | ❌ Not available | Poor | None |
| **Browser + Hindi Fallback** | ⚠️ Uses Hindi voice | Fair | None |
| **Google Cloud TTS** | ✅ Native voice | Excellent | API Setup |

---

## 💰 Cost:

**FREE!** 
- Google Cloud TTS: 4 million characters/month free
- GuardianSathi uses ~500 characters per session
- You get ~8,000 sessions/month for FREE

---

## 🛠️ Troubleshooting:

### Backend won't start?
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Kill process using port 5000
taskkill /PID <PID> /F
```

### "API not enabled" error?
- Go to Google Cloud Console
- APIs & Services → Enable APIs
- Search "Cloud Text-to-Speech API"
- Click Enable

### No audio in Marathi?
- Check console for "Google Cloud TTS available: true"
- If false, backend isn't connected
- Check both servers are running

---

## 📁 Project Structure:

```
frontend/
├── src/
│   └── context/
│       └── VoiceContext.js    ← Updated with API support
├── server.js                   ← NEW: Backend server
├── .env                        ← NEW: Your API config
├── .env.example                ← NEW: Template
├── .gitignore                  ← NEW: Security
├── GOOGLE_CLOUD_TTS_SETUP.md   ← NEW: Full guide
├── SETUP_SUMMARY.md            ← NEW: This file
└── VOICE_TEST.html             ← NEW: Voice tester
```

---

## ✅ Success Checklist:

- [ ] `npm install express cors @google-cloud/text-to-speech`
- [ ] Google Cloud project created
- [ ] JSON key downloaded and renamed
- [ ] `.env` file created with key path
- [ ] `node server.js` running (Terminal 1)
- [ ] `npm start` running (Terminal 2)
- [ ] Marathi audio playing correctly

---

**You're all set! Follow the steps above to get native-quality Marathi voice! 🎉**
