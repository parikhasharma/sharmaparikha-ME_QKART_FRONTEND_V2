import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./Header.css";

const Header = ({ children, hasHiddenAuthButtons }) => {
    const history = useHistory();
    const logout = () => {
      localStorage.removeItem("username")
      localStorage.removeItem("token")
      localStorage.removeItem("balance")
      history.push("/")
      window.location.reload()
    }

    const username = localStorage.getItem("username")

    let searchBox = <Box></Box>
    
    if (!hasHiddenAuthButtons){
      searchBox = children
    }

    let headerButton = <Button></Button>;

    if (hasHiddenAuthButtons){
      headerButton = <Button onClick={()=>{history.push("/", {})}}
        name="back to explore"
        startIcon={<ArrowBackIcon />}
        variant="text"
        >
        Back to explore
      </Button>
    }
    else if (username){
      headerButton = <Stack direction="row" spacing={1} alignItems="center">
        <Avatar alt={username} src="avatar.png" />
        <p>{username}</p>
        {/* <p>{username.charAt(0).toUpperCase() + username.slice(1)}</p> */}
        <Button onClick={logout} variant="text">LOGOUT</Button>
      </Stack>
    }
    else {
      headerButton = <Stack direction="row" spacing={1} alignItems="center">
        <Button onClick={()=>{history.push("/login", {})}}  variant="text">LOGIN</Button>
        <Button onClick={()=>{history.push("/register", {})}} variant="contained">REGISTER</Button>
      </Stack>
    }

   
    return (
      <Box className="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        {searchBox}
        {headerButton}
        {/* <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
        >
          Back to explore
        </Button> */}
      </Box>
    );
};

export default Header;
