import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import NotFound from "../pages/NotFound/NoutFound";
import DefaultLayout from "../components/layouts/DefaultLayout";
import Home from "../components/Home";
import OrderManager from "../components/OrderManager";
import ProductManager from "../components/ProductManager";
import UserManager from "../components/UserManager";
import RequireAuth from "../components/RequireAuth/RequireAuth";

const Router: React.FC = () => {
  return (
    <Routes>
      {/* Authentication */}
      <Route element={<RequireAuth />}>
        <Route
          path="/"
          element={
            <DefaultLayout>
              <Home />
            </DefaultLayout>
          }
        />
        <Route
          path="/user"
          element={
            <DefaultLayout>
              <UserManager />
            </DefaultLayout>
          }
        />
        <Route
          path="/product"
          element={
            <DefaultLayout>
              <ProductManager />
            </DefaultLayout>
          }
        />
        <Route
          path="/order"
          element={
            <DefaultLayout>
              <OrderManager />
            </DefaultLayout>
          }
        />
      </Route>
      <Route path="/Login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
