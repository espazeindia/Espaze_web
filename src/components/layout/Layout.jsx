import React, { lazy, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { validate } from "../../utils/jwt-verify";

import { routes } from "../../routes/index";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import { useSidebar } from "../../contexts/sidebarContext";

const Page404 = lazy(() => import("../../pages/Page404"));

const Layout = () => {
  const { sidebarOpen } = useSidebar();
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen">
        <Header />
        <div className="flex-1 h-full overflow-auto">
          <Routes>
            {filteredRoutes.map((route, i) =>
              route.component ? (
                <Route
                  key={i}
                  path={`${route.path}`}
                  element={<route.component />}
                />
              ) : null
            )}

            {filteredRoutes.length > 0 ? (
              <Route
                path="*"
                element={<Navigate to={filteredRoutes[0].path} />}
              />
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
