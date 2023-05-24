import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Hidden } from "@mui/material";
import Layout from "./Navbar/Layout";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import BACKEND_URL from "../config.js";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Everlastings
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const btnstyles = {
  backgroundColor: "#ef4b3f", // replace with your desired color
  color: "white",
  fontWeight: "bold",
  fontSize: "24px",
};

export default function Login() {
  const navigation = useNavigate();

  const initialValues = {
    email: "",
    password: "",
    remember: false,
  };

  const handleSubmit = (values, props) => {
    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 2000);
    const login = async () => {
      const resData = await axios.post(`${BACKEND_URL}/user/login`, {
        email: values.email,
        password: values.password,
      });
      console.log(resData.data.status);
      if (resData.data.status === 400) {
        alert(resData.data.message);
      } else {
        localStorage.setItem("token", resData.data.message);
        navigation("/Dashboard");
      }
    };
    login();
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("*Your email is Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("*Password is Required"),
  });

  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={6}
            md={8}
            sx={{
              backgroundImage:
                "url(https://images-ext-2.discordapp.net/external/bT6V0jwFFVR_6YUYExqatSt6wCGOIurJpxANr26SGkM/%3Fixlib%3Drb-4.0.3%26ixid%3DMnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8%26auto%3Dformat%26fit%3Dcrop%26w%3D1770%26q%3D80/https/images.unsplash.com/photo-1477332552946-cfb384aeaf1c?width=1620&height=1080)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 16,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src="./src/images/logot.png" width={40} />
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                {(props) => (
                  <Form style={{ width: "90%" }}>
                    {/* {console.log(props)} */}
                    <Field
                      as={TextField}
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      helperText={<ErrorMessage name="email" />}
                      error={props.touched.email && Boolean(props.errors.email)}
                      sx={{
                        "& fieldset": {
                          border:
                            props.touched.email && !props.errors.email
                              ? "2px green solid"
                              : undefined,
                        },
                      }}
                    />
                    <Field
                      as={TextField}
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      helperText={<ErrorMessage name="password" />}
                      error={
                        props.touched.password && Boolean(props.errors.password)
                      }
                      sx={{
                        "& fieldset": {
                          border:
                            props.touched.password && !props.errors.password
                              ? "2px green solid"
                              : undefined,
                        },
                      }}
                    />
                    {/* <Field
                      as={FormControlLabel}
                      name="remember"
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    /> */}
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={props.isSubmitting}
                      sx={{ mt: 3, mb: 2 }}
                      style={btnstyles}
                    >
                      {props.isSubmitting ? "Loading" : "Sign In"}
                    </Button>
                  </Form>
                )}
              </Formik>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link href="/RegisterForm" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
            {/* </Box> */}
          </Grid>
          <Grid
            item
            xs={false}
            sm={false}
            md={8}
            sx={{
              position: "absolute",
              color: "#ffffff",
              textShadow: "1px 1px #000000",
              display: { xs: "none", sm: "block" },
              backgroundColor: "rgba(210, 210, 210, 0.3)",
              backdropFilter: "blur(1px)",
              padding: "15px",
              width: "50%",
              height: "auto",
              top: "25%",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                marginBottom: "10px",
                fontSize: { sm: "2.5rem", md: "3.55rem", lg: "5rem" },
                fontWeight: 900,
                textAlign: "left",
                width: "100%",
              }}
            >
              Stay Active
            </Typography>
            <Typography
              variant="h2"
              sx={{
                marginBottom: "10px",
                fontSize: { sm: "2.5rem", md: "3.55rem", lg: "5rem" },
                fontWeight: 900,
                textAlign: "left",
                width: "100%",
              }}
            >
              Stay Independent
            </Typography>
            <Typography
              variant="h2"
              sx={{
                marginBottom: "10px",
                fontSize: { sm: "2.5rem", md: "3.55rem", lg: "5rem" },
                fontWeight: 900,
                textAlign: "left",
                width: "100%",
              }}
            >
              That never ends
            </Typography>
          </Grid>
        </Grid>
      </ThemeProvider>  
    </Layout>
  );
}