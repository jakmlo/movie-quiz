const fetchData = async (level) => {
  if (level === "Początkujący") {
    try {
      const response = await require("../data/questions_easy.json");
      const shuffleEasyQuestions = async (toShuffle) => {
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
          return toShuffle.slice(0, 10);
        } catch (e) {
          console.log(e.message);
        }
      };
      const selectedQuestions = await shuffleEasyQuestions(response.questions);
      return selectedQuestions;
    } catch (e) {
      console.log(e.message);
    }
  } else if (level === "Średniozaawansowany") {
    try {
      const response = await require("../data/questions_medium.json");
      const shuffleQuestions = async (toShuffle) => {
        try {
          for (let i = toShuffle.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [toShuffle[i], toShuffle[j]] = [toShuffle[j], toShuffle[i]];
          }
          return toShuffle.slice(0, 10);
        } catch (e) {
          console.log(e.message);
        }
      };
      return shuffleQuestions(response.questions);
    } catch (e) {
      console.log(e.message);
    }
  } else if (level === "Zaawansowany") {
    try {
      const response = await require("../data/questions_hard.json");
      setAllQuestions(response.default.questions);
      const shuffleQuestions = async (toShuffle) => {
        try {
          for (let i = toShuffle.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [toShuffle[i], toShuffle[j]] = [toShuffle[j], toShuffle[i]];
          }
          return toShuffle.slice(0, 10);
        } catch (e) {
          console.log(e.message);
        }
      };
      return shuffleQuestions(response.questions);
    } catch (e) {
      console.log(e.message);
    }
  }
};

module.exports = fetchData;
