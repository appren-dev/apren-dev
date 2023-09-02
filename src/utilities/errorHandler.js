import { lang } from "lang/config";

export const errorHandler = (incommingError) => {
	const { message: error } = incommingError;

	const splitted = error.split("/")[1];
	const message = splitted.replaceAll("-", "_").replaceAll(")", "").replaceAll(".", "");
	return lang[message];
};
