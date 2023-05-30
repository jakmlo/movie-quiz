import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import backIcon from "../assets/back-icon.png";
import { useNavigate } from "react-router-dom";
import Ad from "../components/Ad";
import addScore from "../utilities/addScore";
import { useAuth } from "../hooks/useAuth";

import "./Game.scss";
import Leaderboard from "../components/Leaderboard";

const Game = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [finalResults, setFinalResults] = useState(false);
  const [showAd, setShowAd] = useState(true);
  const [score, setScore] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const { state } = useLocation();
  const startValue = state?.startValue;
  const [count, setCounter] = useState(startValue);
  let intervalID = useRef(null);

  const { user, globalUsername } = useAuth();

  const navigate = useNavigate();

  const level = state?.level;

  useEffect(() => {
    const fetchData = async () => {
      if (level === "Początkujący") {
        try {
          const response = await import("../data/questions_easy.json");
          setAllQuestions(response.default.questions);
          const shuffleQuestions = async (toShuffle) => {
            try {
              for (let i = toShuffle.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [toShuffle[i], toShuffle[j]] = [toShuffle[j], toShuffle[i]];
              }
              toShuffle.forEach((question) => {
                for (let i = question.answers.length - 1; i > 0; i--) {
                  const j = Math.floor(Math.random() * (i + 1));
                  [question.answers[i], question.answers[j]] = [
                    question.answers[j],
                    question.answers[i],
                  ];
                }
              });
              setSelectedQuestions(toShuffle.slice(0, 10));
            } catch (e) {
              console.log(e.message);
            }
          };
          shuffleQuestions(response.default.questions);
          setDataLoaded(true);
        } catch (e) {
          console.log(e.message);
        }
      } else if (level === "Średniozaawansowany") {
        try {
          const response = await import("../data/questions_medium.json");
          setAllQuestions(response.default.questions);
          const shuffleQuestions = async (toShuffle) => {
            try {
              for (let i = toShuffle.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [toShuffle[i], toShuffle[j]] = [toShuffle[j], toShuffle[i]];
              }
              setSelectedQuestions(toShuffle.slice(0, 10));
            } catch (e) {
              console.log(e.message);
            }
          };
          shuffleQuestions(response.default.questions);
          setDataLoaded(true);
        } catch (e) {
          console.log(e.message);
        }
      } else if (level === "Zaawansowany") {
        try {
          const response = await import("../data/questions_hard.json");
          setAllQuestions(response.default.questions);
          const shuffleQuestions = async (toShuffle) => {
            try {
              for (let i = toShuffle.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [toShuffle[i], toShuffle[j]] = [toShuffle[j], toShuffle[i]];
              }
              setSelectedQuestions(toShuffle.slice(0, 10));
            } catch (e) {
              console.log(e.message);
            }
          };
          shuffleQuestions(response.default.questions);
          setDataLoaded(true);
        } catch (e) {
          console.log(e.message);
        }
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (count > 0 && !finalResults) {
      intervalID.current = setInterval(() => {
        setCounter((currentCount) => {
          return currentCount - 1;
        });
      }, 1000);
      return () => clearInterval(intervalID.current);
    }
  }, [count]);

  const handleClick = (e, isCorrect) => {
    e.preventDefault();
    if (isCorrect) {
      setCorrectAnswer(true);
      setScore((score) => score + 1);
    }
    if (currentQuestion + 1 < selectedQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinalResults(true);
      addScore(user?.displayName || globalUsername, score + 1, level);
    }
    setCounter(10);
  };

  const handleMedium = (e, title, isCorrect) => {
    e.preventDefault();
    if (title.toLowerCase() === isCorrect.toLowerCase()) {
      setCorrectAnswer(true);
      setScore((score) => score + 1);
    }

    if (currentQuestion + 1 < selectedQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinalResults(true);
      addScore(user?.displayName || globalUsername, score, level);
    }
    setCounter(15);
  };

  const handleHard = (e, title, isCorrect, actor, isActorCorrect) => {
    e.preventDefault();
    if (
      title.toLowerCase() === isCorrect.toLowerCase() &&
      isActorCorrect.some((element) => element.content === actor)
    ) {
      setCorrectAnswer(true);
      setScore((score) => score + 1);
    }

    if (currentQuestion + 1 < selectedQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinalResults(true);
      addScore(user?.displayName || globalUsername, score, level);
    }
    setCounter(20);
  };

  const handleAd = () => {
    setShowAd(false);
  };

  const backToMenu = () => {
    navigate("/");
  };

  const resetGame = () => {
    setScore(0);
    setFinalResults(false);
    setCurrentQuestion(0);
    setShowAd(true);

    const shuffleQuestions = async (toShuffle) => {
      try {
        for (let i = toShuffle.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [toShuffle[i], toShuffle[j]] = [toShuffle[j], toShuffle[i]];
        }
        setSelectedQuestions(toShuffle.slice(0, 10));
      } catch (e) {
        console.log(e.message);
      }
    };
    shuffleQuestions(allQuestions);
    if (level === "Początkujący") {
      setCounter(10);
    } else if (level === "Średniozaawansowany") {
      setCounter(15);
    } else if (level === "Zaawansowany") {
      setCounter(20);
    }
  };

  return (
    <>
      {dataLoaded ? (
        <div className="game">
          {finalResults ? (
            <>
              {showAd ? (
                <Ad onClick={handleAd} />
              ) : (
                <>
                  <Link to="/">
                    <img src={backIcon} alt="back icon" className="back-icon" />
                  </Link>
                  <span className="results__leaderboard">
                    <Leaderboard level={level} />
                  </span>

                  <div className="results">
                    <h2 className="game__header">Twój wynik:</h2>
                    <p className="results__score">
                      {score} na {selectedQuestions.length} punktów
                    </p>
                    <button className="results__button" onClick={resetGame}>
                      Spróbuj ponownie
                    </button>
                    <button className="results__button" onClick={backToMenu}>
                      Powrót do menu głównego
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <Link to="/">
                <img src={backIcon} alt="back icon" className="back-icon" />
              </Link>
              <div className="game__container">
                <h2 className="game__header">{level}</h2>
                <div className="game__info">
                  <span className="game__timer">
                    Pozostały czas: {count} sekund
                  </span>
                  <span className="current-question">
                    {`${currentQuestion + 1}/${selectedQuestions.length}`}
                  </span>
                </div>
                {count > 0 ? (
                  <>
                    <QuestionCard
                      src={selectedQuestions[currentQuestion].image}
                      question={selectedQuestions[currentQuestion]}
                      currentQuestion={currentQuestion}
                      level={level}
                      handleClick={handleClick}
                      handleMedium={handleMedium}
                      handleHard={handleHard}
                      correctAnswer={correctAnswer}
                      dataLoaded={dataLoaded}
                    />
                    <h1 className="game__header">
                      Scena przedstawia kadr z serialu lub filmu..
                    </h1>
                  </>
                ) : (
                  <>
                    <h1 className="game__header">Koniec czasu!</h1>
                    <button className="game__button" onClick={handleClick}>
                      Następne pytanie
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

export default Game;
