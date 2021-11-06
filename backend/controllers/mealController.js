import asyncHandler from 'express-async-handler';
import Meal from "../models/mealModel.js";

const getMeals = asyncHandler(async (req, res) => {
    const meals = await Meal.find({});
    res.json(meals)
})

const getMealById = asyncHandler(async (req, res) => {
    const meal = await Meal.findById(req.params.id)
    if (meal){
        res.json(meal);
    }
    else{
        res.status(404).json({message:'Meal not found.'})
    }
})

const getTopMeals = asyncHandler(async (req,res) => {
    const meals = await Meal.find({}).sort({rating:-1}).limit(3)
    // console.log("21 MEALCONTROLLER:\n",meals);
    res.json(meals)

})

export {getMeals,getMealById, getTopMeals}