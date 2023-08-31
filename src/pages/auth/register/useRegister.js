import { CredentialsProviderRegister } from "db/api/register";
import /* FIELDEVALUATOR */ "utilities/fieldEvaluator";
import { errorHandler } from "utilities/errorHandler";
import { Toast } from "utilities/ToastsHelper";
import /* useNavigate */ "react-router";
import { useState } from "react";
import { sendEmailVerification } from "firebase/auth";
/* import { doc, setDoc } from "firebase/firestore"; */
import { useNavigate } from "react-router";
import * as Yup from "yup";

const defaultImage =
	"https://as2.ftcdn.net/v2/jpg/05/49/98/39/1000_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg";

export const useRegister = () => {
	const initialValues = {
		name: "",
		email: "",
		password: "",
		repeatPassword: "",
	};
	const [loading, setLoading] = useState({
		credentialSigning: false,
		googleSigning: {
			status: false,
			message: "",
		},
	});
	/* 	const [invalidFields, setInvalidFields] = useState({
		name: null,
		email: null,
		password: null,
		repeatPassword: null,
	}); */

	const navigate = useNavigate();

	/* const handleChange = (e) => {
		const entity = e.target.name;
		const value = e.target.value;
		setCredentialsRegister((prevState) => ({ ...prevState, [entity]: value }));
		setInvalidFields((prevState) => ({ ...prevState, [entity]: null }));
	}; */

	const VALID_PASSWORD_REGEX =
		/^(?=.*?[A-Z])(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*?[a-z])(?=.*?[0-9]).{8,20}$/;
	const getValidationSchema = () =>
		Yup.lazy(() =>
			Yup.object().shape({
				name: Yup.string().required("Campo Obligatorio"),

				email: Yup.string().email().required("Campo Obligatorio"),

				password: Yup.string()
					.min(8, "La contraseña debe tener al menos 8 caracteres")
					.max(20, "La contraseña no debe superar los 20 caracteres")
					.required("Campo Obligatorio")
					.matches(
						VALID_PASSWORD_REGEX,
						"La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial",
					),

				repeatPassword: Yup.string()
					.oneOf([Yup.ref("password"), null], "Las contraseñas no  coinciden")
					.required("Campo Obligatorio"),
			}),
		);

	const handleSubmitRegistration = async (values) => {
		setLoading({ credentialSigning: true });

		try {
			const response = await CredentialsProviderRegister(values);

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
		initialValues,
		getValidationSchema,
		/* handleChange ,*/
		handleSubmitRegistration,
	};
};
