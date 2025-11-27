import React, { useState } from "react";

const Settings = ({ settings, onSave, onBack, theme, onToggleTheme }) => {
  const [localSettings, setLocalSettings] = useState({ ...settings });

  const handleToggle = (key) => {
    setLocalSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleNumberChange = (key, delta, min, max) => {
    setLocalSettings((prev) => ({
      ...prev,
      [key]: Math.min(max, Math.max(min, prev[key] + delta)),
    }));
  };

  return (
    <div className="settings-container">
      <div className="header">
        <button className="back-button" onClick={onBack}>
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          رجوع
        </button>
        <h1 className="header-title">
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
        </h1>
        <div style={{ width: "80px" }}></div>
      </div>

      <div className="settings-content">
        <div className="settings-group">
          <div className="settings-group-title">إعدادات الأسئلة</div>

          <div className="setting-item">
            <div>
              <div className="setting-label">عدد الأسئلة</div>
              <div className="setting-description">
                حدد عدد الأسئلة في كل اختبار
              </div>
            </div>
            <div className="number-input">
              <button
                onClick={() => handleNumberChange("questionCount", -5, 5, 100)}
              >
                -
              </button>
              <span>{localSettings.questionCount}</span>
              <button
                onClick={() => handleNumberChange("questionCount", 5, 5, 100)}
              >
                +
              </button>
            </div>
          </div>

          <div className="setting-item">
            <div>
              <div className="setting-label">ترتيب عشوائي</div>
              <div className="setting-description">
                خلط ترتيب الأسئلة في كل مرة
              </div>
            </div>
            <div
              className={`toggle ${
                localSettings.shuffleQuestions ? "active" : ""
              }`}
              onClick={() => handleToggle("shuffleQuestions")}
            >
              <div className="toggle-handle"></div>
            </div>
          </div>
        </div>

        <div className="settings-group">
          <div className="settings-group-title">إعدادات المؤقت</div>

          <div className="setting-item">
            <div>
              <div className="setting-label">إظهار المؤقت</div>
              <div className="setting-description">
                عرض العد التنازلي لكل سؤال
              </div>
            </div>
            <div
              className={`toggle ${localSettings.showTimer ? "active" : ""}`}
              onClick={() => handleToggle("showTimer")}
            >
              <div className="toggle-handle"></div>
            </div>
          </div>

          <div className="setting-item">
            <div>
              <div className="setting-label">الوقت لكل سؤال (ثانية)</div>
              <div className="setting-description">
                المدة الزمنية المتاحة لكل سؤال
              </div>
            </div>
            <div className="number-input">
              <button
                onClick={() =>
                  handleNumberChange("timePerQuestion", -5, 10, 120)
                }
              >
                -
              </button>
              <span>{localSettings.timePerQuestion}s</span>
              <button
                onClick={() =>
                  handleNumberChange("timePerQuestion", 5, 10, 120)
                }
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="settings-group">
          <div className="settings-group-title">المظهر</div>

          <div className="setting-item">
            <div>
              <div className="setting-label">الوضع الداكن</div>
              <div className="setting-description">
                تفعيل أو إلغاء الوضع الداكن
              </div>
            </div>
            <div
              className={`toggle ${theme === "dark" ? "active" : ""}`}
              onClick={onToggleTheme}
            >
              <div className="toggle-handle"></div>
            </div>
          </div>
        </div>

        <div className="settings-actions">
          <button className="btn btn-secondary btn-block" onClick={onBack}>
            إلغاء
          </button>
          <button
            className="btn btn-primary btn-block"
            onClick={() => onSave(localSettings)}
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
                d="M5 13l4 4L19 7"
              />
            </svg>
            حفظ الإعدادات
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
