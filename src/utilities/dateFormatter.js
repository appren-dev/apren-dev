export const getFormattedDate = (date, orientation) => {
	if (date) {
		const day = date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate();
		const month = date.getMonth() <= 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
		let dt;
		if (orientation === "american") {
			dt = `${day}/${month}/${date.getFullYear()}`;
		}
		if (orientation === "european") {
			dt = `${date.getFullYear()}-${month}-${day}`;
		}
		return dt;
	}
};

export const getDate = (value) => {
	const locale = new Date(value);
	const date = new Date(locale.getUTCFullYear(), locale.getUTCMonth(), locale.getUTCDate());
	return date;
};
