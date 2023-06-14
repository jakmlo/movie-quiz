const shuffleQuestions = async (toShuffle, setSelectedQuestions) => {
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

export default shuffleQuestions;
