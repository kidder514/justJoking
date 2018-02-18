import { combineReducers } from 'redux'
import Ui from './Ui';
import Nav from './Nav'
import Auth from './Auth'

const rootReducer = combineReducers({
	Ui,
	Nav,
	Auth
});

export default rootReducer;
