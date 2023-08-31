import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "../firebase/firebaseConfig";
const auth = getAuth(app);

const CredentialsProviderRegister = async ({ email, password }) => {
	return await createUserWithEmailAndPassword(auth, email, password);
};

/* const sendConfirmationEmail = async () => {
	try {
	
            let user = auth.getCurrentUser();
 
            sendEmailVerification()



	} catch (err) {
		console.log(err);
	}
}; */

const onSingOut = async () => {
	try {
		return await signOut(auth);
	} catch (error) {
		return error;
	}
};

export { CredentialsProviderRegister /* , sendConfirmationEmail */, onSingOut };
