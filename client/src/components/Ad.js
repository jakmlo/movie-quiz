import React, { useState } from "react";
import adImage from "../assets/placeholder-ad.png";
import Image from "./Image";
import CircularProgress from "./CircularProgress";

import "./Ad.scss";

const Ad = ({ onClick }) => {
  const [percentage, setPercentage] = useState(0);

  return (
    <div className="ad">
      {percentage <= 100 ? (
        <CircularProgress
          size={50}
          strokeWidth={5}
          percentage={percentage}
          color={"black"}
          setPercentage={setPercentage}
        />
      ) : (
        <button onClick={onClick} className="ad__close-button">
          Zamknij reklamę X
        </button>
      )}

      <a href="https://www.pk.edu.pl" target="_blank" rel="noreferrer">
        <Image src={adImage} />
      </a>
    </div>
  );
};

export default Ad;
