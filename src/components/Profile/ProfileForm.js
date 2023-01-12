import classes from './ProfileForm.module.css';
import React,{use, useRef,useContext} from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../store/auth-context';
const ProfileForm = () => {
  const history=useHistory();
  const newPAsswordInputRef=useRef();
  const authCtx=useContext(AuthContext);
  const submitHandler=async(event)=>{
    event.preventDefault();
    const enteredPassword=newPAsswordInputRef.current.value;
  try{ const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBNaFxMUVaVQ2X9zRymvFzhR4tfPiQfJeM',{
      method:'POST',
      body:JSON.strigify({
         idToken:authCtx.token,
         password:enteredPassword,
         returnSecureToken:false
      }),
      headers:{
        'context-type':'application/json()'
      }
    
    }) 
  }catch{
     
      alert('error')
    }
    history.replace('/');
  }

  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password'  id='new-password' />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
