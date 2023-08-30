import React, { useState } from "react";
import { CardMedia } from "@mui/material";
import { lang } from "lang/config";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { BiMenuAltRight } from "react-icons/bi";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import logo from "../assets/apren-dev_logo_no_bg.png";
import UserInfoComponent from "./UserInfoComponent";
import { getNavItems } from "config/navigationMenu";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { useNavigate, useLocation } from "react-router-dom";
import { CustomLink } from "styles/components/customLink";

const drawerWidth = 240;

const Navbar = (props) => {
  const { window } = props;
  const [session, setSession] = useState(JSON.parse(sessionStorage.getItem("data")));
  const { pathname } = useLocation();
  const [navItems] = getNavItems(session);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Box sx={{ margin: "15px 0px 8px 0px", display: "flex", justifyContent: "center" }}>
        <CardMedia
          image={logo}
          title="apren-dev"
          style={{ borderRadius: "8px", width: 80, height: 85 }}
        />
      </Box>
      <Divider />
      <List>
        {
          pathname !== "/" && (
            <ListItem disablePadding
              onClick={() => {
                navigate("/");
                handleDrawerToggle();
              }}>
              <ListItemButton sx={{ textAlign: "left", padding: "20px 10px" }}>
                <ListItemText primary={"Home"} />
              </ListItemButton>
            </ListItem>
          )
        }
        {navItems.map(({ id, label, path }) => (
          <ListItem
            key={id}
            disablePadding
            onClick={() => { navigate(path); handleDrawerToggle(); }}
            sx={{ borderLeft: pathname === path ? "3px solid #20bac2" : "none" }}>
            <ListItemButton selected={pathname === path} sx={{ textAlign: "left", padding: "20px 10px" }}>
              <ListItemText
                primary={label}
                sx={pathname === path ?
                  { color: "#20bac2" } :
                  { color: "white" }
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
        {
          session !== null && (
            <ListItem disablePadding onClick={() => navigate("/users/jaidervanegas/current-user/edit-profile")}>
              <ListItemButton sx={{ textAlign: "left", padding: "20px 10px" }}>
                <ListItemText primary={lang.user_settings} sx={{ color: "#20bac2" }} />
              </ListItemButton>
            </ListItem>
          )
        }
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", mb: 8 }}>
      <AppBar component="nav" sx={{ backgroundImage: "none" }}>
        <Toolbar>
          <Box sx={{ margin: "10px 0px 5px 0px", cursor: "pointer" }} onClick={() => navigate("/")}>
            <CardMedia
              image={logo}
              title="apren-dev"
              style={{ borderRadius: "8px", width: 80, height: 85 }}
            />
          </Box>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, visibility: "hidden" }}
          >
            {lang.app_title}
          </Typography>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            {navItems.map((item) => (
              <CustomLink
                key={item.id}
                href={item.path}
                color={pathname === item.path ? "#20bac2" : "white"}
              >
                {item.label}
              </CustomLink>
            ))}
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <BiMenuAltRight color={"white"} size={30} />
          </IconButton>
          {
            session && (
              <UserInfoComponent
                id="1"
                userImage={session?.image}
                updateSession={setSession}
              />
            )
          }
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ backgroundImage: "none", }}>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
          sx={{
            backgroundImage: "none",
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              opacity: "1",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Navbar;
