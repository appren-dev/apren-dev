import { CredentialsProvider, GoogleProvider } from "db/api/login";
import { FIELDEVALUATOR } from "utilities/fieldEvaluator";
import { errorHandler } from "utilities/errorHandler";
import { Toast } from "utilities/ToastsHelper";
import { useNavigate } from "react-router";
import { useState } from "react";

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

	const navigate = useNavigate();

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
			const data = {
				name: response.user.displayName || "No name to show",
				email: response.user.email,
				image:
					response.user.photoURL ||
					"https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/crazy-face.png",
				status: "authenticated",
			};
			sessionStorage.setItem("data", JSON.stringify(data));
			setLoading({
				credentialSigning: false,
				googleSigning: {
					status: false,
					message: "",
				},
			});
			return navigate("/", { state: data });
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
			setLoading({
				credentialSigning: false,
				googleSigning: {
					status: false,
					message: "",
				},
			});
			if (response) {
				console.log(response);
				const data = {
					name: response.user.displayName || "No name to show",
					email: response.user.email,
					image:
						response.user.photoURL ||
						"https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/crazy-face.png",
					status: "authenticated",
				};
				sessionStorage.setItem("data", JSON.stringify(data));
				setLoading({
					credentialSigning: false,
					googleSigning: {
						status: false,
						message: "",
					},
				});
				return navigate("/", { state: data });
			}
			return;
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
