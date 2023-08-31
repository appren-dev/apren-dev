import React from "react";
import { Box, Grid, TextField, Typography, Checkbox } from "@mui/material";
import { CustomButton, GoogleButton } from "styles/components/authcomponents";
import CustomLoadingButton from "components/loadingButton";
import { PasswordInput } from "components/password/Password";
import { FcGoogle } from "react-icons/fc";
import { useLogin } from "./useLogin";

const Login = () => {
  const { loading, credentials, handleChange, handleSubmit, invalidFields, setCredentials, handleGoogleSigning } = useLogin();
  return (
    <Grid
      container
      spacing={1}
      component="form"
      onSubmit={(e) => handleSubmit(e)}
    >
      <Grid xs={12} marginBottom={2} item>
        <Typography variant="h4" fontWeight={"bolder"}>
          Log in
        </Typography>
      </Grid >
      <Grid xs={12} marginBottom={2} item>
        <TextField
          size="small"
          name="email"
          label="Email"
          sx={{ width: "100%" }}
          onChange={handleChange}
          value={credentials.email}
          error={invalidFields?.email}
        />
      </Grid>
      <Grid xs={12} marginBottom={2} item>
        {
          credentials.showPassword ? (
            <PasswordInput
              name="password"
              onChange={handleChange}
              value={credentials.password}
              error={invalidFields?.password}
            />
          ) : (
            <TextField
              size="small"
              name="password"
              type="password"
              label="Password"
              sx={{ width: "100%" }}
              onChange={handleChange}
              value={credentials.password}
              error={invalidFields?.password}
            />
          )
        }
      </Grid>
      <Grid xs={12} marginBottom={2} item>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Checkbox
              checked={credentials.rememberMe}
              onChange={() => setCredentials(prevState => ({ ...prevState, rememberMe: !prevState.rememberMe }))}
              sx={{
                color: "white",
                "&.Mui-checked": {
                  color: "primary.secondary",
                },
              }}
            />
            <Typography variant="caption" color="secondary">Recordarme</Typography>
          </Box>
          <Typography
            variant="caption"
            color="primary.secondary"
            sx={{
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline"
              }
            }}
          >
            Olvidé mi contraseña
          </Typography>
        </Box>
      </Grid>
      <Grid xs={12} marginBottom={2} item>
        {
          loading.credentialSigning ? (
            <CustomLoadingButton
              loadingMessage="Iniciando Sesión"
            />
          ) : (
            <CustomButton type="submit">
              Iniciar sesión
            </CustomButton>
          )
        }

      </Grid>
      <Grid xs={12} marginBottom={2} item>
        <Box sx={{ width: "100%", border: "0.05px solid #e2e2e2" }} />
      </Grid>
      <Grid xs={12} marginBottom={2} item>
        {
          loading.googleSigning.status ? (
            <CustomLoadingButton
              loadingMessage={loading.googleSigning.message}
            />
          ) : (
            <GoogleButton type="button" onClick={handleGoogleSigning}>
              <FcGoogle size={50} />Iniciar sesión con Google
            </GoogleButton>
          )
        }
      </Grid>
      <Grid xs={12} marginBottom={2} item>
        <Typography
          variant="subtitle"
          sx={{
            color: "primary.main",
            cursor: "pointer",
            "&:hover": {
              color: "primary.secondary",
              textDecoration: "underline"
            }
          }}
        >
          ¿Aún no tienes cuenta?
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Login;