import EuroRoundedIcon from "@mui/icons-material/EuroRounded";
import DvrIcon from "@mui/icons-material/Dvr";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { FcKindle, FcSurvey } from "react-icons/fc";
import { GiArchiveRegister } from "react-icons/gi";
import { MdHistoryEdu } from "react-icons/md";
import { BsPatchCheckFill } from "react-icons/bs";
import { BiGitPullRequest } from "react-icons/bi";

export const menuList = [
	{ id: "facturas", label: "Facturación", Icon: EuroRoundedIcon },
	{ id: "historial-facturas", label: "Facturas", Icon: DvrIcon },
	{ id: "acceso", label: "Acceso", Icon: HowToRegIcon },
	{ id: "albaran", label: "Albarán", Icon: FcKindle },
	{ id: "historial-albaran", label: "Albaranes", Icon: MdHistoryEdu },
	{ id: "presupuesto", label: "Presupuesto", Icon: FcSurvey },
	{ id: "historial-presupuesto", label: "Presupuestos", Icon: GiArchiveRegister },
	{ id: "historial-contratos", label: "Contratos", Icon: BsPatchCheckFill },
	{ id: "historial-orden", label: "Ordenes", Icon: BiGitPullRequest },
];
