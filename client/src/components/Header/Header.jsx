import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Badge,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  return (
    <AppBar sx={{ flexGrow: 1 }} position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography sx={{ flexGrow: 1 }} variant="h6">
          Zee's Clothing
        </Typography>
        <div className="links">
          {!isAuthenticated && (
            <Button color="inherit" component={Link} to={`/login`}>
              Login
            </Button>
          )}
          {isAuthenticated && (
            <Button color="inherit" component={Link} to={`/orders`}>
              Orders
            </Button>
          )}
          <IconButton
            aria-label="shopping cart"
            color="inherit"
            component={Link}
            to="/cart"
          >
            <Badge badgeContent={items?.length || 0} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
