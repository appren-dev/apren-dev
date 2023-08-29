import { setDoc, doc, collection, updateDoc, getDocs, getDoc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { app, db, realTimeDb, realTimeDbRef } from "./firebaseConfig";

import { set } from "firebase/database";

//Upload Picture to Media Bucket
const storage = getStorage(app);

export const uploadPdf = async (file, name) => {
	const documentRef = ref(storage, name);
	const result = await uploadBytes(documentRef, file);
	return result;
};

export const getCollection = (endpoint) => collection(db, endpoint);

const clientsCollection = getCollection("clients");
export const addClient = (documentTitle, newCollection) => setDoc(doc(clientsCollection, documentTitle), newCollection);

//const billsCollection = getCollection("facturas");
export const addBill = (billsCollection, documentTitle, newCollection) =>
	setDoc(doc(billsCollection, documentTitle), newCollection);

// export const updateCounter = (counterCollection, newCollection) =>
// 	setDoc(doc(counterCollection, ""), newCollection);

const importBillsCollection = getCollection("importe");
export const importBills = (documentTitle, newCollection) =>
	setDoc(doc(importBillsCollection, documentTitle), newCollection);

const albaranCollection = getCollection("albaran");
export const addAlbaran = (documentTitle, newAlbaran) => setDoc(doc(albaranCollection, documentTitle), newAlbaran);
export const updateById = (url, id, data) => {
	const urlReference = doc(db, url, id);
	updateDoc(urlReference, data);
};

// instance of Auth

export const updateInfo = async () => {
	const itemCollection = getCollection("clients");
	let data;
	getDocs(itemCollection).then((res) => {
		data = res.docs.map((item) => ({ ...item.data(), uid: item.id }));
	});

	return data;
};

export const getNotifications = realTimeDbRef(realTimeDb, "/notifications");
export const addNotification = (data) => {
	try {
		set(getNotifications, data);
		const success = "Notificación agregado exitosamente";
		return success;
	} catch (error) {
		const failure = error;
		return failure;
	}
};

export const getById = async ({ name, id }) => {
	const ref = doc(collection(db, name), id);
	try {
		const result = await getDoc(ref);
		const values = await result.data();
		return values;
	} catch (error) {
		return error;
	}
};

export const onDelete = async (endpoint, id) => {
	let result;
	try {
		await deleteDoc(doc(db, endpoint, id));
		result = "El document ha sido eliminado con éxito";
		return result;
	} catch (error) {
		throw new Error(error);
	}
};
