import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import CivilizationModel from "../models/civilization";
import { assertIsDefined } from "../util/assertIsDefined";

export const getCivilizations: RequestHandler = async (req, res, next) => {
    try {
        const civs = await CivilizationModel.find({}).exec();
        res.status(200).json(civs);
    } catch (error) {
        next(error);
    }
};

export const getCivilization: RequestHandler = async (req, res, next) => {
    // Passed in with GET /api/civilizations/Armenians
    const nameParam = req.params.name;
    console.log("req.params: ", req.params);

    try {
        const civ = await CivilizationModel.find({ name: nameParam }).exec();

        if (!civ) {
            throw createHttpError(404, "Civ not found");
        }
        res.status(200).json(civ);
    } catch (error) {
        next(error);
    }
};