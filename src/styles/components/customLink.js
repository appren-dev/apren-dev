import { styled } from "@mui/material";

export const CustomLink = styled("a")((props) => ({
	textDecoration: "none",
	padding: "10px",
	color: props.color,
	fontWeight: props.color === "white" ? "normal" : "400",
	"&:hover": {
		color: "#20bac2",
		fontWeight: "400",
	},
}));

// `
//   text-decoration: none;
//   padding: 10px;
//   color: white;
//   &:hover {
//     color: #20bac2;
//     font-weight: 400;
//   }
// `;
