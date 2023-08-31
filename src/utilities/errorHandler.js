import { lang } from "lang/config";

export const errorHandler = (incommingError) => {
	const { message: error } = incommingError;
	console.log("Original error:", error);

	const splitted = error.split("/")[1];
	const message = splitted.replaceAll("-", "_").replaceAll(")", "").replaceAll(".", "");
	console.log("mensaje que retorna: ", message);
	return lang[message];
};
