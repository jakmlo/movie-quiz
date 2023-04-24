import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import backIcon from "../assets/back-icon.png";

import "./Game.css";

const Game = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [finalResults, setFinalResults] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const { state } = useLocation();
  const { level } = state;

  useEffect(() => {
    const fetchData = async () => {
      if (level === "easy") {
        try {
          const response = await import("../data/questions_easy.json");
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
      } else if (level === "hard") {
        try {
          const response = await import("../data/questions_hard.json");
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
    console.log(isActorCorrect.some((element) => element.content === actor));
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

  const resetGame = () => {
    setScore(0);
    setFinalResults(false);
    setCurrentQuestion(0);
  };

  return (
    <>
      {dataLoaded ? (
        <>
          {finalResults ? (
            <>
              <Link to="/">
                <img src={backIcon} alt="back icon" className="back-icon" />
              </Link>
              <div className="results">
                <h2>Quiz Game</h2>
                <h1>Wyniki</h1>
                <p>
                  {score} na {selectedQuestions.length} punktów
                </p>
                <button onClick={resetGame}>Spróbuj ponownie</button>
              </div>
            </>
          ) : (
            <>
              <Link to="/">
                <img src={backIcon} alt="back icon" className="back-icon" />
              </Link>
              <div className="game-container">
                <h2>Quiz Game</h2>
                <span className="current-question">
                  {`${currentQuestion + 1}/${selectedQuestions.length}`}
                </span>
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
              </div>
            </>
          )}
        </>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

export default Game;
