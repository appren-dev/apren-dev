import navigationText from "./text/navigationMenus.json";
import changePassword from "./text/changePassword.json";
import dashboardText from "./text/dashboard.json";
import loginText from "./text/login.json";
import status from "./text/status.json";
import registration from "./text/registration.json"

export const lang = {
	...dashboardText,
	...loginText,
	...navigationText,
	...changePassword,
	...status,
	...registration
};
