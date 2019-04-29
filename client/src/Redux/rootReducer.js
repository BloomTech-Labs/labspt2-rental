import { combineReducers } from "redux";
import propertyReducer from "../Components/Properties/reducer";
import registrationReducer from "../Components/Registration/reducer";
import userListReducer from "../Components/UserList/reducer";
import reservationsReducer from "../Components/Reservations/reducer";
import employeesReducer from "../Components/Employees/reducers";
import taskReducer from "../Components/Tasks/reducer";
import loginReducer from "../Components/LoginPage/reducer";
import settingsReducer from "../Components/Settings/reducer";
import dashboardReducer from "../Components/Dashboard/reducers";
import checkoutReducer from "../Components/Checkout/reducers";
import newLoginReducer from "../Components/Welcome/reducer";
import resetReducer from "../Components/PasswordReset/reducer";

export default combineReducers({
  properties: propertyReducer,
  registration: registrationReducer,
  auth: loginReducer,
  userList: userListReducer,
  reservations: reservationsReducer,
  employees: employeesReducer,
  tasks: taskReducer,
  settings: settingsReducer,
  dashboard: dashboardReducer,
  checkout: checkoutReducer,
  welcome: newLoginReducer,
  reset: resetReducer
});
