import React from 'react';
import Moment from 'react-moment';
import { Button, Divider } from '@mui/material';

import './OrderCard.css';

const OrderCard = (props) => {
  const { created, id, total } = props;

  return (
    <div className="order-card-container">
      <div className="order-card-header">
        <div className="order-card-header-row">
          <p className="order-card-header-title top">Order Placed</p>
          <p className="order-card-header-title top">Total</p>
          <p className="order-card-header-title top">{`Order # ${id}`}</p>
        </div>
        <div className="order-card-header-row">
          <p className="order-card-header-title bottom">
            <Moment format="LL">{created}</Moment>
          </p>
          <p className="order-card-header-title bottom">{`${total}`}</p>
          <p className="order-card-header-title bottom">example123@gmail.com</p>
          <div className="order-card-action-container">
            <p className="order-card-header-title bottom">Order Details</p>
            <Divider orientation="vertical" variant="middle" />
            <p className="order-card-header-title bottom">Invoice</p>
          </div>
        </div>
      </div>
      <Divider />
      <div className="order-card-content">
        <img
          className="order-card-content-img"
          src="https://m.media-amazon.com/images/I/61fTX5TjAEL._UL1001_.jpg"
          alt=""
        />
        <div className="order-card-content-info">
          <p>Item 1</p>
          <p>{`${total}`}</p>
        </div>
        <div className="order-card-content-action-container">
          <Button variant="contained" color="primary">
            Buy Again
          </Button>
        </div>
      </div>
      <Divider />
      <div className="order-card-footer"></div>
    </div>
  );
};

export default OrderCard;
