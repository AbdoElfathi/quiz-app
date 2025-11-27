import React, { useState, useEffect } from "react";
import "./App.css";
import Quiz from "./components/Quiz";
import Home from "./components/Home";
import History from "./components/History";
import Settings from "./components/Settings";

function App() {
  const [currentView, setCurrentView] = useState("home");
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("quizTheme");
    return saved || "dark";
  });
  const [quizSettings, setQuizSettings] = useState({
    questionCount: 20,
    shuffleQuestions: true,
    showTimer: true,
    timePerQuestion: 30,
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("quizTheme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("quizHistory");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("quizHistory", JSON.stringify(history));
  }, [history]);

  const addToHistory = (result) => {
    const newHistory = [result, ...history].slice(0, 50);
    setHistory(newHistory);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("quizHistory");
  };

  const renderView = () => {
    switch (currentView) {
      case "quiz":
        return (
          <Quiz
            settings={quizSettings}
            onComplete={(result) => {
              addToHistory(result);
              setCurrentView("home");
            }}
            onBack={() => setCurrentView("home")}
          />
        );
      case "history":
        return (
          <History
            history={history}
            onBack={() => setCurrentView("home")}
            onClear={clearHistory}
          />
        );
      case "settings":
        return (
          <Settings
            settings={quizSettings}
            theme={theme}
            onToggleTheme={toggleTheme}
            onSave={(newSettings) => {
              setQuizSettings(newSettings);
              setCurrentView("home");
            }}
            onBack={() => setCurrentView("home")}
          />
        );
      default:
        return (
          <Home
            onStartQuiz={() => setCurrentView("quiz")}
            onViewHistory={() => setCurrentView("history")}
            onOpenSettings={() => setCurrentView("settings")}
            theme={theme}
            onToggleTheme={toggleTheme}
            stats={getStats()}
          />
        );
    }
  };

  const getStats = () => {
    if (history.length === 0) return null;

    const totalAttempts = history.length;
    const totalQuestions = history.reduce(
      (sum, h) => sum + h.totalQuestions,
      0
    );
    const totalCorrect = history.reduce((sum, h) => sum + h.correctAnswers, 0);
    const averageScore =
      totalQuestions > 0
        ? Math.round((totalCorrect / totalQuestions) * 100)
        : 0;
    const bestScore = Math.max(
      ...history.map((h) =>
        Math.round((h.correctAnswers / h.totalQuestions) * 100)
      )
    );

    return {
      totalAttempts,
      averageScore,
      bestScore,
      totalQuestions,
      totalCorrect,
    };
  };

  return <div className="App">{renderView()}</div>;
}

export default App;
