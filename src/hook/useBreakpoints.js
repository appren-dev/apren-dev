import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export const useBreakpoints = (breakpoint) => {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down(breakpoint));

	return { [breakpoint]: matches };
};
