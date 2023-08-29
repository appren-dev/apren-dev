import { useState, useEffect } from "react";
import { onValue } from "firebase/database";

export const useRealtimeDatabase = (ref) => {
	const [data, setData] = useState(null);
	useEffect(() => {
		onValue(ref, (snapshot) => {
			const dt = snapshot.val();
			setData(dt);
		});
	}, []);

	return {
		data,
	};
};
