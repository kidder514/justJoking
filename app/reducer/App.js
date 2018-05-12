import config from '../config';

const initState = {
	isInitiating: true,
	isCheckingUpdate: false,
	hasNewVersion: false,
	isForceUpdateNeeded: false,
	currentVersion: 0.1,
	isVersionCheckFinished: false
}

function App(state = initState, action) {
	switch (action.type) {
		case 'INIT_START':
			return { ...state, isInitiating: true};
		case 'INIT_END':
			return { ...state, isInitiating: false};
		case 'CHECK_VERSION_COMPLETE':
			return { ...state, isVersionCheckFinished: true};
		case 'CHECK_VERSION_START':
			return { ...state, isCheckingUpdate: true};
		case 'CHECK_VERSION': 
			return Object.assign({}, state, reduceVersion(state, action.payload));
		case 'CHECK_VERSION_END':
			return { ...state, isCheckingUpdate: false};
		default:
			return state;
	}
}

function reduceVersion(state, serverConfig) {
    return {
		isCheckingUpdate: false,
        hasNewVersion: config.currentVersion < serverConfig.newestVersion,
        isForceUpdateNeeded: config.currentVersion < serverConfig.lowestVersion, 
    }
}

export default App;
