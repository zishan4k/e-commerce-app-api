import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../store/auth/Auth.actions";

import * as yup from "yup";

import "./Login.css";
import { Formik, Form } from "formik";
import TextField from "../../components/TextField/TextField";
import Button from "../../components/Button/Button";
import { Divider } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  //login handler
  const handleLogin = async (credentials) => {
    try {
      setIsLoading(true);
      await dispatch(loginUser(credentials));
      setIsLoading(false);
      navigate("/");
    } catch (err) {
      setIsLoading(false);
    }
  };

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email address is required"),

    password: yup.string().required("Password is required"),
  });

  return (
    <div className="app">
      <div className="formComp">
        <div className="formWrapper">
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            validateOnBlur
            onSubmit={async (values) => {
              const { email, password } = values;
              await handleLogin({ username: email, password });
            }}
          >
            <Form className="baseForm">
              <header className="baseFormHeader">
                <h1 className="baseFormHeading">Log in</h1>
              </header>
              <TextField label="Email" name="email" id="email-input" />
              <TextField label="Password" name="password" id="password-input" />
              {error && <div>{error}</div>}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                isLoading={isLoading}
              >
                Submit
              </Button>
              <p>Forgotten your password?</p>
              <Divider />
              <div className="signIn">
                <p>Sign in with</p>
              </div>
              <div className="social-btn-container">
                <Button
                  variant="contained"
                  className="facebook-btn"
                  href="api/auth/facebook"
                >
                  Facebook
                </Button>
                <Button
                  variant="contained"
                  className="google-btn"
                  href="/api/auth/google"
                >
                  Google
                </Button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
