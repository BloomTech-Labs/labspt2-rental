import { combineReducers } from 'redux';
import { propertiesReducer } from '../Components/Properties/PropList/reducers'

export default combineReducers({
  properties: propertiesReducer
});
