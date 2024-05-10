import Genre from "../models/Genre.js";

import asyncHandler from "../middlewares/asyncHandler.js";

const createGenre = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.json({ error: "Error : Name is required!!" });
    }

    const existingGenre = await Genre.findOne({ name });

    if (existingGenre) {
      return res.json({ error: "Genre already exists!!" });
    }

    const genre = await Genre({ name }).save();

    res.json(genre);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

const updateGenre = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const genre = await Genre.findOne({ _id: id });

    if (!genre) {
      return res.status(404).json({ error: "Genre not found" });
    }

    genre.name = name;

    const updatedGenre = await genre.save();
    res.json(updatedGenre);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const removeGenre = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const removedGenre = await Genre.findByIdAndDelete({ _id: id });

    if (!removedGenre) {
      return res.status(404).json({ error: "Genre Not found" });
    }

    res.send(removedGenre);
  } catch (error) {
    res.status(500).json({ error: "Internal server error!!" });
  }
});

const listGenres = asyncHandler(async (req, res) => {
  try {
    const allGenres = await Genre.find({});
    res.send(allGenres);
  } catch (error) {
    res.status(400).json(error?.message);
  }
});

const readGenre = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const genre = await Genre.findOne({ _id: id });
    if (!genre) {
      res.status(404).json({ error: "No Genre Found" });
    }
    res.send(genre);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error!!!" });
  }
});

export { createGenre, updateGenre, removeGenre, listGenres, readGenre };
