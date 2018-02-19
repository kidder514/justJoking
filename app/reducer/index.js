import { combineReducers } from 'redux'
import Ui from './Ui';
import Auth from './Auth';

const rootReducer = combineReducers({
	Ui,
	Auth
});

export default rootReducer;
