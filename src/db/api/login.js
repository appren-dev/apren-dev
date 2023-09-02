import { app, getById } from "../firebase/firebaseConfig";
//import { getIP } from "./getIP";
import {
	getAuth,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	updatePassword,
	reauthenticateWithCredential,
	EmailAuthProvider,
} from "firebase/auth";
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

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

const CredentialsProvider = async ({ email, password }) => {
	try {
		//const ip = await getIP();
		const { user } = await signInWithEmailAndPassword(auth, email, password);
		if (user) {
			try {
				const userMatched = await authorizeUserLogin(user.uid);
				delete userMatched.password;
				return userMatched;
			} catch (error) {
				return {
					error: 404,
					message: "auth(/not-authorized).",
				};
			}
		}
	} catch (error) {
		return error;
	}
};

const GoogleProvider = async () => {
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

const reAuthenticate = async (oldPassword) => {
	const credential = EmailAuthProvider.credential(auth.currentUser.email, oldPassword);
	try {
		return await reauthenticateWithCredential(auth.currentUser, credential);
	} catch (error) {
		return error;
	}
};

export { CredentialsProvider, GoogleProvider, onSingOut, changePassword, reAuthenticate };
