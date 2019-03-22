import { combineReducers } from "redux";
import propertiesReducer from "../Components/Properties/PropList/reducers";
import registrationReducer from "../Components/Registration/reducer";
import userListReducer from "../Components/UserList/reducer";
import reservationsReducer from "../Components/Reservations/reducer";
import employeesReducer from "../Components/Employees/reducers";
import loginReducer from "../Components/LoginPage/reducer";

export default combineReducers({
  properties: () => null,
  registration: registrationReducer,
  auth: loginReducer,
  userList: userListReducer,
  reservations: reservationsReducer,
  employees: employeesReducer
});
