import { combineReducers } from "redux";
import propertyReducer from "../Components/Properties/PropList/reducers";
import registrationReducer from "../Components/Registration/reducer";
import userListReducer from "../Components/UserList/reducer";
import reservationsReducer from "../Components/Reservations/reducer";
import loginReducer from "../Components/LoginPage/reducer";

export default combineReducers({
  properties: propertyReducer,
  registration: registrationReducer,
  auth: loginReducer,
  userList: userListReducer,
  reservations: reservationsReducer
});
