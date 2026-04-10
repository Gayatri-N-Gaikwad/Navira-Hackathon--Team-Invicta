const express = require('express');
const cors = require('cors');
const textToSpeech = require('@google-cloud/text-to-speech');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'build')));

// Initialize Google Cloud TTS client
// Make sure to set GOOGLE_APPLICATION_CREDENTIALS environment variable
// or place your service account JSON in the project root
let ttsClient = null;
try {
  ttsClient = new textToSpeech.TextToSpeechClient();
  console.log('✅ Google Cloud TTS client initialized');
} catch (error) {
  console.warn('⚠️ Google Cloud TTS not configured:', error.message);
  console.log('Set GOOGLE_APPLICATION_CREDENTIALS to your service account JSON file');
}

// Language to voice mapping
const voiceMap = {
  english: {
    languageCode: 'en-IN',
    name: 'en-IN-Neural2-B',  // Indian English neural voice
    ssmlGender: 'FEMALE'
  },
  hindi: {
    languageCode: 'hi-IN',
    name: 'hi-IN-Neural2-B',  // Hindi neural voice
    ssmlGender: 'FEMALE'
  },
  marathi: {
    languageCode: 'mr-IN',
    name: 'mr-IN-Standard-A',  // Marathi standard voice
    ssmlGender: 'FEMALE'
  }
};

// Text-to-Speech endpoint
app.post('/api/tts', async (req, res) => {
  const { text, language = 'english' } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  // If Google Cloud TTS is not configured, return error
  if (!ttsClient) {
    return res.status(503).json({ 
      error: 'Google Cloud TTS not configured',
      message: 'Please configure GOOGLE_APPLICATION_CREDENTIALS'
    });
  }

  try {
    const voiceConfig = voiceMap[language] || voiceMap.english;

    const request = {
      input: { text },
      voice: {
        languageCode: voiceConfig.languageCode,
        name: voiceConfig.name,
        ssmlGender: voiceConfig.ssmlGender
      },
      audioConfig: {
        audioEncoding: 'MP3',
        speakingRate: 0.9,  // Slower for elderly users
        pitch: 0,
        volumeGainDb: 0
      }
    };

    console.log(`🎤 Generating TTS for ${language}:`, text.substring(0, 50) + '...');

    const [response] = await ttsClient.synthesizeSpeech(request);
    
    // Send audio content as base64
    const audioBase64 = response.audioContent.toString('base64');
    
    res.json({
      success: true,
      audioContent: audioBase64,
      language: language,
      voice: voiceConfig.name
    });

  } catch (error) {
    console.error('❌ TTS Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate speech',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    ttsConfigured: !!ttsClient,
    timestamp: new Date().toISOString()
  });
});

// Get available voices endpoint
app.get('/api/voices', async (req, res) => {
  if (!ttsClient) {
    return res.status(503).json({ error: 'Google Cloud TTS not configured' });
  }

  try {
    const [result] = await ttsClient.listVoices({});
    const voices = result.voices.filter(voice => 
      voice.languageCodes.some(code => 
        code.startsWith('en') || code.startsWith('hi') || code.startsWith('mr')
      )
    );
    
    res.json({
      voices: voices.map(v => ({
        name: v.name,
        languageCodes: v.languageCodes,
        gender: v.ssmlGender
      }))
    });
  } catch (error) {
    console.error('❌ List voices error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Serve React app for all other routes (catch-all)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API endpoints:`);
  console.log(`   - POST /api/tts`);
  console.log(`   - GET  /api/health`);
  console.log(`   - GET  /api/voices`);
});
