import express from "express";
import * as CivilizationsController from "../controllers/civilizations";

const router = express.Router();

router.get("/", CivilizationsController.getCivilizations);

router.get("/:name", CivilizationsController.getCivilization);

// router.post("/", NotesController.createNote);

// router.patch("/:noteId", NotesController.updateNote);

// router.delete("/:noteId", NotesController.deleteNote);

export default router;