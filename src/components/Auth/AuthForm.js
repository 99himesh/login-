import { useState,useRef,useContext } from 'react';
import AuthContext from '../store/auth-context';

import classes from './AuthForm.module.css';

const AuthForm = (props) => {
  const [isLogin, setIsLogin] = useState(true);
   const [isLading,setIsLoading]=useState(false)
  const emailInputRef=useRef('');
  const passwordInputRef=useRef('');
  const Authctx=useContext(AuthContext)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHAndler=(event)=>{
  event.preventDefault();
  const enteredEmail=emailInputRef.current.value;
  const enteredPassword=passwordInputRef.current.value;
  setIsLoading(true);
  let url;

  if(isLogin){
   url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBNaFxMUVaVQ2X9zRymvFzhR4tfPiQfJeM'
  }
  else{
    url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBNaFxMUVaVQ2X9zRymvFzhR4tfPiQfJeM'
  }
    fetch(url,{
      method:'POST',
      body:JSON.stringify({
        email:enteredEmail,
        password:enteredPassword,
        returnSecureToken:true

      }),
      headers:{
        'content-type':'application/json'
      }
    } 
   
    ).then((res )=>{ 
      setIsLoading(false);
        if(res.ok){
          res.json().then((data)=>{
            console.log(data);
            Authctx.login(data.idToken)
          })
        //  return res.json();
        }else{
          res.json().then((data)=>{
            let errorMessage='Authentication Failed';

            if(data && data.error&& data.error.message){
              errorMessage=data.error.message;
            }
            alert(errorMessage);
            throw new Error(errorMessage)
          })
         
            
       
          .catch((err)=>{
            alert(err.message);
          })
        }

      })
  }
 
  
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHAndler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' ref={passwordInputRef} id='password' required />
        </div>
        <div className={classes.actions}>
         {!isLading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
         {isLading && <p style={{color:'white'}}>Sending request</p>}
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