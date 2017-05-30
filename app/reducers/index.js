import { combineReducers } from 'redux'
import games from './games'
import authReducer from'./authReducer'

export default combineReducers({
  games,
  authReducer,
})
