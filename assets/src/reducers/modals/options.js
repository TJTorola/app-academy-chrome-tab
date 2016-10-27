export default (state = false, action) => {
	switch (action.type) {
		case "SET_OPTIONS_VISIBLE":
			return true;
		case "SET_OPTIONS_HIDE":
			return false;
		case "SET_DESKS_VISIBLE":
			return false;
		case "HIDE_MODALS":
			return false;
	}
	return state;
};