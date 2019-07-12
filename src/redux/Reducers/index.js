import {combineReducers} from 'redux'
import UserReducer from './users'
// import {cartReducer} from './cartReducer'
export default combineReducers({
    user : UserReducer,
    // cart : cartReducer
})