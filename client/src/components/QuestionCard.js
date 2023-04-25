import React, { useState, useRef } from "react";
import Image from "./Image";
import useImage from "../hooks/useImage";
import forwardIcon from "../assets/forward-icon.png";
import "./QuestionCard.css";

const QuestionCard = (props) => {
  const { loading, error, image } = useImage(props.src);
  const inputRef = useRef(null);
  const [title, setTitle] = useState("");
  const [actor, setActor] = useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleActor = (e) => {
    setActor(e.target.value);
  };

  const focus = () => {
    inputRef.current.focus();
  };

  if (props.dataLoaded) {
    if (props.level === "Początkujący") {
      return (
        <>
          <div className="image-container">
            <Image src={image} />
          </div>
          <div className="answer-container">
            {props.question.answers.map((option, id) => {
              return (
                <button
                  key={id}
                  onClick={(e) => props.handleClick(e, option.isCorrect)}
                >
                  {option.content}
                </button>
              );
            })}
          </div>
        </>
      );
    } else if (props.level === "medium") {
      return (
        <>
          <div className="image-container">
            <Image src={image} />
          </div>
          <div className="answer-container">
            <form
              className="game-form"
              onSubmit={(e) => {
                props.handleMedium(e, title, props.question.answers[0].content);
                setTitle("");
              }}
            >
              <input
                key={0}
                value={title}
                autoFocus
                ref={inputRef}
                className="game-input"
                placeholder="Wpisz tytuł filmu"
                onChange={handleChange}
              ></input>
              <button className="next-button" onClick={focus}>
                <img
                  src={forwardIcon}
                  alt="forward icon"
                  className="forward-icon"
                />
              </button>
            </form>
          </div>
        </>
      );
    } else if (props.level === "hard") {
      return (
        <>
          <div className="image-container">
            <Image src={image} />
          </div>
          <div className="answer-container">
            <form
              className="game-form"
              onSubmit={(e) => {
                props.handleHard(
                  e,
                  title,
                  props.question.answers[0].content,
                  actor,
                  props.question.Actor_answers
                );
                setTitle("");
                setActor("");
              }}
            >
              <input
                key={0}
                value={title}
                autoFocus
                ref={inputRef}
                className="game-input"
                placeholder="Wpisz tytuł filmu"
                onChange={handleChange}
              ></input>
              <input
                key={1}
                value={actor}
                className="game-input"
                placeholder="Wymień aktora z kadru"
                onChange={handleActor}
              ></input>
              <button className="next-button" onClick={focus}>
                <img
                  src={forwardIcon}
                  alt="forward icon"
                  className="forward-icon"
                />
              </button>
            </form>
          </div>
        </>
      );
    }
  } else return <p>Loading</p>;
};

export default QuestionCard;
