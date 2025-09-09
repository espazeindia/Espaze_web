import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { validate } from "../utils/jwt-verify";

const UserContext = createContext(undefined);

export function UserProvider({ children }) {
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const getUserDetails = async () => {
      setLoading(true);
      const token = Cookies.get("EspazeCookie");

      if (token) {
        const payload = await validate(token);
        if (payload) {
          console.log(payload);
          setIsLoggedIn(true);
          setIsOnboarded(payload.isOnboarded);
          setUserName(payload.name);
          setRole(payload.role);
        } else {
          setIsLoggedIn(false);
          setIsOnboarded(false);
          setUserName("");
          setRole("");
        }
      } else {
        setIsLoggedIn(false);
        setIsOnboarded(false);
        setUserName("");
        setRole("");
      }

      setLoading(false);
    };

    getUserDetails();
  }, [reload]);

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        loading,
        setLoading,
        userName,
        setUserName,
        role,
        setRole,
        isOnboarded,
        setIsOnboarded,
        reload,
        setReload,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
