import $ from 'jQuery';

const getCityByIp = ({ dispatch, getState }) => {
	const { cityId } = getState();
	if (cityId) { return; };

	const sfLong = -122;
	const nycLong = -74;
	const midLong = parseInt((sfLong + nycLong) / 2);

	$.getJSON("http://ipinfo.io/json", (data) => {
			const long = parseInt(data.loc.split(",")[1]);
			const cityId = (long > midLong) ? 1 : 2;
			dispatch({ type: "CLEAR_POD_ID" });
			dispatch({ type: "SET_CITY_ID", cityId });
	});
}

export default store => next => action => {
	switch (action.type) {
		case "GET_CITY":
			getCityByIp(store);
			break;
	}
	return next(action);
}