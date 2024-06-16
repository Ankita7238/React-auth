import { Link, useNavigate } from 'react-router-dom';
import {useContext } from 'react';
import classes from './MainNavigation.module.css';
import AuthContext from '../../store/auth-context';

const MainNavigation = () => {
  const navigate = useNavigate()
  const authctx=useContext(AuthContext)
  const isLoggedIn=authctx.isLoggedIn
  const handlelogout=()=>{
    authctx.logout()
    navigate('/auth')
  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {
            !isLoggedIn && 
            <>
              <li> <Link to='/auth'>Login</Link> </li>
            </>
          }
          {
            isLoggedIn &&
            <>
              <li><Link to='/profile'>Profile</Link></li>
              <li><button onClick={handlelogout}>Logout</button></li> 
            </>   
          }  
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
