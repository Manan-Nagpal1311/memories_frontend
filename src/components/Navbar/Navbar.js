import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import {AppBar,Button,Toolbar,Typography,Avatar} from '@material-ui/core';
import useStyles from './styles';
import decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {useLocation} from "react-router-dom";
import memories from '../../images/memories.png';

const Navbar = ()=>{
    const classes=useStyles();
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));
    // console.log(user);
    const dispatch = useDispatch();
    const history=useNavigate();
    const location = useLocation();

    const logout=()=>{
        dispatch({type:'LOGOUT'});
        history('/');
        setUser(null);
    }
    useEffect(()=>{
        const token=user?.token;
        //JWT...
        if(token)
        {
            const decodedToken=decode(token);
            if(decodedToken.exp*1000<new Date().getTime())
            {
                logout();
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location,user]);
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
        <Typography  component={Link} to="/" className={classes.heading} variant='h2' align='center'>
          Memories
        </Typography>
        <img classes={classes.image} src={memories} alt="memories" height="60"></img>
        </div>
        <Toolbar className={classes.toolbar}>
            { user ?(
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                        {user.result.name.charAt(0)}
                    </Avatar>
                    <Typography className={classes.userName} variant="h6" >
                        {user.result.name}
                    </Typography>
                    <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>
                        Logout
                    </Button>
                </div>
            ):(
            <Button component={Link} to="/auth" variant="contained" color="primary"> 
            SignIn
          </Button>
          )
            }
        </Toolbar>
      </AppBar>
    )
}
export default Navbar;