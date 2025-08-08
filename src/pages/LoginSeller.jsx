import React, { useState } from "react";
import Logo from "../assets/img/logo2.png";
import Logo2 from "../assets/img/logo.png";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useMode } from "../contexts/themeModeContext";
import Seller from "../components/tabs/Seller";
import Operations from "../components/tabs/Operations";

function LoginSeller() {
  const { theme, toggleTheme } = useMode();
  const [user, setUser] = useState("seller");

  return (
    <div
      className={`flex items-center justify-center min-h-screen p-6 ${
        theme ? "bg-zinc-200 text-zinc-800" : "bg-zinc-800 text-white"
      }`}
    >
      <div
        className={`flex h-full w-[25vw] mx-auto overflow-hidden rounded-lg ${
          theme ? "bg-white" : "bg-neutral-950"
        } shadow-xl`}
      >
        <div className="flex w-full flex-col overflow-y-auto md:flex-row">
          <main className="flex flex-col items-center justify-center p-6 sm:p-12">
            {theme ? (
              <img src={Logo} className="w-16 mb-3" />
            ) : (
              <img src={Logo2} className="w-16 mb-3" />
            )}

            <div className="w-full">
              <h1 className="mb-4 text-3xl font-semibold  text-center">
                Welcome Back
              </h1>
              {user === "operations" && (
                <h2
                  className={`text-center ${
                    theme ? "text-zinc-600" : "text-zinc-400"
                  }  mb-6`}
                >
                  Welcome back! Please enter your details.
                </h2>
              )}
              <div
                className={`rounded-lg p-1 py-1.5 flex w-full justify-center gap-2 mt-4 mb-6
                 ${
                   theme
                     ? "bg-violet-200 text-violet-800"
                     : "bg-violet-200 text-violet-800"
                 }`}
              >
                <div
                  className={`py-2 px-2 text-sm cursor-pointer font-medium rounded-md text-center w-1/2 ${
                    user === "seller"
                      ? theme
                        ? "bg-[#8b5cf6] text-white"
                        : "bg-[#8b5cf6] text-white"
                      : theme
                      ? "bg-violet-200 text-violet-800"
                      : "bg-violet-200 text-violet-800"
                  }`}
                  onClick={() => {
                    setUser("seller");
                  }}
                >
                  Seller
                </div>
                <div
                  className={`py-2 px-2 text-sm cursor-pointer font-medium rounded-md text-center w-1/2 ${
                    user === "operations"
                      ? theme
                        ? "bg-[#8b5cf6] text-white"
                        : "bg-[#8b5cf6] text-white"
                      : theme
                      ? "bg-violet-200 text-violet-800"
                      : "bg-violet-200 text-violet-800"
                  }`}
                  onClick={() => {
                    setUser("operations");
                  }}
                >
                  Operational Guy
                </div>
              </div>
            </div>
            {user === "seller" ? <Seller /> : <Operations />}
          </main>
        </div>
      </div>

      <button
        onClick={toggleTheme}
        className={`hover:cursor-pointer p-2 rounded-full w-10 h-10 flex items-center justify-center fixed bottom-2 right-2 ${
          theme ? "text-black bg-white" : "text-white bg-black"
        }`}
      >
        {theme ? <DarkMode fontSize="small" /> : <LightMode fontSize="small" />}
      </button>
    </div>
  );
}

export default LoginSeller;
