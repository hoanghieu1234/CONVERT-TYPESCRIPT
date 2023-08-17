import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import Meta from "../../components/Meta/Meta";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { loginUser } from "../../redux/reduce/userSlice";
import { updateState } from "../../redux/reduce/updateSlice";
import axiosClient from "../../api/AxiosClient";
const Login: React.FC = () => {
  const navigate = useNavigate();

  const [valueLogin, setValueLogin] = useState({
    email: "",
    password: "",
  });
  const handleChangeInputLogin = (e: ChangeEvent<HTMLInputElement>) => {
    setValueLogin({
      ...valueLogin,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const value = valueLogin;
      const loginData = await dispatch(loginUser(value)).unwrap();
      if (loginData && loginData.data.isBlocked === false) {
        console.log(loginData, "login");

        navigate("/");
      } else if (loginData && loginData.data.isBlocked === true) {
        toast.error("Tài khoản bị khóa!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      dispatch(updateState());
    } catch (error: any) {
      console.log(error);
      toast.error((error as any).message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  // CLEAR LOCAL STORAGE VÀ GỌI API CLEAR COOKIE
  function deleteCookie(name: string ) {
    document.cookie =
      name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
  // HANDLE LOGOUT
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch()

  useEffect(() => {
    if (accessToken) {
      axiosClient({
        method: "POST",
        url: "api/v1/user/logout",
      })
        .then(() => {
          dispatch(updateState());

          toast.success('Logged out successfully!');
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userLogin")
          deleteCookie("refreshToken");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  return (
    <>
      <Meta title={"Login"} />
      <BreadCrumb title="Login" />
      <ToastContainer />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="login-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3">Login</h3>
                <form
                  action="/login"
                  method="POST"
                  className="d-flex flex-column gap-30 "
                  onSubmit={handleSubmit}
                >
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="form-control"
                      onChange={handleChangeInputLogin}
                    />
                  </div>

                  <div>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="form-control"
                      onChange={handleChangeInputLogin}
                    />
                  </div>

                  <div>
                    <Link to="/forgot-password" className="mb-3">
                      Forgot Password?
                    </Link>
                    <div className="d-flex justify-content-center gap-15 align-items-center">
                      <button className="button border-0">Login</button>
                      <Link to="/sign-up" className="button signup">
                        SignUp
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
