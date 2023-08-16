import React from "react";
import "./styles.css";
import { RiAdminFill } from "react-icons/ri";
import { SlLogout } from "react-icons/sl";
import { useLocation, Link } from "react-router-dom";
import userApi from "../../api/User.Api";

const Sidebar: React.FC = () => {
  const local = useLocation();

  const handleLogout = async () => {
    try {
      await userApi.logout();
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
    } catch (error) {}
    window.location.href = "/Login";
  };

  return (
    <div className="wrapper">
      <div className="logo">
        <RiAdminFill />
        Admin
      </div>
      <div className="list-item">
        <ul className="list-item-route">
          <li className={local.pathname === "/" ? "active" : ""}>
            <Link to="/">Home</Link>
          </li>
          <li className={local.pathname === "/user" ? "active" : ""}>
            <Link to="/user">User Manager</Link>
          </li>
          <li className={local.pathname === "/product" ? "active" : ""}>
            <Link to="/product">Product Manager</Link>
          </li>
          <li className={local.pathname === "/order" ? "active" : ""}>
            <Link to="/order">Order Manager</Link>
          </li>
        </ul>
      </div>
      <SlLogout
        title="Logout here!"
        className="logout"
        onClick={handleLogout}
      />
    </div>
  );
};

export default Sidebar;
