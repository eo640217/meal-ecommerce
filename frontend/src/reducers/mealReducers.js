import
    {MEAL_LIST_FAIL,
         MEAL_LIST_REQUEST,
         MEAL_LIST_SUCCESS,
         MEAL_DETAILS_FAIL,
         MEAL_DETAILS_REQUEST,
         MEAL_DETAILS_SUCCESS,
         MEAL_TOP_FAIL,
         MEAL_TOP_REQUEST,
         MEAL_TOP_SUCCESS} from '../constants/mealConstants'

export const mealListReducer = (state ={meals:[]}, action) => {
    switch(action.type){
        case MEAL_LIST_REQUEST:
            return {loading:true, meals:[]}
        case MEAL_LIST_SUCCESS:
            return {loading:false,meals:action.payload}
        case MEAL_LIST_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
}

export const mealDetailsReducer = (state ={meal:{reviews: []}}, action) => {
    switch(action.type){
        case MEAL_DETAILS_REQUEST:
            return {loading:true, ...state}
        case MEAL_DETAILS_SUCCESS:
            return {loading:false,meal:action.payload}
        case MEAL_DETAILS_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
}

export const mealTopRateReducer = (state ={meals:{}}, action) => {
    switch(action.type){
        case MEAL_TOP_REQUEST:
            return {loading:true, meals:[]}
        case MEAL_TOP_SUCCESS:
            return {loading:false,meals:action.payload}
        case MEAL_TOP_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
}