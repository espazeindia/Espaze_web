import "./App.css";
import Cookies from "js-cookie";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "./contexts/sidebarContext";
import { ModeProvider } from "./contexts/themeModeContext";
import { validate } from "./utils/jwt-verify";
import { routes } from "./routes/index";

const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const ForgetPassword = lazy(() => import("./pages/ForgetPassword"));
const Layout = lazy(() => import("./components/layout/Layout"));
const Page404 = lazy(()=> import("./pages/Page404"));

function App() {
  const[filteredRoutes,setFilteredRoutes] = useState(
    []
  )
  function PublicRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
  
  
    useEffect(() => {
      const checkAuth = async () => {
        const cookie = Cookies.get("adminInfo");
        if (cookie) {
          const parsedCookie = JSON.parse(cookie);
          const isValid = await validate(parsedCookie.token);
          const filterRoutes = routes.filter(
            (route)=>route.access.includes(isValid.role)
          )
          setFilteredRoutes(filterRoutes)
          setIsAuthenticated(isValid);
        } else {
          setIsAuthenticated(false);
        }
      };
  
      checkAuth();
    }, []);
  
    if (isAuthenticated === null) return <div>Loading...</div>;
    return isAuthenticated ? <Navigate to={filteredRoutes[0].path} replace /> : children;
  }

  function ProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
  
    useEffect(() => {
      const checkAuth = async () => {
        const cookie = Cookies.get("adminInfo");
        if (cookie) {
          const parsedCookie = JSON.parse(cookie);
          const isValid = await validate(parsedCookie.token);
          setIsAuthenticated(isValid);
        } else {
          setIsAuthenticated(false);
        }
      };
  
      checkAuth();
    }, []);
  
    if (isAuthenticated === null) return <div>Loading...</div>;
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  }
  return (
    <>
      <ToastContainer />
      <ModeProvider>
        <SidebarProvider>
          <Router>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                {/* <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} /> */}
                <Route path="/forgot-password" element={<PublicRoute><ForgetPassword /></PublicRoute>} />

                {/* Redirect "/" to "/dashboard" explicitly */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/*" element={<ProtectedRoute><Layout /></ProtectedRoute>} />

                {/* Catch-all route for unknown paths */}
                <Route path="*" element={<Page404/>} />
              </Routes>
            </Suspense>
          </Router>
        </SidebarProvider>
      </ModeProvider>
    </>
  );
}

export default App;
