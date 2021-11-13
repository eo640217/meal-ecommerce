import{MEAL_DETAILS_FAIL, MEAL_DETAILS_REQUEST, MEAL_DETAILS_SUCCESS, MEAL_LIST_FAIL, MEAL_LIST_REQUEST, MEAL_LIST_SUCCESS, MEAL_TOP_FAIL, MEAL_TOP_REQUEST, MEAL_TOP_SUCCESS} from '../constants/mealConstants';
import axios from 'axios';

export const listTopMeals = () => async (dispatch) => {

    try {
        dispatch({type:MEAL_TOP_REQUEST})
        const {data} = await axios.get(`/api/meals/top`);
        dispatch({
            type:MEAL_TOP_SUCCESS,
            payload :data
        })
    }
    catch (err)
    {
        dispatch({
            type:MEAL_TOP_FAIL,
            payload: 
            err.response && err.response.data.message 
            ? err.response.data.message
            :err.message,
        })

    }
}
export const listMeals = () => async (dispatch) => {
    
    try {
        dispatch({type:MEAL_LIST_REQUEST})
        const {data} = await axios.get(`/api/meals/`)

        dispatch({
            type:MEAL_LIST_SUCCESS,
            payload :data
        })
    }
    catch (err)
    {
        dispatch({
            type:MEAL_LIST_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message,
        })

    }
}

export const listMealDetails = (id) => async (dispatch) => {

    try {
        dispatch({type:MEAL_DETAILS_REQUEST})
        const {data} = await axios.get(`/api/meals/${id}`)

        dispatch({
            type:MEAL_DETAILS_SUCCESS,
            payload :data
        })
    }
    catch (err)
    {
        dispatch({
            type:MEAL_DETAILS_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message:err.message,
        })

    }
}