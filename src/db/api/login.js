import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { app, getById } from "../firebase/firebaseConfig";
import { lang } from "lang/config";
//import { getIP } from "./getIP";
const auth = getAuth(app);
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
			const userMatched = await authorizeUserLogin(user.uid);
			if (userMatched) {
				delete userMatched.password;
				return userMatched;
			} else {
				return {
					error: "error",
					message: lang.error.message,
				};
			}
		}
	} catch (error) {
		return error;
	}
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

export { CredentialsProvider, GoogleProvider, onSingOut };
