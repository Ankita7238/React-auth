import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';
import { useNavigate } from 'react-router-dom';
import { useRef,useContext } from 'react';
const ProfileForm = () => {
  const navigate= useNavigate()
  const newpassref=useRef()
  const authctx=useContext(AuthContext)
  const submitFormHandler=(e)=>
    {
      e.preventDefault()
      const newpass=newpassref.current.value
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCLq4pu1LKbMfHTsDOW8xJx1Y4F5Qk5kxY',
        {
          method:'POST',
          body:JSON.stringify({idToken:authctx.token,
            password:newpass,
            returnSecureToken:true
          }),
          headers:{
            'Content-Type':'application/json'
          }
        } 
      ).then(res=>{
        if(res.ok){
          navigate('/')
          console.log('changed pass')
        }
          
        else
         console.log('error occured in change pass')

      })
    }
  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newpassref}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
