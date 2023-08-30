import { getDatabase, ref } from "firebase/database";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getEnvVariables } from "./getEnv";

const { apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId, appId } = getEnvVariables();

const firebaseConfig = {
	apiKey,
	authDomain,
	databaseURL,
	projectId,
	storageBucket,
	messagingSenderId,
	appId,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const realTimeDb = getDatabase();
export const realTimeDbRef = ref;

export const getById = async ({ name, id }) => {
	const ref = doc(collection(db, name), id);
	try {
		const result = await getDoc(ref);
		const values = result.data();
		return values;
	} catch (error) {
		return error;
	}
};
