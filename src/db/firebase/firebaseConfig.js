import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getEnvVariables } from "./getEnv";
import { getDatabase, ref } from "firebase/database";

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
