

const fourMonthsAgo = new Date();
fourMonthsAgo.setMonth(fourMonthsAgo.getMonth() - 4);

export const dataLastQuarter = (data) =>
	data.filter((item) => {
		const itemDate = new Date(item.date);
		return itemDate >= fourMonthsAgo;
	});



const sixMonthsAgo = new Date();
sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

export const dataLastSemester = (data) =>
	data.filter((item) => {
		const itemDate = new Date(item.date);
		return itemDate >= sixMonthsAgo;
	});

const oneYearAgo = new Date();
oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

export const dataLastYear = (data) =>
	data.filter((item) => {
		const itemDate = new Date(item.date);
		return itemDate >= oneYearAgo;
	});
