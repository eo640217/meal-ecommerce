import express from "express";

import {getMeals, getMealById, getTopMeals} from '../controllers/mealController.js'
const router = express.Router();

router.route('/').get(getMeals);
router.get('/top',getTopMeals);
router.route('/:id').get(getMealById);

export default router;