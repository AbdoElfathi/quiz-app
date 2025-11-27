import React from "react";

const History = ({ history, onBack, onClear }) => {
  const getScoreGrade = (percentage) => {
    if (percentage >= 80) return "excellent";
    if (percentage >= 60) return "good";
    if (percentage >= 40) return "average";
    return "poor";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-MA", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="history-container">
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          سجل المحاولات
        </h1>
        {history.length > 0 && (
          <button
            className="btn btn-danger"
            onClick={onClear}
            style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }}
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            مسح الكل
          </button>
        )}
      </div>

      <div className="history-content">
        {history.length === 0 ? (
          <div className="empty-state">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3>لا توجد محاولات سابقة</h3>
            <p>ابدأ اختبارًا جديدًا لتسجيل نتائجك هنا</p>
          </div>
        ) : (
          <div className="history-list">
            {history.map((item, index) => {
              const percentage = Math.round(
                (item.correctAnswers / item.totalQuestions) * 100
              );
              const grade = getScoreGrade(percentage);

              return (
                <div key={index} className="history-item">
                  <div className="history-item-right">
                    <div className={`history-score ${grade}`}>
                      <span className="history-score-num">
                        {item.correctAnswers}
                      </span>
                      <span className="history-score-sep">/</span>
                      <span className="history-score-total">
                        {item.totalQuestions}
                      </span>
                    </div>
                    <div className="history-info">
                      <h3>محاولة #{history.length - index}</h3>
                      <p>{formatDate(item.date)}</p>
                    </div>
                  </div>
                  <div className="history-details">
                    <span className="history-correct">
                      ✓ {item.correctAnswers}
                    </span>
                    <span className="history-divider">|</span>
                    <span className="history-incorrect">
                      ✗ {item.totalQuestions - item.correctAnswers}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
