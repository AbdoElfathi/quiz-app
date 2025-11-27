import React, { useState } from "react";

const Home = ({
  onStartQuiz,
  onViewHistory,
  onOpenSettings,
  stats,
  theme,
  onToggleTheme,
  settings,
  onUpdateSettings,
}) => {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customCount, setCustomCount] = useState("");

  const quickOptions = [20, 50, 100, 200];

  const handleQuickSelect = (count) => {
    onUpdateSettings({ ...settings, questionCount: count });
    setShowCustomInput(false);
  };

  const handleCustomSubmit = () => {
    const count = parseInt(customCount);
    if (count > 0 && count <= 600) {
      onUpdateSettings({ ...settings, questionCount: count });
      setShowCustomInput(false);
      setCustomCount("");
    }
  };

  return (
    <div className="home">
      <button
        className="theme-toggle"
        onClick={onToggleTheme}
        title={theme === "dark" ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
      >
        {theme === "dark" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </button>
      <div className="home-content">
        <div className="home-logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </div>

        <h1 className="home-title">كفاءة Quiz</h1>
        <p className="home-subtitle">
          اختبر معرفتك في مجال علوم التربية من خلال أسئلة متنوعة ومتجددة
        </p>

        {/* Quick Question Count Selection */}
        <div className="quick-settings">
          <p className="quick-settings-label">عدد الأسئلة:</p>
          <div className="quick-options">
            {quickOptions.map((count) => (
              <button
                key={count}
                className={`quick-option ${
                  settings.questionCount === count ? "active" : ""
                }`}
                onClick={() => handleQuickSelect(count)}
              >
                {count}
              </button>
            ))}
            <button
              className={`quick-option custom ${
                showCustomInput ? "active" : ""
              }`}
              onClick={() => setShowCustomInput(!showCustomInput)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              مخصص
            </button>
          </div>

          {showCustomInput && (
            <div className="custom-input-wrapper">
              <input
                type="number"
                className="custom-input"
                placeholder="أدخل عدد الأسئلة (1-600)"
                min="1"
                max="600"
                value={customCount}
                onChange={(e) => setCustomCount(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleCustomSubmit()}
              />
              <button className="custom-input-btn" onClick={handleCustomSubmit}>
                تأكيد
              </button>
            </div>
          )}

          <p className="current-selection">
            الاختيار الحالي: <span>{settings.questionCount}</span> سؤال
          </p>
        </div>

        <div className="home-buttons">
          <button
            className="btn btn-primary btn-lg btn-block"
            onClick={onStartQuiz}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            ابدأ الاختبار
          </button>

          <button
            className="btn btn-secondary btn-block"
            onClick={onViewHistory}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            سجل المحاولات
          </button>

          <button
            className="btn btn-secondary btn-block"
            onClick={onOpenSettings}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            الإعدادات
          </button>
        </div>

        {stats && (
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{stats.totalAttempts}</div>
              <div className="stat-label">المحاولات</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.averageScore}%</div>
              <div className="stat-label">المعدل</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.bestScore}%</div>
              <div className="stat-label">أفضل نتيجة</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
