import {
	getAuth,
	createUserWithEmailAndPassword,
	signOut,
	signInWithPopup,
	GoogleAuthProvider,
} from "firebase/auth";
import { app, getById } from "../firebase/firebaseConfig";
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const CredentialsProviderRegister = async ({ email, password }) => {
	return await createUserWithEmailAndPassword(auth, email, password);
};

const authorizeUserLogin = async (uid) => {
	try {
		const userDocument = await getById({
			name: "registered_users",
			id: uid,
		});
		return userDocument;
	} catch (error) {
		return error;
	}
};

/* const GoogleProviderRegister = async () => {
	try {
		const { user } = await signInWithPopup(auth, googleProvider);
		if (user) {
			try {
				const userMatched = await authorizeUserLogin(user.uid);
				delete userMatched.password;
				return { ...userMatched, name: user.displayName };
			} catch (error) {
				return {
					error: 404,
					message: "auth(/not-authorized).",
				};
			}
		}
	} catch (err) {
		return err;
	}
}; */

const onSingOut = async () => {
	try {
		return await signOut(auth);
	} catch (error) {
		return error;
	}
};

export { CredentialsProviderRegister, onSingOut };
