const Question = require("../models/question");

//Get all Questions
exports.getAllQuestion = async (req, res) => {
  try {
    const questions = await Question.find({});
    res.send(questions).status(200).json({
      message: "Questions fetched!",
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Get Question by ID
exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findOne({ _id: req.params.id });
    res.send(question).status(200).json({
      message: "Question fetched!",
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

//Create question
exports.addQuestion = async (req, res) => {
  try {
    const { title, content, author, created_at, modified_at } = req.body;

    await Question.create({
      title,
      content,
      author,
      created_at,
      modified_at,
    });
    res.status(200).json({
      message: "Question added successfully",
    });
  } catch (err) {
    res.status(401).json({
      message: "Failed to add Question",
      error: err.message,
    });
  }
};

// Update a question *in progress*

exports.updateQuestion = async (req, res) => {
  try {
    const question = new Question({
      _id: req.params.id,
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      created_at: req.body.created_at,
      modified_at: req.body.modified_at,
      comments: req.body.comments,
    });
    await Question.updateOne({ _id: req.params.id }, question);
    res.status(201).json({
      message: "Question updated successfully!",
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

// Delete a question
exports.deleteQuestion = async (req, res) => {
  try {
    await Question.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: "Deleted!",
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};
