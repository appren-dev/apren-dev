export const stringManager = (s) => {
	const value = s.toLowerCase().replaceAll(" ", "").replaceAll("´", "").replaceAll(".", "");
	return value;
};
export const stringToRoute = (s) => {
	const value = s.toLowerCase().replaceAll(" ", "-").replaceAll(".", "");
	return value;
};

export const serializeProperty = (s) => {
	const firstLetter = s.slice(0, 1);
	const valueInCap = firstLetter.toUpperCase();
	const value = s.replace(firstLetter, valueInCap);
	return `n${value}`;
};
