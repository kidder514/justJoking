
export const loadOn = (text) => {
	return { 
		type: 'LOAD_ON',
		payload: text
	};
};

export const loadEnd = () => {
	return { type: 'LOAD_END' };
};
