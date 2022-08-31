import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../store/auth/Auth.actions';
import { Form, Formik } from 'formik';
import Button from '../../components/Button/Button';
import TextField from '../../components/TextField/TextField';

import * as yup from 'yup';

import './Register.css';
import { Divider } from '@mui/material';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegistration = async (credentials) => {
    try {
      setIsLoading(true);
      await dispatch(registerUser(credentials));
      setIsLoading(false);
      navigate('/');
    } catch (err) {
      setIsLoading(false);
    }
  };

  const registerSchema = yup.object().shape({
    email: yup
      .string()
      .email('Invalid email address')
      .required('Email address is required'),
    password: yup.string().required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });

  return (
    <div className="app">
      <div className="formComp">
        <div className="formWrapper">
          <Formik
            initialValues={{ email: '', password: '', confirmPassword: '' }}
            validationSchema={registerSchema}
            validateOnBlur
            onSubmit={async (data) => {
              const { confirmPassword, ...credentials } = data;
              await handleRegistration(credentials);
            }}
          >
            <Form className="baseForm">
              <header className="baseFormHeader">
                <h1 className="baseFormHeading">Register</h1>
              </header>
              <TextField label="Email" name="email" id="email-input" />
              <TextField
                label="Password"
                name="password"
                id="password-input"
                type="password"
              />
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                id="confirm-password-input"
                type="password"
              />
              {error && <div>{error}</div>}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                isLoading={isLoading}
              >
                Submit
              </Button>
              <Divider />
              <div>
                <p>Register with</p>
              </div>
              <div className="social-btn-container">
                <Button variant="contained" className="facebook-btn">
                  Facebook
                </Button>
                <Button variant="contained" className="google-btn">
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

export default Register;
