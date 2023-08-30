const ipApiUrl = "https://api.ipify.org?format=json";
export const getIP = async () => {
	try {
		const consult = await fetch(ipApiUrl);
		const { ip } = await consult.json();
		return ip;
	} catch (error) {
		return error;
	}
};
