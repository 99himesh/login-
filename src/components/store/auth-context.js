import React,{useEffect, useState} from "react";

const AuthContext=React.createContext({
    token:'',
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{}
});

 export const AuthContextProvider=(props)=>{
  const[token,setToken]=useState(null);

  const userISLoggedIn=!!token;

  const loginHandler=(token)=>{
    setToken(token);
  }
  const logoutHAndler=  ()=>{
    setToken(null);
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