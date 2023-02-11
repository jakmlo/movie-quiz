import React from "react";
import Image from "./Image";
import useImage from "../hooks/useImage";

const QuestionCard = (props) => {
  let { loading, error, image } = useImage(props.src);
  if (props.src.includes("http")) {
    image = props.src;
  }
  if (props.dataLoaded) {
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
  } else return <p>Loading in QuestionCard</p>;
};

export default QuestionCard;
