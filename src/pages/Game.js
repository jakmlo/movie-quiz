import React, { useState, useEffect } from "react";
import QuestionCard from "../components/QuestionCard";

import "./Game.css";

const Game = () => {
  const [data, setData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [finalResults, setFinalResults] = useState(false);
  const [score, setScore] = useState(0);
  // const shuffled = data.sort(() => 0.5 - Math.random());
  // let selectedQuestions = shuffled.slice(0, 5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await import("../data/questions.json");
        setData(response.default.questions);
        setDataLoaded(true);
      } catch (e) {
        console.log(e.message);
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
    if (currentQuestion + 1 < data.length)
      setCurrentQuestion(currentQuestion + 1);
    else {
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
              <div className="results">
                <h2>Quiz Game</h2>
                <h1>Wyniki</h1>
                <p>
                  {score} na {data.length} punktów
                </p>
                <button onClick={resetGame}>Spróbuj ponownie</button>
              </div>
            </>
          ) : (
            <div className="game-container">
              <h2>Quiz Game</h2>
              <QuestionCard
                src={data[currentQuestion].image}
                question={data[currentQuestion]}
                currentQuestion={currentQuestion}
                handleClick={handleClick}
                correctAnswer={correctAnswer}
                dataLoaded={dataLoaded}
              />
            </div>
          )}
        </>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

export default Game;
