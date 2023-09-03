const formattedTime = dateNumber => {
	let date = new Date(dateNumber * 1000);
	let formatDate = date.toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
	});
	return formatDate;
};

const formatNumber = num => {
	return Math.round(num);
};
export { formattedTime, formatNumber };
