import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { app } from "../firebase/firebaseConfig";
const auth = getAuth(app);
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

export { CredentialsProvider, GoogleProvider, onSingOut };
