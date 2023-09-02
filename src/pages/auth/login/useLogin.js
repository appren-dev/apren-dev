import { CredentialsProvider, GoogleProvider } from "db/api/login";
import { FIELDEVALUATOR } from "utilities/fieldEvaluator";
import { errorHandler } from "utilities/errorHandler";
import { decrypt, encrypt } from "utilities/getByPass";
import { Toast } from "utilities/ToastsHelper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { lang } from "lang/config";
import { registrationDB } from "db/api/registration";

export const useLogin = () => {
	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
		rememberMe: true,
		showPassword: true,
	});
	useEffect(() => {
		const _auth = JSON.parse(localStorage.getItem("_&_"));
		if (_auth) {
			const { _l, _m } = _auth;
			const decrypted_l = decrypt(_l);
			const decrypted_m = decrypt(_m);
			setCredentials({
				email: decrypted_l,
				password: decrypted_m,
				rememberMe: true,
				showPassword: false,
			});
		}
	}, []);

	const [loading, setLoading] = useState({
		credentialSigning: false,
		googleSigning: {
			status: false,
			message: "",
		},
	});

	const onFalseState = () => {
		setLoading({
			credentialSigning: false,
			googleSigning: {
				status: false,
				message: "",
			},
		});
	};
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
			onFalseState();
			return setInvalidFields(errorsObject);
		}
		try {
			if (credentials.rememberMe) {
				const encryptedPass = encrypt(credentials.password);
				const encryptedEm = encrypt(credentials.email);
				localStorage.setItem("_&_", JSON.stringify({ _l: encryptedEm, _m: encryptedPass }));
			} else {
				localStorage.removeItem("_&_");
			}
			const response = await CredentialsProvider(credentials);

			if (response?.error || response?.message) {
				onFalseState();
				const errorMessage = errorHandler(response);
				return Toast.error(errorMessage);
			} else {
				const data = {
					name: response.name,
					email: response.email,
					image: response.image,
					status: lang.session_status_success,
				};
				sessionStorage.setItem("data", JSON.stringify(data));
				onFalseState();
				return navigate("/", { state: data });
			}
		} catch (error) {
			const errorMessage = errorHandler(error);
			onFalseState();
			return Toast.error(errorMessage);
		}
	};

	const handleGoogleSigning = async (fromPath) => {
		setLoading({
			credentialSigning: false,
			googleSigning: {
				status: true,
				message: lang.login_google_session_init,
			},
		});
		let data;
		try {
			const response = await GoogleProvider();
			onFalseState();
			if (response?.error || response?.message) {
				onFalseState();
				const errorMessage = errorHandler(response);
				return Toast.error(errorMessage);
			} else {
				if (fromPath === "/authentication/registration") {
					data = {
						name: response.name,
						email: response.email,
						image: response.image,
						status: "authenticated",
						emailVerified: true,
						metadata: {
							...response.metadata,
						},
						password: "",
						userIP: "",
						id: response.id,
					};
					sessionStorage.setItem("data", JSON.stringify(data));
					await registrationDB(data);
				} else {
					data = {
						name: response.name,
						email: response.email,
						image: response.image,
						status: lang.session_status_success,
					};
					sessionStorage.setItem("data", JSON.stringify(data));
				}
				onFalseState();
				return navigate("/", { state: data });
			}
		} catch (error) {
			const errorMessage = errorHandler(error);
			onFalseState();
			return Toast.error(errorMessage);
		}
	};

	return {
		loading,
		credentials,
		handleChange,
		handleSubmit,
		invalidFields,
		setCredentials,
		handleGoogleSigning,
	};
};
