import { doc, setDoc } from "@firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const registrationDB = async ( data) => {
	try {
		return await setDoc(doc( db, "registered_users", data.id ) , data  );
	} catch (err) {
		return err;
	}
};
