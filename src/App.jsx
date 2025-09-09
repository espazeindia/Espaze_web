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
// const SignUp = lazy(() => import("./pages/SignUp"));
const ForgetPassword = lazy(() => import("./pages/ForgetPassword"));
const Layout = lazy(() => import("./components/layout/Layout"));
const Page404 = lazy(() => import("./pages/Page404"));

function App() {

  function PublicRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
      const checkAuth = async () => {
        const cookie = Cookies.get("EspazeCookie");
        if (cookie) {
          try {
            const isValid = await validate(cookie);
            console.log(isValid)
            if (isValid && isValid.role) {
              setIsAuthenticated(true);
            } else {
              setIsAuthenticated(false);
            }
          } catch (error) {
            console.error("Token validation error:", error);
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      };

      checkAuth();
    }, []);

    if (isAuthenticated === null) return <div>Loading...</div>;
    
    // If authenticated, redirect to dashboard
    if (isAuthenticated) {
      return <Navigate to="/dashboard" replace />;
    }
    
    // If not authenticated, show the login page
    return children;
  }

  function ProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
      const checkAuth = async () => {
        const cookie = Cookies.get("EspazeCookie");
        if (cookie) {
          try {
            const isValid = await validate(cookie);
            setIsAuthenticated(isValid && isValid.role ? true : false);
          } catch (error) {
            console.error("Token validation error:", error);
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      };

      checkAuth();
    }, []);

    if (isAuthenticated === null) return <div>Loading...</div>;
    
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    
    // If authenticated, show the protected content
    return children;
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
                <Route
                  path="/forgot-password"
                  element={
                    <PublicRoute>
                      <ForgetPassword />
                    </PublicRoute>
                  }
                />

                {/* Redirect "/" to "/dashboard" explicitly */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route
                  path="/*"
                  element={
                    <ProtectedRoute>
                      <Layout />
                    </ProtectedRoute>
                  }
                />

                {/* Catch-all route for unknown paths */}
                <Route path="*" element={<Page404 />} />
              </Routes>
            </Suspense>
          </Router>
        </SidebarProvider>
      </ModeProvider>
    </>
  );
}

export default App;
