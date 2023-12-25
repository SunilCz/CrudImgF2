import React from 'react';
import { AppBar, Box, Button, IconButton, Toolbar, useMediaQuery } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import { Menu as MenuIcon } from "@mui/icons-material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigator = useNavigate(); // Using useNavigate to get the navigation function
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isNonMobileDevice = useMediaQuery("(min-width: 1000px)");

  const handleHomeClick = () => {
    window.location.reload();
    handleClose();
  };

  const handleCreateClick = () => {
    navigator('/create'); // Navigating to the /create path
    handleClose();
  };

  return (
    <AppBar sx={{ p: "0 5%" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <h3>CRUD</h3>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          {isNonMobileDevice ? (
            <>
              <Button onClick={handleHomeClick}>
                <Link style={{ color: "#fff", textDecoration: "none" }} to={"/"}>
                  Home
                </Link>
              </Button>
              <Button onClick={handleCreateClick}>
                <Link style={{ color: "#fff", textDecoration: "none" }} to={"/create"}>
                  Create
                </Link>
              </Button>
            </>
          ) : (
            <>
              <IconButton
                sx={{ color: "#fff" }}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem key="home" onClick={handleHomeClick}>
                  <Link style={{ color: "#333", textDecoration: "none" }} to={"/"}>
                    Home
                  </Link>
                </MenuItem>
                <MenuItem key="create" onClick={handleCreateClick}>
                  <Link style={{ color: "#333", textDecoration: "none" }} to={"/create"}>
                    Create
                  </Link>
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
