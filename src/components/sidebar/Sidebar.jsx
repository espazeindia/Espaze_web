import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { sidebarRoutes } from "../../routes";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import { useSidebar } from "../../contexts/sidebarContext";
import { useMode } from "../../contexts/themeModeContext";
import Logo from "../../assets/img/logo_darktheme.png";
import LigthLogo from "../../assets/img/logo_light.png";
import smallLogo from "../../assets/img/logo.png";
import smallLightLogo from "../../assets/img/logo2.png";
import { validate } from "../../utils/jwt-verify";
import Person from "@mui/icons-material/Person";
import { useUser } from "../../contexts/userContext";

function Sidebar() {
  const {setReload}=useUser()
  const navigate = useNavigate();
  const location = useLocation();
  const { sidebarOpen } = useSidebar();
  const { theme } = useMode();

  const handleLogOut = () => {
    Cookies.remove("EspazeCookie", { sameSite: "None", secure: true });
    setReload((prevData)=>!prevData)
    navigate("/login");
  };

  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const checkAuth = async () => {
      const cookie = Cookies.get("EspazeCookie");
      if (cookie) {
        const isValid = await validate(cookie);
        const filterRoutes = sidebarRoutes.filter((route) =>
          route.access.includes(isValid.role)
        );
        setFilteredRoutes(filterRoutes);
      }
      setLoading(false); 
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`${
        theme
          ? "bg-white border-zinc-200 border-r"
          : "bg-neutral-950 border-zinc-800 border-r"
      } sticky top-0 min-h-screen py-3 flex flex-col justify-between text-white transition-transform duration-150 ${
        sidebarOpen ? "w-[13vw]" : "w-[4vw]"
      }`}
    >
      <div>
        <div>
          {sidebarOpen ? (
            theme ? (
              <img src={LigthLogo} alt="logo" className="ml-4 w-28 " />
            ) : (
              <img src={Logo} alt="logo" className="ml-4 w-28 " />
            )
          ) : theme ? (
            <img src={smallLightLogo} alt="logo" className="mx-auto w-8 " />
          ) : (
            <img src={smallLogo} alt="logo" className="mx-auto w-8 " />
          )}
        </div>

        <div className={`mt-5 space-y-1 flex justify-center flex-col  px-3`}>
          {filteredRoutes.map((route, index) => {
            const isActive = location.pathname === route.path;
            return (
              <Link
                key={index}
                to={route.path}
                className={`flex items-center text-base rounded-md px-2 
                  ${sidebarOpen ? "" : "justify-center"}
                 py-2   ${
                   isActive
                   ? theme
                     ? "bg-violet-200 text-violet-800 font-medium"
                     : "bg-zinc-800 text-[#b490fc] font-medium"
                   : theme
                   ? "text-zinc-600 hover:text-black font-medium"
                   : "text-zinc-400 hover:text-white font-medium"
               }`}
              >
                <route.icon className="text-lg" />
                <span
                  className={`ml-3 transition-all duration-150 ${
                    sidebarOpen ? " inline" : "hidden"
                  }`}
                >
                  {route.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Help & Logout Section */}
      <div className={`space-y-1 ${sidebarOpen ? "px-3" : ""}`}>
        <div className=" pt-3">
          <Link
            to="/profile"
            className={`${
              theme
                ? "text-zinc-600 hover:text-black"
                : "text-zinc-400 hover:text-white"
            } flex items-center px-4
             py-1 rounded-md ${sidebarOpen ? "" : "justify-center"} `}
          >
            <Person />
            <span
              className={`ml-3 transition-all duration-150  ${
                sidebarOpen ? "indline" : "hidden"
              } `}
            >
              User Profile
            </span>
          </Link>
        </div>

        <button
          onClick={handleLogOut}
          className={`flex items-center w-full px-4
          py-3 text-red-500 rounded-lg duration-1000  ${
            sidebarOpen ? "" : "justify-center "
          }
           hover:bg-red-500 hover:text-white hover:cursor-pointer transition-colors`}
        >
          <LogoutOutlinedIcon />
          <span
            className={`ml-3 transition-transform duration-150  ${
              sidebarOpen ? "indline" : "hidden"
            } `}
          >
            Log Out
          </span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;