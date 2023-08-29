import { Box, CardMedia, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { RiSecurePaymentFill, RiLogoutCircleRLine } from "react-icons/ri";
import { userMenu } from "config/loggedInUserMenu";
import { BiSupport } from "react-icons/bi";
import React, { useState } from "react";
import { lang } from "lang/config";
import { useNavigate } from "react-router-dom";
import { onSingOut } from "db/api/login";
import { Toast } from "utilities/ToastsHelper";
import { errorHandler } from "utilities/errorHandler";

const UserInfoComponent = ({ userImage, updateSession }) => {
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

  const onLogOut = async () => {
    try {
      await onSingOut();
      updateSession(null);
      return sessionStorage.removeItem("data");
    } catch (error) {
      const errorMessage = errorHandler(error);
      Toast.error(errorMessage);
    }
  };

  return (
    <Box sx={{ flexGrow: 0, display: { xs: "none", md: "block" } }}>
      <Box>
        <Tooltip title={lang.user_settings}>
          <IconButton onClick={handleOpenPickerMenu}>
            <CardMedia
              title="logged_user"
              image={userImage}
              sx={{
                borderRadius: "100%", width: 25,
                height: 25
              }}
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
            <Typography color="primary" textAlign="center">{label}</Typography>
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
        <MenuItem onClick={onLogOut}>
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