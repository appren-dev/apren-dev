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
	//sendPasswordResetEmail,
	sendSignInLinkToEmail,
	signInWithEmailLink,
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
				return userMatched;
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
	console.log("Kz: 🏈 ~ changePassword ~ auth.currentUser:", auth.currentUser);
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

const onSendEmailLink = async (email) => {
	try {
		localStorage.setItem("_e", email);
		await sendSignInLinkToEmail(auth, email, actionCodeSettings);
		return { status: 200 };
	} catch (error) {
		return error;
	}
};

const onSingInWithEmailLink = async (newPassword) => {
	try {
		const email = JSON.parse(localStorage.getItem("_e"));
		let res = await signInWithEmailLink(auth, email, window.location.href);
		if (res) {
			localStorage.removeItem("_e");
			try {
				return await changePassword(newPassword);
			} catch (error) {
				return error;
			}
		}
	} catch (error) {
		return error;
	}
};

const actionCodeSettings = {
	// URL you want to redirect back to. The domain (www.example.com) for this
	// URL must be in the authorized domains list in the Firebase Console.
	url: "http://localhost:3000/authentication/forgot-password",
	// This must be true.
	handleCodeInApp: true,
};

export {
	onSingOut,
	reAuthenticate,
	changePassword,
	GoogleProvider,
	onSendEmailLink,
	CredentialsProvider,
	onSingInWithEmailLink,
};
