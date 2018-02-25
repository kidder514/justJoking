import { combineReducers } from 'redux'
import Ui from './Ui';
import Auth from './Auth';
import List from './List';

const rootReducer = combineReducers({
	Ui,
	Auth,
	List
});

export default rootReducer;
