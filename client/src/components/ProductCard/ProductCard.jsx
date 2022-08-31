import React from 'react';
import MuiButton from '@mui/material/Button';
import { Link } from 'react-router-dom';

import './ProductCard.css';

const ProductCard = (props) => {
  const { data } = props;
  return (
    <div className="grid-item">
      <img
        src="https://elcopcbonline.com/photos/product/4/176/4.jpg"
        alt=""
        className="product-cart-img"
      />
      <div className="product-card-info-container">
        <div className="product-card-info">
          <p>{data.name}</p>
          <p>{data.price}</p>
        </div>
        <MuiButton
          variant="outlined"
          color="primary"
          component={Link}
          to={`/products/${data.id}`}
        >
          View
        </MuiButton>
      </div>
    </div>
  );
};

export default ProductCard;
