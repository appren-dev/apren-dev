import { CredentialsProviderRegister } from "db/api/register";
import { FIELDEVALUATOR } from "utilities/fieldEvaluator";
import { errorHandler } from "utilities/errorHandler";
import { Toast } from "utilities/ToastsHelper";
import { useNavigate } from "react-router";
import { useState } from "react";

export const useRegister = () => {
	const [credentialsRegister, setCredentialsRegister] = useState({
		name: "",
		email: "",
		password: "",
		repeatPassword: "",
	});
	const [loading, setLoading] = useState({
		credentialSigning: false,
		googleSigning: {
			status: false,
			message: "",
		},
	});
	const [invalidFields, setInvalidFields] = useState({
        name:null, 
		email: null,
		password: null,
        repeatPassword:null
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		const entity = e.target.name;
		const value = e.target.value;
		setCredentialsRegister((prevState) => ({ ...prevState, [entity]: value }));
		setInvalidFields((prevState) => ({ ...prevState, [entity]: null }));
        console.log(credentialsRegister)
	};

	const handleSubmit = async (e) => {
		setLoading({ credentialSigning: true });
        console.log("se hizo submit en register")
		e.preventDefault();
		/* const errorsObject = FIELDEVALUATOR(credentialsRegister);
		const areErrors = Object.keys(errorsObject);
		if (areErrors.length > 0) {
			return setInvalidFields(errorsObject);
		} */
		try {
			const response = await CredentialsProviderRegister(credentialsRegister);
            console.log("response de firebase: " , response)
			const data = {
				name: response.user.displayName || "No name to show",
				email: response.user.email,
				image:
					response.user.photoURL ||
					"https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/crazy-face.png",
				status: "authenticated",
			};
            console.log(data)
			sessionStorage.setItem("dataRegister", JSON.stringify(data));
/* 			setLoading({
				credentialSigning: false,
				googleSigning: {
					status: false,
					message: "",
				},
			});
			return navigate("/", { state: data }); */
		} catch (error) {
            console.log(error)
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
		credentialsRegister,
		handleChange,
		handleSubmit,
		invalidFields,
	};
};
