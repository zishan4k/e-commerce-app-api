import React from 'react';
import MuiButton from '@mui/material/Button';
import { Link } from 'react-router-dom';

import './ProductCard.css';

const ProductCard = (props) => {
  const { data } = props;
  return (
    <div className="grid-item">
      <img src={data.image} alt="" className="product-cart-img" />
      <div className="product-card-info-container">
        <div className="product-card-info">
          <p>{data.name}</p>
          <p>{data.price}</p>
        </div>
        <div className="view-btn">
          <MuiButton
            variant="outlined"
            color="primary"
            component={Link}
            to={`/products/${data.id}`}
            sx={{
              height: '30px',
              border: 'none',
              backgroundColor: '#1976d2',
              color: 'white',
            }}
          >
            <b>View</b>
          </MuiButton>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
