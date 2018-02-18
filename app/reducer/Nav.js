import { NavigationActions } from 'react-navigation';
import { WrapperNavigator } from '../AppNavigator';

function Nav(state, action) {
	// let nextState;
	// switch (action.type) {
	// 	default:
	// 		nextState = WrapperNavigator.router.getStateForAction(action, state);
	// 		break;
	// }

	// Simply return the original `state` if `nextState` is null or undefined.
	return nextState || state;
}

export default Nav;
