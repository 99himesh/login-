import classes from './ProfileForm.module.css';
import React,{use, useRef,useContext} from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../store/auth-context';
const ProfileForm = () => {
  // const history=useHistory();
  // const newPAsswordInputRef=useRef();
  // const authCtx=useContext(AuthContext);


  // const submitHandler=async(event)=>{
  //   event.preventDefault();
  //   const enteredPassword=newPAsswordInputRef.current.value;
  // try{ const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBNaFxMUVaVQ2X9zRymvFzhR4tfPiQfJeM',{
  //     method:'POST',
  //     mode: 'no-cors',
  //     body:JSON.stringify({
  //        idToken:authCtx.token,
  //        password:enteredPassword,
  //        returnSecureToken:true
  //     }),
  //     headers:{
  //         'Context-Type':'application.json'
  //     }
    
  //   }) 
  // }catch{
     
  //     alert('error')
  //   }
  //   history.replace('/');
  // }
  const newPasswordRef = useRef('');
  const ctx = useContext(AuthContext);
  const history = useHistory();

  const submitHandler =(e) =>{
    e.preventDefault();

    const newPassword = newPasswordRef.current.value;
    //Password validation

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBNaFxMUVaVQ2X9zRymvFzhR4tfPiQfJeM', {
      method: 'POST',
      body: JSON.stringify({
        idToken: ctx.token,
        password: newPassword,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application.json'
      }
    }).then((res) => {
      history.replace('/');
    })
  }

  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password'  ref={newPasswordRef} id='new-password' />
      </div>
      <div className={classes.action}>
        <button onSubmit={submitHandler}>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
