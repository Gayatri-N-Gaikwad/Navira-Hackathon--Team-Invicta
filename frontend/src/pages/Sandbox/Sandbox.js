import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Contact,
  Play,
  Shield,
  AlertCircle,
  CheckCircle,
  Video,
  Brain,
  FileText,
  Award,
  Lock,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import Tooltip from "../../components/Tooltip";
import PageNotification from "../../components/PageNotification/PageNotification";
import "./Sandbox.css";

const Sandbox = () => {
  const { isElderly } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleStartTraining = (moduleId) => {
    if (moduleId === "banking") {
      navigate("/sandbox/banking");
    } else if (moduleId === "government") {
      navigate("/sandbox/government");
    } else if (moduleId === "deepfake") {
      navigate("/sandbox/deepfake");
    } else if (moduleId === "governmentScheme") {
      navigate("/sandbox/government-scheme");
    } else if (moduleId === "digilocker") {
      navigate("/sandbox/digilocker");
    } else if (moduleId === "mobileRecharge") {
      navigate("/sandbox/mobile-recharge");
    }
  };

  const handleAITraining = () => {
    navigate("/scam-ai");
  };

  const trainingModules = [
    {
      id: "banking",
      icon: Building2,
      title: t("bankingTraining"),
      description:
        "Learn about OTP fraud, phishing attempts, UPI scams, fake banking calls, and how to protect your financial information.",
      scenarios: [
        "Fake bank calls asking for OTP",
        "Phishing emails requesting login details",
        "UPI payment frauds",
        "Fake banking websites",
      ],
      color: "banking",
      buttonText: t("startTraining"),
    },
    {
      id: "government",
      icon: Contact,
      title: t("governmentTraining"),
      description:
        "Learn about Aadhaar scams, ABHA frauds, fake government websites, KYC scams, and how to verify official communications.",
      scenarios: [
        "Fake Aadhaar update messages",
        "ABHA health ID scams",
        "Fake government websites",
        "KYC update frauds",
      ],
      color: "government",
      buttonText: t("startTraining"),
    },
    {
      id: "deepfake",
      icon: Brain,
      title: t("deepfakeTraining") || "Deepfake Scam Simulator",
      description:
        "Learn to identify AI-generated video scams including fake relative calls, deepfake impersonation, and urgency-based frauds targeting elderly victims.",
      scenarios: [
        "Fake video calls from relatives",
        "AI-generated voice scams",
        "Deepfake impersonation attacks",
        "Urgency-based fraud tactics",
      ],
      color: "deepfake",
      buttonText: t("startTraining"),
    },
    {
      id: "governmentScheme",
      icon: FileText,
      title: t("governmentSchemeTraining") || "Government Scheme Application",
      description:
        "Learn to safely apply for government assistance schemes. Practice identifying official websites, filling forms securely, uploading masked documents, and avoiding fake payment scams.",
      scenarios: [
        "Identify official .gov.in websites",
        "Fill forms without sharing sensitive data",
        "Upload masked Aadhaar documents",
        "Avoid fake processing fee scams",
      ],
      color: "governmentScheme",
      buttonText: t("startTraining"),
    },
    {
      id: "digilocker",
      icon: Lock,
      title: t("digilockerTraining") || "DigiLocker Security Training",
      description:
        "Learn to safely use DigiLocker for storing and sharing documents. Practice identifying official portals, handling OTPs securely, detecting WhatsApp OTP scams, and avoiding phishing emails.",
      scenarios: [
        "Identify official DigiLocker.gov.in website",
        "Enter mobile and handle OTP securely",
        "Detect WhatsApp OTP scam attempts",
        "Download and share documents safely",
        "Recognize and report phishing emails",
      ],
      color: "digilocker",
      buttonText: t("startTraining"),
    },
    {
      id: "mobileRecharge",
      icon: Smartphone,
      title: t("mobileRechargeTraining") || "Mobile Recharge Safety",
      description:
        "Learn safe mobile recharge practices, detect fake payment apps, identify scam recharge plans, and avoid OTP sharing fraud. Practice realistic scenarios in a safe environment.",
      scenarios: [
        "Identify fake recharge apps",
        "Enter mobile numbers correctly",
        "Choose legitimate recharge plans",
        "Handle OTP verification safely",
        "Detect recharge payment scams",
      ],
      color: "mobileRecharge",
      buttonText: t("startTraining"),
    },
  ];

  return (
    <div className={`sandbox-page ${isElderly ? "elderly-mode" : ""}`}>
      {/* Page Notification */}
      <PageNotification pageKey="pageSandbox" />

      {/* Page Header */}
      <div className="page-header">
        <div className="header-icon">
          <Shield size={40} />
        </div>
        <div className="header-content">
          <h1>Interactive Sandbox Training</h1>
          <p>
            Practice real-world scenarios in a safe environment. Learn to
            identify scams without any risk.
          </p>
        </div>
      </div>

      {/* AI Training Section */}
      <div className="ai-training-section">
        <div className="ai-training-wrapper">
          <button className="ai-training-btn" onClick={handleAITraining}>
            <Sparkles size={20} />
            Learn with AI
          </button>
        </div>
      </div>

      {/* Safety Tips - Moved to TOP for visibility */}
      <div className="safety-tips">
        <h3>⚠️ {t('safetyTipsReadBefore')}</h3>
        <div className="tips-grid">
          <div className="tip-card important">
            <span className="tip-icon">🔒</span>
            <p>
              <strong>Never share</strong> OTPs, PINs, or passwords with anyone
            </p>
          </div>
          <div className="tip-card important">
            <span className="tip-icon">🔗</span>
            <p>
              <strong>Always check</strong> website URLs before entering
              information
            </p>
          </div>
          <div className="tip-card important">
            <span className="tip-icon">⏸️</span>
            <p>
              <strong>Take time</strong> to verify unexpected requests - don't
              rush
            </p>
          </div>
          <div className="tip-card important">
            <span className="tip-icon">📞</span>
            <p>
              <strong>Contact official numbers</strong> directly, don't use
              provided numbers
            </p>
          </div>
        </div>
      </div>

      {/* Training Cards */}
      <div className="training-grid">
        {trainingModules.map((module) => {
          const Icon = module.icon;
          return (
            <div key={module.id} className={`training-card ${module.color}`}>
              <div className="card-header">
                <div className={`card-icon ${module.color}`}>
                  <Icon size={40} />
                </div>
                <h2>{module.title}</h2>
              </div>

              <p className="card-description">{module.description}</p>

              <div className="scenarios-section">
                <h3>
                  <AlertCircle size={18} />
                  {t('whatYoullLearn')}
                </h3>
                <ul className="scenarios-list">
                  {module.scenarios.map((scenario, index) => (
                    <li key={index}>
                      <CheckCircle size={16} className="check-icon" />
                      {scenario}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card-actions">
                <Tooltip content="tooltipStartTraining" position="top">
                  <button
                    className={`training-btn ${module.color}`}
                    onClick={() => handleStartTraining(module.id)}
                  >
                    <Play size={20} />
                    {module.buttonText}
                  </button>
                </Tooltip>
              </div>

              <div className="card-badge">
                <Shield size={14} />
                <span>{t("safeEnvironment")}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Section */}
      <div className="sandbox-info">
        <div className="info-card">
          <h3>{t('howSandboxWorks')}</h3>
          <div className="info-steps">
            <div className="info-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Select a Module</h4>
                <p>
                  Choose between Banking or Government ID training based on your
                  needs.
                </p>
              </div>
            </div>
            <div className="info-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Practice Scenarios</h4>
                <p>
                  Interact with realistic scam scenarios in a completely safe
                  environment.
                </p>
              </div>
            </div>
            <div className="info-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Learn from Feedback</h4>
                <p>
                  Get immediate feedback on your choices and learn the correct
                  actions.
                </p>
              </div>
            </div>
            <div className="info-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Build Confidence</h4>
                <p>
                  Apply your knowledge to stay safe in real-world situations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sandbox;
