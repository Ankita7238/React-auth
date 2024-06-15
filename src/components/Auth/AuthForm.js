import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [Loader, setLoader] = useState(false);
  const emailref= useRef()
  const passref=useRef()

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitFormHandler=(e)=>{
    e.preventDefault()
    const email=emailref.current.value
    const pass=passref.current.value
    if (isLogin)
      {

      }
    else
    {
      setLoader(true)
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCLq4pu1LKbMfHTsDOW8xJx1Y4F5Qk5kxY',
        {
          method:'POST',
          body:JSON.stringify({email:email,
            password:pass,
            returnSecureToken:true
          }),
          headers:{
            'Content-Type':'application/json'
          }
        }
      ).then(res=> {
        if(res.ok)
          {
            setLoader(false)
            console.log('signup')

          }
          else{
            setLoader(false)
            alert('Sign Up failed. User already exists.')
            res.json().then(data=>{console.log(data)})
          }
      }) 

    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form  onSubmit={submitFormHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailref} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            ref={passref}
            required
          />
        </div>
        <div className={classes.actions}>
          {Loader ? <p style={{color:'purple'}}>Sending Request....</p>  :<button>{isLogin? 'Login':'Create Account'}</button>}
          
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
