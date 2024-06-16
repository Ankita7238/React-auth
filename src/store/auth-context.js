import React, {useState, useEffect} from "react"
const AuthContext = React.createContext(
    {
       token:'',
       isLoggedIn:false,
       login:(token)=>{},
       logout:()=>{} 
    }
)
export const AuthContextProvider =(props)=>{
    const initialtoken=localStorage.getItem('token') 
    const[token,setToken]=useState(initialtoken)
    const userIsLoggedIn =!!token 

    useEffect(() => {
        if (token) {
          const expiryTime = 100000; // 5 minutes in milliseconds
          const timer = setTimeout(logoutHandler, expiryTime);
    
          return () => clearTimeout(timer); // Clear timer on component unmount or token change
        }
      }, [token]);

    const loginHandler =(token)=>{
        setToken(token)
        localStorage.setItem('token',token)
    }
    const logoutHandler=()=>{
        setToken(null)
        localStorage.removeItem('token')
    }
    const contextValue={
        token:token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }
    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
}
export default AuthContext;