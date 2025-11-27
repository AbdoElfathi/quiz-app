import React, { useState, useEffect, useCallback } from "react";
import questionsData from "../data/questions.json";

const Quiz = ({ settings, onComplete, onBack }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(settings.timePerQuestion);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState([]);

  // Initialize questions
  useEffect(() => {
    let selectedQuestions = [...questionsData];

    if (settings.shuffleQuestions) {
      selectedQuestions = selectedQuestions.sort(() => Math.random() - 0.5);
    }

    selectedQuestions = selectedQuestions.slice(0, settings.questionCount);
    setQuestions(selectedQuestions);
  }, [settings]);

  // Timer
  useEffect(() => {
    if (
      !settings.showTimer ||
      isAnswered ||
      showResults ||
      questions.length === 0
    )
      return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeUp();
          return settings.timePerQuestion;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [
    currentIndex,
    isAnswered,
    showResults,
    questions.length,
    settings.showTimer,
    settings.timePerQuestion,
  ]);

  const handleTimeUp = useCallback(() => {
    if (!isAnswered) {
      setIsAnswered(true);
      setAnswers((prev) => [
        ...prev,
        {
          questionId: questions[currentIndex]?.id,
          selected: null,
          correct: questions[currentIndex]?.correctAnswer,
          isCorrect: false,
        },
      ]);
    }
  }, [currentIndex, isAnswered, questions]);

  const handleAnswer = (key) => {
    if (isAnswered) return;

    setSelectedAnswer(key);
    setIsAnswered(true);

    const isCorrect = key === questions[currentIndex].correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setAnswers((prev) => [
      ...prev,
      {
        questionId: questions[currentIndex].id,
        selected: key,
        correct: questions[currentIndex].correctAnswer,
        isCorrect,
      },
    ]);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeLeft(settings.timePerQuestion);
    } else {
      setShowResults(true);
    }
  };

  const handleFinish = () => {
    const result = {
      date: new Date().toISOString(),
      totalQuestions: questions.length,
      correctAnswers: score,
      percentage: Math.round((score / questions.length) * 100),
      timePerQuestion: settings.timePerQuestion,
      answers,
    };
    onComplete(result);
  };

  const getTimerClass = () => {
    if (timeLeft <= 5) return "quiz-timer danger";
    if (timeLeft <= 10) return "quiz-timer warning";
    return "quiz-timer";
  };

  const getOptionClass = (key) => {
    if (!isAnswered) {
      return selectedAnswer === key
        ? "option-button selected"
        : "option-button";
    }

    let classes = "option-button answered";

    if (key === questions[currentIndex].correctAnswer) {
      classes += " correct";
    } else if (key === selectedAnswer) {
      classes += " incorrect";
    }

    return classes;
  };

  const getScoreGrade = () => {
    const percentage = Math.round((score / questions.length) * 100);
    if (percentage >= 80)
      return {
        grade: "excellent",
        title: "ممتاز!",
        message: "أداء رائع، استمر في التفوق!",
      };
    if (percentage >= 60)
      return {
        grade: "good",
        title: "جيد!",
        message: "نتيجة جيدة، يمكنك تحسينها!",
      };
    if (percentage >= 40)
      return {
        grade: "average",
        title: "متوسط",
        message: "حاول مرة أخرى للتحسين.",
      };
    return {
      grade: "poor",
      title: "يحتاج تحسين",
      message: "لا تستسلم، حاول مرة أخرى!",
    };
  };

  if (questions.length === 0) {
    return (
      <div className="quiz-container">
        <div
          className="quiz-content"
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <p>جاري تحميل الأسئلة...</p>
        </div>
      </div>
    );
  }

  if (showResults) {
    const { grade, title, message } = getScoreGrade();

    return (
      <div className="results-container">
        <div className="results-content">
          <div className={`results-icon ${grade}`}>
            {grade === "excellent" && (
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
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            )}
            {grade === "good" && (
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
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
            {grade === "average" && (
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
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
            {grade === "poor" && (
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
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </div>

          <h1 className="results-title">{title}</h1>
          <p className="results-subtitle">{message}</p>

          <div className="score-display">
            <div className="score-fraction">
              <span className="score-correct">{score}</span>
              <span className="score-separator">/</span>
              <span className="score-total">{questions.length}</span>
            </div>
            <div className="score-details">إجابة صحيحة</div>
          </div>

          <div className="results-stats">
            <div className="result-stat">
              <div className="result-stat-value correct">{score}</div>
              <div className="result-stat-label">صحيحة</div>
            </div>
            <div className="result-stat">
              <div className="result-stat-value incorrect">
                {questions.length - score}
              </div>
              <div className="result-stat-label">خاطئة</div>
            </div>
          </div>

          <div className="results-actions">
            <button
              className="btn btn-primary btn-block"
              onClick={handleFinish}
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              العودة للرئيسية
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
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
          خروج
        </button>

        <div className="quiz-progress">
          <span className="progress-text">
            {currentIndex + 1} / {questions.length}
          </span>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {settings.showTimer && (
          <div className={getTimerClass()}>
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {timeLeft}s
          </div>
        )}

        <div className="quiz-score">
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {score}
        </div>
      </div>

      <div className="quiz-content">
        <div className="question-card">
          <div className="question-number">
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
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            السؤال {currentIndex + 1}
          </div>
          <p className="question-text">{currentQuestion.question}</p>
        </div>

        <div className="options-list">
          {Object.entries(currentQuestion.options).map(([key, value]) => (
            <button
              key={key}
              className={getOptionClass(key)}
              onClick={() => handleAnswer(key)}
              disabled={isAnswered}
            >
              <span className="option-text">{value}</span>
              <span className="option-key">{key}</span>
            </button>
          ))}
        </div>

        <div className="quiz-actions">
          {isAnswered && (
            <button className="btn btn-primary btn-block" onClick={handleNext}>
              {currentIndex < questions.length - 1 ? (
                <>
                  السؤال التالي
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
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </>
              ) : (
                <>
                  عرض النتائج
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
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
