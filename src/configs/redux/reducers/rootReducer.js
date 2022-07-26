import { combineReducers } from 'redux'
import updateUserActive from './listUserReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
    user : userReducer,
    userOnline : updateUserActive
})

export default rootReducer