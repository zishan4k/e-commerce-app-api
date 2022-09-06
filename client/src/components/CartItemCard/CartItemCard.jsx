import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeItem } from '../../store/cart/Cart.actions';
import Incrementer from '../Incrementer/Incrementer';
import { Divider, Typography } from '@mui/material';
import './CartItemCard.css';

const CartItemCard = (props) => {
  const { cartItemId, name, price, qty } = props;

  const [quantity, setQuantity] = useState(qty);

  const dispatch = useDispatch();

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity === 1) {
      return;
    }
    setQuantity(quantity - 1);
  };

  const remove = async () => {
    await dispatch(removeItem(cartItemId));
  };

  return (
    <>
      <div className="cart-item-container">
        <div className="cart-item-details">
          <img
            src="https://m.media-amazon.com/images/I/61fTX5TjAEL._UL1001_.jpg"
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
            value={quantity}
          />
          <Typography onClick={remove}>Remove</Typography>
        </div>
        <div className="cart-item-price">
          <p>{price * qty}</p>
        </div>
      </div>
      <Divider />
    </>
  );
};

export default CartItemCard;
