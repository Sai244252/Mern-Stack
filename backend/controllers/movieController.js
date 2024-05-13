import Movie from "../models/Movie.js";

const createMovie = async (req, res) => {
  try {
    const newMovie = new Movie(req.body);

    const savedMovie = await newMovie.save();

    res.json(savedMovie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getALlMovies = async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSpecificMovie = async (req, res) => {
  try {
    const movie = await Movie.find({ _id: req.params.id });

    if (!movie) {
      return res.status(404).json({ message: "Movie Not found" });
    }

    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie Not found" });
    }

    res.send(updatedMovie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const movieReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const movie = await Movie.findById({ _id: req.params.id });

    if (movie) {
      const alreadyReviewed = movie.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Movie Already Reviewed!!");
      }

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      movie.reviews.push(review);
      movie.numReviews = movie.reviews.length;

      movie.rating =
        movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
        movie.reviews.length;

      await movie.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Movie not Found.");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByIdAndDelete({ _id: id });
    if (!movie) {
      return res.status(404).json({ message: "Movie Not found" });
    }

    res.json({ message: "Movie deleted Successfully" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const deleteComment = async (req, res) => {
  try {
    const { movieId, reviewId } = req.body;

    const movie = await Movie.findById({ _id: movieId });

    if (!movie) {
      return res.status(404).json({ message: "Movie Not found" });
    }

    const reviewIndex = movie.reviews.findIndex(
      (review) => reviewId === review._id.toString()
    );

    movie.reviews.splice(reviewId, 1);
    movie.numReviews = movie.reviews.length;

    movie.reviews.rating =
      movie.reviews.length > 0
        ? movie.reviews.reduce((acc, item) => {
            return acc + item;
          }, 0) / movie.reviews.length
        : 0;

    await movie.save();
    res.status(200).json({ message: "Comment Deleted Successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getNewMovies = async (req, res) => {
  try {
    const newMovies = await Movie.find().sort({ createdAt: -1 }).limit(10);

    res.send(newMovies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTopMovies = async (req, res) => {
  try {
    const topRatedMovies = await Movie.find()
      .sort({ numReviews: -1 })
      .limit(10);

    res.send(topRatedMovies);
  } catch (error) {
    res.status(500).json({ erorr: error.message });
  }
};

const getRandomMovies = async (req, res) => {
  try {
    const randomMovies = await Movie.aggregate([{ $sample: { size: 10 } }]);

    res.send(randomMovies);
  } catch (error) {
    res.status(500).json({ erorr: error.message });
  }
};

export {
  createMovie,
  getALlMovies,
  getSpecificMovie,
  updateMovie,
  movieReview,
  deleteMovie,
  deleteComment,
  getNewMovies,
  getTopMovies,
  getRandomMovies,
};
