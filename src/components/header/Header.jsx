import React, { useEffect, useState } from "react";
import { useSidebar } from "../../contexts/sidebarContext";
import MenuIcon from "@mui/icons-material/Menu";
import { useMode } from "../../contexts/themeModeContext";
import { DarkMode, LightMode, Notifications, Person, GridView, LogoutOutlined } from "@mui/icons-material";
import { validate } from "../../utils/jwt-verify";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/userContext";

function Header() {
  const navigate = useNavigate();
  const {userName} = useUser();
  const { toggleSidebar } = useSidebar();
  const { theme, toggleTheme } = useMode();
  const [openUser, setOpenUser] = useState(false);

  const handleLogOut = () => {
    Cookies.remove("EspazeCookie", { sameSite: "None", secure: true });
    navigate("/login");
  };

  return (
    <div
      className={`${
        theme ? "bg-white text-black border-b border-zinc-200" : "bg-neutral-950 text-white border-b border-zinc-800"
      }   z-20 sticky top-0 h-[7vh] flex items-center px-5`}
    >
      <MenuIcon onClick={toggleSidebar} className={`${theme ? "text-black":"text-white"} text-2xl cursor-pointer mr-auto `} />
      <div className="flex items-center space-x-4 ml-auto ">
        <button className={`${theme ? "text-black" : "text-white"} relative hover:cursor-pointer`}>
          <Notifications fontSize="small" />
          <div className="h-2 w-2 absolute top-0 right-0 bg-red-500 rounded-full"></div>
        </button>
        <button
          onClick={toggleTheme}
          className={` hover:cursor-pointer ${theme ? "text-black" : "text-white"}`}
        >
          {theme ? <DarkMode fontSize="small" /> : <LightMode fontSize="small" />}
        </button>
        <div
          className="flex items-center space-x-2 hover:cursor-pointer relative "
          onClick={() => setOpenUser(!openUser)}
        >
          <button className="hover:cursor-pointer text-white bg-amber-500 w-8 h-8 flex items-center justify-center rounded-full">
            <Person />
          </button>
          <span className="text-sm relative top-0.5 font-medium">{userName}</span>
          <div
            className={`absolute top-[115%] right-0 w-36 rounded-lg p-2 border ${theme ? "bg-white border-zinc-500":"border-zinc-600 bg-neutral-900"} ${
              openUser ? "block" : "hidden" 
            }`}
          >
            <Link to="/dashboard" className={` ${theme ? "hover:bg-zinc-300":"hover:bg-zinc-800"} block w-full px-2 py-1 rounded-lg flex items-center gap-2`}>
              <GridView fontSize="small" />
              Dashboard
            </Link>
            <Link to="/profile" className={` ${theme ? "hover:bg-zinc-300":"hover:bg-zinc-800"} block w-full px-2 py-1 rounded-lg flex items-center gap-2`}>
              <Person fontSize="small" />
              User Profile
            </Link>
            <button
              onClick={handleLogOut}
              className={` ${theme ? "hover:bg-zinc-300":"hover:bg-zinc-800"} block w-full px-2 py-1 rounded-lg text-left flex items-center gap-2`}>
              <LogoutOutlined fontSize="small" />
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;