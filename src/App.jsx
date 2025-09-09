import "./App.css";
import { lazy, Suspense, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { SidebarProvider } from "./contexts/sidebarContext";
import { ModeProvider } from "./contexts/themeModeContext";
import { useUser } from "./contexts/userContext";

const Login = lazy(() => import("./pages/Login"));
const ForgetPassword = lazy(() => import("./pages/ForgetPassword"));
const Layout = lazy(() => import("./components/layout/Layout"));
const Page404 = lazy(() => import("./pages/Page404"));
const Profile =lazy(() => import("./pages/UserProfile"));

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const { isLoggedIn, loading, isOnboarded,role } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loading) return;

    if (!isLoggedIn && location.pathname !== "/login" && location.pathname !== "/forgot-password") {
      navigate("/login", { replace: true });
    } else if (isLoggedIn && role==="seller" && !isOnboarded ) {
      navigate("/profile", { replace: true });
    } 
  }, [isLoggedIn, isOnboarded, loading, location.pathname, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer />
      <ModeProvider>
        <SidebarProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgetPassword />} />
              {!isOnboarded && role==="seller" && <Route path="/profile" element={<Profile />} />}
              <Route path="/*" element={<Layout />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </Suspense>
        </SidebarProvider>
      </ModeProvider>
    </>
  );
}

export default AppWrapper;
