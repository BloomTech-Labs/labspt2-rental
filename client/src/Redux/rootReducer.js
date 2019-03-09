<<<<<<< HEAD
import { combineReducers } from "redux";
import { propertiesReducer } from "../Components/Properties/PropList/reducers";
import registrationReducer from "../Components/Registration/reducer";
import { userListReducer } from "../Components/UserList/reducer";

export default combineReducers({
  properties: () => null,
  registration: registrationReducer,
  userList: userListReducer
=======
import { combineReducers } from 'redux';
import registrationReducer from '../Components/Registration/reducer'

export default combineReducers({
  registration: registrationReducer
>>>>>>> 6646aaf56ffabcbe7114a155bcf09020077b3615
});
