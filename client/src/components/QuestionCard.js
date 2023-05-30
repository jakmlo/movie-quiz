import React, { useState, useRef } from "react";
import Image from "./Image";
import useImage from "../hooks/useImage";
import forwardIcon from "../assets/forward-icon.png";
import "./QuestionCard.scss";

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
          <div className="image__container">
            <Image src={image} />
          </div>
          <div className="answer__container">
            {props.question.answers.map((option, id) => {
              return (
                <button
                  className="answer__button"
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
    } else if (props.level === "Średniozaawansowany") {
      return (
        <>
          <div className="image__container">
            <Image src={image} />
          </div>
          <div className="answer__container">
            <form
              className="answer__form"
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
                className="answer__input"
                placeholder="Wpisz tytuł"
                onChange={handleChange}
              ></input>
              <button className="answer__next-button" onClick={focus}>
                <img
                  src={forwardIcon}
                  alt="forward icon"
                  className="answer__forward-icon"
                />
              </button>
            </form>
          </div>
        </>
      );
    } else if (props.level === "Zaawansowany") {
      return (
        <>
          <div className="image__container">
            <Image src={image} />
          </div>
          <div className="answer__container">
            <form
              className="answer__form"
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
                className="answer__input"
                placeholder="Wpisz tytuł"
                onChange={handleChange}
              ></input>
              <input
                key={1}
                value={actor}
                className="answer__input"
                placeholder="Wymień aktora z kadru"
                onChange={handleActor}
              ></input>
              <button className="answer__next-button" onClick={focus}>
                <img
                  src={forwardIcon}
                  alt="forward icon"
                  className="answer__forward-icon"
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
