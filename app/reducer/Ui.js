const initialState = {
	isLoading: false
};

function Ui(state = initialState, action = {}) {
	switch (action.type) {
		case 'LOAD_ON':
			return { ...state, isLoading: true};
		case 'LOAD_END':
			return { ...state, isLoading: false};
		default:
			return state;
	}
}

export default Ui;
