import "./App.css";
import Cookies from "js-cookie";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "./contexts/sidebarContext";
import { ModeProvider } from "./contexts/themeModeContext";
import { validate } from "./utils/jwt-verify";

import OperationsOnboardingForm from "./pages/operationsonboardingform";

const Login = lazy(() => import("./pages/Login"));
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
            setIsAuthenticated(isValid && isValid.role ? true : false);
          } catch {
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      };
      checkAuth();
    }, []);

    if (isAuthenticated === null) return <div>Loading...</div>;
    if (isAuthenticated) return <Navigate to="/dashboard" replace />;
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
          } catch {
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      };
      checkAuth();
    }, []);

    if (isAuthenticated === null) return <div>Loading...</div>;
    if (!isAuthenticated) return <Navigate to="/login" replace />;
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
                {/* Public routes */}
                <Route
                  path="/login"
                  element={
                    <PublicRoute>
                      <Login />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/forgot-password"
                  element={
                    <PublicRoute>
                      <ForgetPassword />
                    </PublicRoute>
                  }
                />

                {/* Redirect root to dashboard */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />

                {/* Protected routes */}
                <Route
                  path="/*"
                  element={
                    <ProtectedRoute>
                      <Layout />
                    </ProtectedRoute>
                  }
                >
                  {/* ✅ Nested under Layout → Sidebar visible */}
                  <Route path="operationsonboardingform" element={<OperationsOnboardingForm />} />
                </Route>

                {/* Catch-all route */}
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
