import{createStore, combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {mealListReducer, mealDetailsReducer, mealTopRateReducer} from './reducers/mealReducers'
import {cartReducer} from './reducers/cartReducers';
import {userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer} from './reducers/userReducers';

const reducer = combineReducers({
    mealList: mealListReducer,
    mealDetails: mealDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister:userRegisterReducer,
    mealTopRated: mealTopRateReducer,
    userDetails : userDetailsReducer,
    userUpdateProfile : userUpdateProfileReducer,
    // shippingAd
});
const cartItemsFromStorage = localStorage.getItem('cartItems') 
? JSON.parse(localStorage.getItem('cartItems'))
:[]
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') 
? JSON.parse(localStorage.getItem('shippingAddress'))
:[]

const userInfoFromStorage = localStorage.getItem('userInfo') 
? JSON.parse(localStorage.getItem('userInfo'))
:null
const initialState = {
    cart: {cartItems :cartItemsFromStorage, shippingAddress: shippingAddressFromStorage},
    userLogin:{userInfo: userInfoFromStorage},
};
const middleware = [thunk];
const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
    );

export default store;
