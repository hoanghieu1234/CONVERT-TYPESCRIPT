// import React, { useState } from "react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import Meta from "../../components/Meta/Meta";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./SignUp.css";
import { registerUser } from "../../redux/reduce/userSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { ChangeEvent, FormEvent, useState } from "react";

interface RegisterFormValues {
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  password: string;
}

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [valueRegister, setValueRegister] = useState<RegisterFormValues>({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    password: "",
  });

  // change input
  const handleChangeInputRegister = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValueRegister({
      ...valueRegister,
      [name]: value,
    });
  };

  // post regist api
  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userRegister = valueRegister;
      await dispatch(registerUser(userRegister)).unwrap();
      navigate("/login");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <Meta title={"SignUp"} />
      <BreadCrumb title="Sign Up" />
      <div className="login-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3">Sign Up</h3>
                <form
                  action="/register"
                  onSubmit={handleRegister}
                  className="d-flex flex-column gap-30 "
                  method="post"
                >
                  <div>
                    <input
                      onChange={handleChangeInputRegister}
                      type="text"
                      name="firstname"
                      placeholder="First Name"
                      className="form-control"
                      required // Đánh dấu bắt buộc
                      pattern="^[a-zA-Z]+$" // Chỉ chấp nhận các ký tự từ A-Z hoặc a-z
                    />
                  </div>
                  <div>
                    <input
                      onChange={handleChangeInputRegister}
                      type="text"
                      name="lastname"
                      placeholder="Last Name"
                      className="form-control"
                      required // Đánh dấu bắt buộc
                      pattern="^[a-zA-Z]+$" // Chỉ chấp nhận các ký tự từ A-Z hoặc a-z
                    />
                  </div>
                  <div>
                    <input
                      onChange={handleChangeInputRegister}
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="form-control"
                      required // Đánh dấu bắt buộc
                      pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" // Đúng định dạng email
                    />
                  </div>
                  <div>
                    <input
                      onChange={handleChangeInputRegister}
                      type="tel"
                      name="mobile"
                      placeholder="Mobile Number"
                      className="form-control"
                      required // Đánh dấu bắt buộc
                    />
                  </div>
                  <div>
                    <input
                      onChange={handleChangeInputRegister}
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="form-control"
                      required // Đánh dấu bắt buộc
                    />
                  </div>
                  <div className="d-flex gap-10 p-1">
                    <div>
                      <AiOutlineArrowLeft className="fs-5" />
                    </div>
                    <div>
                      <Link className="mb-0 " to="/login">
                        Back to Login
                      </Link>
                    </div>

                    <div className="mt-3 px-4">
                      <button className="button border-0">Sign Up</button>
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

export default SignUp;
