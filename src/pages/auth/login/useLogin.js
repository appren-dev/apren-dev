import { useState } from "react";
import { FIELDEVALUATOR } from "utilities/fieldEvaluator";
import { errorHandler } from "utilities/errorHandler";
import { CredentialsProvider, GoogleProvider } from "db/api/login";
import { Toast } from "utilities/ToastsHelper";

export const useLogin = () => {
	const [credentials, setCredentials] = useState({ email: "", password: "" });
	const [loading, setLoading] = useState({
		credentialSigning: false,
		googleSigning: {
			status: false,
			message: "",
		},
	});
	const [invalidFields, setInvalidFields] = useState({
		email: null,
		password: null,
	});

	const handleChange = (e) => {
		const entity = e.target.name;
		const value = e.target.value;
		setCredentials((prevState) => ({ ...prevState, [entity]: value }));
		setInvalidFields((prevState) => ({ ...prevState, [entity]: null }));
	};

	const handleSubmit = async (e) => {
		setLoading({ credentialSigning: true, googleSigning: false });
		e.preventDefault();
		const errorsObject = FIELDEVALUATOR(credentials);
		const areErrors = Object.keys(errorsObject);
		if (areErrors.length > 0) {
			return setInvalidFields(errorsObject);
		}
		try {
			const response = await CredentialsProvider(credentials);
			console.log("Kz: 🏈 ~ handleSubmit ~ response:", response);
			setLoading({
				credentialSigning: false,
				googleSigning: {
					status: false,
					message: "",
				},
			});
		} catch (error) {
			const errorMessage = errorHandler(error);
			setLoading({
				credentialSigning: false,
				googleSigning: {
					status: false,
					message: "",
				},
			});
			return Toast.error(errorMessage);
		}
	};

	const handleGoogleSigning = async () => {
		setLoading({
			credentialSigning: false,
			googleSigning: {
				status: true,
				message: "Iniciando auth Google...",
			},
		});
		try {
			const response = await GoogleProvider();
			console.log("Kz: 🏈 ~ handleSubmit ~ response:", response);
			setLoading({
				credentialSigning: false,
				googleSigning: {
					status: false,
					message: "",
				},
			});
		} catch (error) {
			console.log("Kz: 🏈 ~ handleGoogleSigning ~ error:", error);
			const errorMessage = errorHandler(error);
			setLoading({
				credentialSigning: false,
				googleSigning: {
					status: false,
					message: "",
				},
			});
			return Toast.error(errorMessage);
		}
	};

	return {
		loading,
		credentials,
		handleChange,
		handleSubmit,
		invalidFields,
		handleGoogleSigning,
	};
};
