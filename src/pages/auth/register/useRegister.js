import { CredentialsProviderRegister } from "db/api/register";
import /* FIELDEVALUATOR */ "utilities/fieldEvaluator";
import { errorHandler } from "utilities/errorHandler";
import { Toast } from "utilities/ToastsHelper";
import /* useNavigate */ "react-router";
import { useState } from "react";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { app, db } from "db/firebase/firebaseConfig";
import { useNavigate } from "react-router";
const auth = getAuth(app);

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
				const verification = await sendEmailVerification(response.user);
				navigate("/confirmation")
				console.log(" respuesta del verification del sendEmailVerification ", verification);

				const data = {
					name: response.user.displayName || "No name to show",
					email: response.user.email,
					image:
						response.user.photoURL ||
						"https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/crazy-face.png",
					status: "authenticated",
					emailVerified: response.user.emailVerified,
				};
			}

			/* setDoc(doc(db, "users", response.user.uid), {
               ...data,
				emailVerified: false,
              ); */

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
