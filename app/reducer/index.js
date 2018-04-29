import { combineReducers } from 'redux'
import Ui from './Ui';
import Auth from './Auth';
import List from './List';
import App from './App';

const rootReducer = combineReducers({
	App,
	Ui,
	Auth,
	List
});

export default rootReducer;
