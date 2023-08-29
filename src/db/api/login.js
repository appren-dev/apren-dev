import {
	getAuth,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	updatePassword,
} from "firebase/auth";
import { app } from "../firebase/firebaseConfig";
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const CredentialsProvider = async ({ email, password }) => {
	return await signInWithEmailAndPassword(auth, email, password);
};

const GoogleProvider = async () => {
	try {
		return await signInWithPopup(auth, googleProvider);
	} catch (err) {
		return err;
	}
};

const onSingOut = async () => {
	try {
		return await signOut(auth);
	} catch (error) {
		return error;
	}
};

const changePassword = async (newPassword) => {
	try {
		return await updatePassword(auth.currentUser, newPassword);
	} catch (error) {
		return error;
	}
};

export { CredentialsProvider, GoogleProvider, onSingOut, changePassword };
