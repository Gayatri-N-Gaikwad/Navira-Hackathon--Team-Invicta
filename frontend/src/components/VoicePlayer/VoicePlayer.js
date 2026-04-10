import React from 'react';
import { Volume2, Pause, Play, X } from 'lucide-react';
import { useVoice } from '../../context/VoiceContext';
import { useLanguage } from '../../context/LanguageContext';
import { useLocation } from 'react-router-dom';
import './VoicePlayer.css';

const VoicePlayer = () => {
  const { isPlaying, showWaveform, togglePlay, stopInstruction, hasSupport } = useVoice();
  const { t } = useLanguage();
  const location = useLocation();

  // Debug: Check TTS support
  const hasTTSSupport = 'speechSynthesis' in window;
  const voiceCount = hasTTSSupport ? window.speechSynthesis?.getVoices()?.length || 0 : 0;
  
  console.log('VoicePlayer - TTS Supported:', hasTTSSupport, 'Voices:', voiceCount);

  if (!hasSupport) {
    return (
      <div className="voice-player no-support" title="Voice not supported in this browser">
        <Volume2 size={20} style={{ opacity: 0.3 }} />
      </div>
    );
  }

  return (
    <div className="voice-player">
      {/* Main Voice Button */}
      <button
        className={`voice-toggle ${isPlaying ? 'playing' : ''}`}
        onClick={() => togglePlay(location.pathname)}
        aria-label={isPlaying ? t('pause') : t('play')}
      >
        <Volume2 size={20} />
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </button>

      {/* Active Player Bar */}
      {showWaveform && (
        <div className="voice-bar">
          <div className="voice-bar-content">
            <div className="voice-icon-pulse">
              <Volume2 size={24} />
            </div>
            
            {/* Waveform Animation */}
            <div className="waveform">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <span className="voice-status">
              {isPlaying ? t('audioGuidePlaying') || 'Audio Guide Playing' : t('audioGuidePaused') || 'Audio Guide Paused'}
            </span>

            <div className="voice-controls">
              <button 
                className="voice-control-btn"
                onClick={() => togglePlay(location.pathname)}
                aria-label={t(isPlaying ? 'pause' : 'play')}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              <button 
                className="voice-control-btn close"
                onClick={stopInstruction}
                aria-label={t('close')}
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoicePlayer;
