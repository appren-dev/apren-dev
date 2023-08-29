import { Box, CardMedia, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { RiSecurePaymentFill, RiLogoutCircleRLine } from "react-icons/ri";
import { userMenu } from "config/loggedInUserMenu";
import avatar from "assets/no_user_pic.jpg";
import { BiSupport } from "react-icons/bi";
import React, { useState } from "react";
import { lang } from "lang/config";
import { useNavigate } from "react-router-dom";

const UserInfoComponent = ({ userImage }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const handleOpenPickerMenu = (event) => {
    event.stopPropagation();
    setAnchorElUser(event.currentTarget);
  };

  const handleClosePickerMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickPickerMenu = ({ id, path }) => {
    navigate(`/users/${id}/current-user/${path}`);
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0, display: { xs: "none", md: "block" } }}>
      <Box>
        <Tooltip title={lang.user_settings}>
          <IconButton onClick={handleOpenPickerMenu}>
            <CardMedia
              width={25}
              height={25}
              alt="logged_user"
              image={userImage || avatar}
              sx={{ borderRadius: "100%" }}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={Boolean(anchorElUser)}
        onClose={handleClosePickerMenu}
      >
        {userMenu.map(({ id, label, path }) => (
          <MenuItem
            key={id}
            onClick={() => handleClickPickerMenu({ id, path })}
          >
            <Typography textAlign="center">{label}</Typography>
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={() => handleClickPickerMenu({ id: 4, path: "payment-methods" })}>
          <ListItemIcon>
            <RiSecurePaymentFill size={20} />
          </ListItemIcon>
          {lang.payment_methods}
        </MenuItem>
        <MenuItem onClick={() => handleClickPickerMenu({ id: 5, path: "customer-support" })}>
          <ListItemIcon>
            <BiSupport size={20} />
          </ListItemIcon>
          {lang.customer_service}
        </MenuItem>
        <MenuItem onClick={() => alert("Signed out")}>
          <ListItemIcon>
            <RiLogoutCircleRLine size={20} />
          </ListItemIcon>
          {lang.logout}
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserInfoComponent;