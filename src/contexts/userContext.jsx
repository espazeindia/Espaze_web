import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from "js-cookie"; 
import { validate } from "../utils/jwt-verify"

const UserContext = createContext(undefined);

export function UserProvider({ children }) {
  const [userName, setUserName] = useState("");
  const [role,setRole] = useState("");
  const [isOnboarded,setIsOnboarded] = useState(false);

  useEffect(()=>{
    const getUserDetails =async()=>{
        const token = Cookies.get("EspazeCookie")
        const payload = await validate(token)
        if(payload){
            setIsOnboarded(payload.isOnboarded)
            setUserName(payload.name)
            setRole(payload.role)
        } 
    }
    getUserDetails()
  },[])

  return (
    <UserContext.Provider value={{userName,setUserName,role,setRole,isOnboarded,setIsOnboarded}}>
      {children}
    </UserContext.Provider>
  );
}
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
