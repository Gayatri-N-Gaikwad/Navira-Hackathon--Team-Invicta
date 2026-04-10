# 🔊 Google Cloud Text-to-Speech API Setup Guide

## Overview
This guide helps you set up Google Cloud TTS for high-quality Marathi, Hindi, and English voices.

---

## Step 1: Create Google Cloud Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Click "Select a project" → "New Project"
4. Name it "GuardianSathi-TTS"
5. Click "Create"

---

## Step 2: Enable Text-to-Speech API

1. In the Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Cloud Text-to-Speech API"
3. Click on it and press "Enable"
4. Wait for the API to be enabled

---

## Step 3: Create Service Account & Download Key

1. Go to "IAM & Admin" → "Service Accounts"
2. Click "Create Service Account"
3. Name: `guardiansathi-tts`
4. Click "Create and Continue"
5. Role: Select "Cloud Text-to-Speech User"
6. Click "Continue" → "Done"
7. Click on the service account you just created
8. Go to "Keys" tab
9. Click "Add Key" → "Create new key"
10. Select "JSON" format
11. Click "Create" - This downloads a JSON file

**⚠️ Keep this JSON file secure! Never commit it to GitHub.**

---

## Step 4: Install Dependencies

Open terminal in your project folder and run:

```bash
npm install express cors @google-cloud/text-to-speech
```

---

## Step 5: Configure Environment Variables

Create a file named `.env` in your project root:

```env
# Google Cloud TTS Configuration
GOOGLE_APPLICATION_CREDENTIALS=./guardiansathi-tts-key.json
PORT=5000
```

Place your downloaded JSON key file in the project root and rename it to match.

---

## Step 6: Update VoiceContext to Use API

The VoiceContext has been updated to:
1. First try Google Cloud TTS API
2. Fall back to browser TTS if API fails
3. Cache audio to avoid repeated API calls

---

## Step 7: Run the Application

### Development Mode (Both frontend and backend):

**Terminal 1 - Start Backend:**
```bash
node server.js
```

**Terminal 2 - Start Frontend:**
```bash
npm start
```

### Production Mode:

```bash
# Build React app
npm run build

# Start server (serves both API and static files)
node server.js
```

Then open http://localhost:5000

---

## Available Voices

| Language | Voice Name | Quality | Gender |
|----------|-----------|---------|--------|
| **English (India)** | en-IN-Neural2-B | Neural (Premium) | Female |
| **Hindi** | hi-IN-Neural2-B | Neural (Premium) | Female |
| **Marathi** | mr-IN-Standard-A | Standard | Female |

---

## API Endpoints

### 1. Text-to-Speech
```http
POST /api/tts
Content-Type: application/json

{
  "text": "नमस्कार, हे मराठी आवाज आहे",
  "language": "marathi"
}
```

**Response:**
```json
{
  "success": true,
  "audioContent": "base64-encoded-mp3-audio...",
  "language": "marathi",
  "voice": "mr-IN-Standard-A"
}
```

### 2. Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "status": "ok",
  "ttsConfigured": true,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 3. List Available Voices
```http
GET /api/voices
```

---

## Pricing (As of 2024)

Google Cloud TTS has a **free tier**:
- **4 million characters per month** FREE for Neural voices
- **1 million characters per month** FREE for Standard voices

For GuardianSathi, the free tier is more than enough!

---

## Troubleshooting

### Error: "Could not load the default credentials"
**Solution:** Make sure `GOOGLE_APPLICATION_CREDENTIALS` points to the correct JSON file path.

### Error: "API not enabled"
**Solution:** Go to Google Cloud Console and enable "Cloud Text-to-Speech API".

### Audio not playing
**Solution:** Check browser console for errors. Ensure backend is running on port 5000.

---

## Security Notes

1. ✅ **Never commit the JSON key file to Git**
2. ✅ **Add the JSON key to `.gitignore`**
3. ✅ **Use environment variables for configuration**
4. ✅ **Restrict the service account to only Text-to-Speech API**

---

## Alternative: Free Browser TTS (No API needed)

If you prefer not to use Google Cloud, the app will automatically fall back to browser's built-in Text-to-Speech which is free but lower quality.

---

## 🎉 Success!

Once configured, your app will have:
- ✅ High-quality Neural voices for English and Hindi
- ✅ Native Marathi voice support
- ✅ Fast audio generation
- ✅ Professional sound quality
