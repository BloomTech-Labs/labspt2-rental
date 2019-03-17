import { combineReducers } from "redux";
import propertiesReducer from "../Components/Properties/PropList/reducers";
import registrationReducer from "../Components/Registration/reducer";
import userListReducer from "../Components/UserList/reducer";
import reservationsReducer from "../Components/Reservations/reducer";

export default combineReducers({
  properties: () => null,
  registration: registrationReducer,
  userList: userListReducer,
  reservations: reservationsReducer
});
