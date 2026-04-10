import React, { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext();

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState({
    modules: {
      aadhaar: { completed: true, percentage: 100, score: 85 },
      upi: { completed: false, percentage: 60, score: 70 },
      jobScam: { completed: false, percentage: 0, score: 0, locked: true },
      banking: { completed: false, percentage: 0, score: 0 },
      government: { completed: false, percentage: 0, score: 0 },
      deepfake: { completed: false, percentage: 0, score: 0 },
      governmentScheme: { completed: false, percentage: 0, score: 0 },
      digilocker: { completed: false, percentage: 0, score: 0 }
    },
    badges: {
      scamDetector: { unlocked: false, progress: 1, required: 3 },
      sharpObserver: { unlocked: false, progress: 5, required: 10 },
      safeUser: { unlocked: false, progress: 0, required: 1 }
    },
    overallScore: 70,
    totalModulesCompleted: 1,
    redFlagsIdentified: 5
  });

  useEffect(() => {
    const saved = localStorage.getItem('guardiansathi_progress');
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading progress:', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('guardiansathi_progress', JSON.stringify(progress));
  }, [progress]);

  const updateModuleProgress = (moduleId, updates) => {
    setProgress(prev => ({
      ...prev,
      modules: {
        ...prev.modules,
        [moduleId]: { ...prev.modules[moduleId], ...updates }
      }
    }));
    calculateOverallScore();
  };

  const completeModule = (moduleId, score) => {
    setProgress(prev => {
      const newModules = {
        ...prev.modules,
        [moduleId]: { completed: true, percentage: 100, score }
      };
      
      // Unlock next module if applicable
      const moduleOrder = ['aadhaar', 'upi', 'banking', 'government', 'deepfake', 'governmentScheme', 'digilocker', 'jobScam'];
      const currentIndex = moduleOrder.indexOf(moduleId);
      if (currentIndex >= 0 && currentIndex < moduleOrder.length - 1) {
        const nextModule = moduleOrder[currentIndex + 1];
        newModules[nextModule] = { ...prev.modules[nextModule], locked: false };
      }

      const completedCount = Object.values(newModules).filter(m => m.completed).length;
      
      // Check badge unlocks
      const newBadges = { ...prev.badges };
      if (completedCount >= 3) newBadges.scamDetector = { ...newBadges.scamDetector, unlocked: true };
      
      return {
        ...prev,
        modules: newModules,
        badges: newBadges,
        totalModulesCompleted: completedCount
      };
    });
    
    calculateOverallScore();
  };

  const identifyRedFlag = () => {
    setProgress(prev => {
      const newRedFlags = prev.redFlagsIdentified + 1;
      const newBadges = { ...prev.badges };
      
      if (newRedFlags >= 10) {
        newBadges.sharpObserver = { ...newBadges.sharpObserver, unlocked: true };
      }
      
      return {
        ...prev,
        redFlagsIdentified: newRedFlags,
        badges: newBadges
      };
    });
  };

  const achievePerfectScore = () => {
    setProgress(prev => ({
      ...prev,
      badges: {
        ...prev.badges,
        safeUser: { ...prev.badges.safeUser, unlocked: true }
      }
    }));
  };

  const calculateOverallScore = () => {
    setProgress(prev => {
      const moduleScores = Object.values(prev.modules)
        .filter(m => m.score > 0)
        .map(m => m.score);
      
      const average = moduleScores.length > 0 
        ? Math.round(moduleScores.reduce((a, b) => a + b, 0) / moduleScores.length)
        : 0;
      
      return { ...prev, overallScore: average };
    });
  };

  const value = {
    progress,
    updateModuleProgress,
    completeModule,
    identifyRedFlag,
    achievePerfectScore
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
};
