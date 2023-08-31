import { CredentialsProviderRegister } from "db/api/register";
import /* FIELDEVALUATOR */ "utilities/fieldEvaluator";
import { errorHandler } from "utilities/errorHandler";
import { Toast } from "utilities/ToastsHelper";
import /* useNavigate */ "react-router";
import { useState } from "react";
import { sendEmailVerification } from "firebase/auth";
/* import { doc, setDoc } from "firebase/firestore"; */
import { useNavigate } from "react-router";
const defaultImage =
	"https://as2.ftcdn.net/v2/jpg/05/49/98/39/1000_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg";

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
		name: null,
		email: null,
		password: null,
		repeatPassword: null,
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		const entity = e.target.name;
		const value = e.target.value;
		setCredentialsRegister((prevState) => ({ ...prevState, [entity]: value }));
		setInvalidFields((prevState) => ({ ...prevState, [entity]: null }));
	};

	const handleSubmit = async (e) => {
		setLoading({ credentialSigning: true });
		e.preventDefault();

		/* const errorsObject = FIELDEVALUATOR(credentialsRegister);
		const areErrors = Object.keys(errorsObject);
		if (areErrors.length > 0) {
            return setInvalidFields(errorsObject);
		} */
		try {
			const response = await CredentialsProviderRegister(credentialsRegister);
			console.log("response del register: ", response);

			if (response?.user) {
				const data = {
					name: response.user.displayName,
					email: response.user.email,
					image: response.user.photoURL || defaultImage,
					status: "authenticated",
					emailVerified: true,
					metadata: {
						...response.user.metadata,
					},
					password: "",
					userIP: "",
					id: response.user.uid,
				};
				await sendEmailVerification(response.user);
				localStorage.setItem("user_reg", JSON.stringify(data));
				return navigate("/authentication/confirmation");
			}
		} catch (error) {
			console.log(error);
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
