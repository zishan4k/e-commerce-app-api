import React from 'react';
import MuiTextField from '@mui/material/TextField';
import { useField } from 'formik';

import './TextField.css';

const TextField = (props) => {
  const { name, ...rest } = props;
  const [field, { error }] = useField({ name, type: name });
  return (
    <MuiTextField
      {...field}
      {...rest}
      error={!!error}
      helperText={error}
      variant="outlined"
    />
  );
};

export default TextField;
