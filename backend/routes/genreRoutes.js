import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

//Controllers
import {
  createGenre,
  listGenres,
  removeGenre,
  updateGenre,
  readGenre,
} from "../controllers/genreController.js";

//Middlewares
router.route("/").post(authenticate, authorizeAdmin, createGenre);

router.route("/:id").put(authenticate, authorizeAdmin, updateGenre);

router.route("/:id").delete(authenticate, authorizeAdmin, removeGenre);

router.route("/genres").get(listGenres);
router.route("/:id").get(readGenre);

export default router;
