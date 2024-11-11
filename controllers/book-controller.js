const Book = require("../models/book");

const getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find({});
    if (allBooks?.length > 0) {
      res.status(200).json({
        success: true,
        message: "List of books fetched successfully",
        data: allBooks,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No books found in collection",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wront! Please try again",
    });
  }
};

const getSingleBookById = async (req, res) => {
  try {
    const getCurrentBookId = req.params.id;
    const bookDetailsById = await Book.findById(getCurrentBookId);

    if (!bookDetailsById) {
      return res.status(404).json({
        success: false,
        message:
          "Book with the current ID not found! Please try with a different ID",
      });
    }

    res.status(200).json({
      success: true,
      message: `Book with ID ${getCurrentBookId} successfully fetched`,
      date: bookDetailsById,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wront! Please try again",
    });
  }
};

const addNewBook = async (req, res) => {
  try {
    const { title, author, year } = req.body;
    const newLyCreatedBook = await Book.create({ title, author, year });

    if (newLyCreatedBook) {
      res.status(201).json({
        success: true,
        message: "Book added successfully",
        data: newLyCreatedBook,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wront! Please try again",
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const { title, author, year } = req.body;
    const getCurrentBookId = req.params.id;
    const updatedBook = await Book.findByIdAndUpdate(
      getCurrentBookId,
      {
        title,
        author,
        year,
      },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({
        success: true,
        message: `Book with ID ${getCurrentBookId} not found!`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Book with ID ${getCurrentBookId} updated successfully`,
      data: updatedBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wront! Please try again",
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const getCurrentBookId = req.params.id;
    const deletedBook = await Book.findByIdAndDelete(getCurrentBookId);

    if (!deletedBook) {
      return res.status(404).json({
        success: true,
        message: `Book with ID ${getCurrentBookId} not found!`,
      });
    }

    res.status(200).json({
      success: false,
      message: `Book with ID ${getCurrentBookId} deleted successfully`,
      data: deletedBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wront! Please try again",
    });
  }
};

module.exports = {
  getAllBooks,
  getSingleBookById,
  addNewBook,
  updateBook,
  deleteBook,
};
