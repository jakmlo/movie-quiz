import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import backIcon from "../assets/back-icon.png";
import { useNavigate } from "react-router-dom";

import "./Game.css";

const Game = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [finalResults, setFinalResults] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [count, setCounter] = useState(5);
  let intervalID = useRef(null);

  const navigate = useNavigate();
  const { state } = useLocation();
  const level = state?.level ? state.level : "Początkujący";

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
      } else if (level === "medium") {
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
    if (count > 0) {
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
      setScore(score + 1);
    }
    if (currentQuestion + 1 < selectedQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinalResults(true);
    }
    setCounter(5);
  };

  const handleMedium = (e, title, isCorrect) => {
    e.preventDefault();
    if (title.toLowerCase() === isCorrect.toLowerCase()) {
      setCorrectAnswer(true);
      setScore(score + 1);
    }

    if (currentQuestion + 1 < selectedQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinalResults(true);
    }
  };

  const handleHard = (e, title, isCorrect, actor, isActorCorrect) => {
    e.preventDefault();
    if (
      title.toLowerCase() === isCorrect.toLowerCase() &&
      isActorCorrect.some((element) => element.content === actor)
    ) {
      setCorrectAnswer(true);
      setScore(score + 1);
    }

    if (currentQuestion + 1 < selectedQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinalResults(true);
    }
  };

  const backToMenu = () => {
    navigate("/");
  };

  const resetGame = () => {
    setScore(0);
    setFinalResults(false);
    setCurrentQuestion(0);
    setCounter(5);

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
  };

  return (
    <>
      {dataLoaded ? (
        <div className="game-wrapper">
          {finalResults ? (
            <>
              <Link to="/">
                <img src={backIcon} alt="back icon" className="back-icon" />
              </Link>
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
          ) : (
            <>
              <Link to="/">
                <img src={backIcon} alt="back icon" className="back-icon" />
              </Link>
              <div className="game-container">
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
