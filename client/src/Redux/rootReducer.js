import { combineReducers } from 'redux';
import registrationReducer from '../Components/Registration/reducer'

export default combineReducers({
  registration: registrationReducer
});
