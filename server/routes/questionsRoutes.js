const express = require("express");
const router = express.Router();
const {
  getAllQuestions,
  getQuestionById,
  addQuestion,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/questionsController");

router.route("/").get(getAllQuestions).post(addQuestion);

router
  .route("/:id")
  .get(getQuestionById)
  .put(updateQuestion)
  .delete(deleteQuestion);

module.exports = router;
