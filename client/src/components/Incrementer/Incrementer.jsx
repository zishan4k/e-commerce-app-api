import React from 'react';
import { IconButton, TextField } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Incrementer = (props) => {
  const { value, onDecrement, onIncrement } = props;
  return (
    <div>
      <IconButton aria-label="remove from shopping cart" onClick={onDecrement}>
        <RemoveCircleIcon />
      </IconButton>
      <TextField
        variant="outlined"
        className="incrementer-text-field"
        value={value}
      />
      <IconButton aria-label="add to shopping cart" onClick={onIncrement}>
        <AddCircleIcon />
      </IconButton>
    </div>
  );
};

export default Incrementer;
