import React, { lazy, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { validate } from "../../utils/jwt-verify";

// Internal imports
import { routes } from "../../routes/index";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import { useSidebar } from "../../contexts/sidebarContext";

const Page404 = lazy(() => import("../../pages/Page404"));

const Layout = () => {
  const { sidebarOpen } = useSidebar();
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const checkAuth = async () => {
      const cookie = Cookies.get("EspazeCookie");
      if (cookie) {
        const isValid = await validate(cookie);
        const filterRoutes = routes.filter((route) =>
          route.access.includes(isValid.role)
        );
        setFilteredRoutes(filterRoutes);
      } 
      setLoading(false); // Mark as loaded after checking auth
    };

    checkAuth();
  }, []);

  // Show a loading state until auth check completes
  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex h-screen overflow-scroll sideBarNone">
      <Sidebar />

      <div className={`transition-transform duration-150 ${sidebarOpen ? "w-[87vw]" : "w-[96vw]"}`}>
        <Header />
        <div className="h-[93vh] overflow-scroll sideBarNone">
          <Routes>
            {filteredRoutes.map((route, i) =>
              route.component ? (
                <Route key={i} path={`${route.path}`} element={<route.component />} />
              ) : null
            )}
            {/* Redirect only if routes exist */}
            {filteredRoutes.length > 0 ? (
              <Route path="*" element={<Navigate to={filteredRoutes[0].path} />} />
            ) : (
              <Route path="*" element={<Page404 />} />
            )}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Layout;
