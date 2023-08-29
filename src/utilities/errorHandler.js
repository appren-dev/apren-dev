const errorMessages = {
	user_not_found: "Este usuario no existe",
	wrong_password: "La contraseña no es correcta",
};
//CONXSOLE.E
export const errorHandler = (incommingError) => {
	const { message: error } = incommingError;
	const splitted = error.split("/")[1];
	const message = splitted.replaceAll("-", "_").replaceAll(")", "").replaceAll(".", "");
	return errorMessages[message];
};
