import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadProduct } from '../../store/products/Products.actions';
import { addItem } from '../../store/carts/Carts.actions';
import Incrementer from '../../components/Incrementer/Incrementer';
import { Button, Typography } from '@mui/material';

import './ProductDetails.css';

const ProductDetails = () => {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.users);
  const product = products[productId];

  useEffect(() => {
    if (!products[productId]) {
      (async function load() {
        await dispatch(loadProduct(productId));
      })();
    }
  }, [dispatch, products, productId]);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity === 1) {
      return;
    }
    setQuantity(quantity - 1);
  };

  const handleAddToCart = async () => {
    if (!user.id) {
      navigate(`/login`);
    } else {
      await dispatch(addItem({ product, quantity, user }));
    }
  };

  return (
    <section className="product-details-container">
      <div className="product-img-container">
        <div className="product-img">
          <img src={product.image} alt="" className="img" />
        </div>
      </div>
      <div className="product-info-container">
        {product && (
          <>
            <Typography variant="h3">{product?.name}</Typography>
            <Typography variant="h6">{product?.description}</Typography>
            <Typography variant="h6">{product?.price}</Typography>
            <Incrementer
              onDecrement={handleDecrement}
              onIncrement={handleIncrement}
              value={quantity}
            />
            <Button type="contained" color="primary" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
