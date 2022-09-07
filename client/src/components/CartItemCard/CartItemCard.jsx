import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeItem } from '../../store/carts/Carts.actions';
import Incrementer from '../Incrementer/Incrementer';
import { Divider, Typography } from '@mui/material';
import './CartItemCard.css';

const CartItemCard = (props) => {
  console.log(props);
  const { cartItemId, description, id, image, name, price, quantity } = props;

  const [qty, setQty] = useState(quantity);

  const dispatch = useDispatch();

  const handleIncrement = () => {
    setQty(qty + 1);
  };

  const handleDecrement = () => {
    if (qty === 1) {
      return;
    }
    setQty(qty - 1);
  };

  const remove = async () => {
    await dispatch(removeItem(cartItemId));
  };

  return (
    <>
      <div className="cart-item-container">
        <div className="cart-item-details">
          <img
            src={image}
            alt=""
            style={{ height: '100%', paddingRight: '10px' }}
          />
          <p>{name}</p>
          <p>{price}</p>
        </div>
        <div className="cart-item-interact">
          <Incrementer
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            value={qty}
          />
          <Typography onClick={remove}>Remove</Typography>
        </div>
        <div className="cart-item-price">
          <p>{price * quantity}</p>
        </div>
      </div>
      <Divider />
    </>
  );
};

export default CartItemCard;
