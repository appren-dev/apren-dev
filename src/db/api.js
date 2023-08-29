import { getDocs } from "firebase/firestore";
import { getCollection } from "./firebase/firebaseMethods";

const fetchData = (endpoint) => {
	const itemCollection = getCollection(endpoint);
	return getDocs(itemCollection);
};

const wrapPromise = (promise) => {
	let status = "Pending";
	let result;
	let error;
	let suspender = promise.then(
		(res) => {
			(status = "Success"), (result = res.docs.map((item) => ({ ...item.data(), uid: item.id })));
		},
		(err) => {
			(status = "Failed"), (error = err);
		},
	);

	return {
		read() {
			if (status === "Pending") {
				throw suspender;
			} else if (status === "Failed") {
				throw error;
			} else {
				return result;
			}
		},
	};
};

export const getData = (endpoint) => {
	const key = endpoint.split("/")[1];
	const newPromise = fetchData(endpoint);

	return {
		[key]: wrapPromise(newPromise),
	};
};
