import { CART_REMOVE_ITEM, CART_ADD_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = {cartItems: []}, action) =>{
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(x=>x.meal === item.meal)
        
            if(existItem){
                return {
                    ...state,
                    cartItems: state.cartItems.map(x=> x.meal === existItem.meal? item : x)
                }
            }
            else{
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case CART_REMOVE_ITEM:    
                return {
                    ...state,
                    cartItems: state.cartItems.filter(x=> x.meal !== action.payload),
                }
            
        default:
            return state;
    }

}