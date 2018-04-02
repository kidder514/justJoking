const initialState = {
	isLoading: false,
	loadingText: ''
};

function Ui(state = initialState, action = {}) {
	switch (action.type) {
		case 'LOAD_ON':
			return { ...state, isLoading: true, loadingText: action.payload};
		case 'LOAD_END':
			return { ...state, isLoading: false, loadingText: ''};
		default:
			return state;
	}
}

export default Ui;
