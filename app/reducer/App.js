import config from '../config';

const initState = {
	isCheckingVersion: true,
	hasNewVersion: false,
	isForceUpdateNeeded: false,
	currentVersion: 0.1
}

function App(state = initState, action) {
	switch (action.type) {
		case 'CHECK_VERSION': 
			return Object.assign({}, state, reduceVersion(state, action.payload))
		default:
			return state;
	}
}

function reduceVersion(state, serverConfig) {
    return {
        isCheckingVersion: false,
        hasNewVersion: config.currentVersion < serverConfig.newestVersion,
        isForceUpdateNeeded: config.currentVersion < serverConfig.lowestVersion, 
    }
}

export default App;
