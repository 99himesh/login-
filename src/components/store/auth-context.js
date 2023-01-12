import React,{useEffect, useState} from "react";

const AuthContext=React.createContext({
    token:'',
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{}
});

 export const AuthContextProvider=(props)=>{
  let initialtoken=localStorage.getItem('token');
  const[token,setToken]=useState(initialtoken);

  const userISLoggedIn=!!token;

  const loginHandler=(token)=>{
    setToken(token);
    localStorage.setItem('token',token)
  }
  const logoutHAndler=  ()=>{
    setToken(null);
    localStorage.removeItem('token,token')
  }
  useEffect(()=>{
    console.log(token);
  })
  const contextValue={
    token:token,
    isLoggedIn:userISLoggedIn,
    login:loginHandler,
    logout:loginHandler
  }

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext;