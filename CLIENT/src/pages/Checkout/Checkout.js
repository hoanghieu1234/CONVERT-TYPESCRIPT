import React from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const Checkout = () => {
  return (
    <>
      <div className="checkout-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-7">
              <div className="checkout-left-data">
                <h3 className="website-name">H&H Store</h3>
                <nav
                  style={{ "--bs-breadcrumb-divider": ">" }}
                  aria-label="breadcrumb"
                >
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item active" aria-current="page">
                      <Link className="text-dark" to="/cart">
                        Cart
                      </Link>
                    </li>
                    &nbsp; /
                    <li class="breadcrumb-item active" aria-current="page">
                      Information
                    </li>
                    &nbsp; /
                    <li class="breadcrumb-item active" aria-current="page">
                      Shipping
                    </li>
                    &nbsp; /
                    <li class="breadcrumb-item active" aria-current="page">
                      Payment
                    </li>
                  </ol>
                </nav>
                <h4 className="title">Contact Information</h4>
                <p className="user-details">
                  HieuNguyen (hieunguyenhl123@gmail.com)
                </p>
                <form
                  action=""
                  className="d-flex flex-wrap gap-15 justify-content-center"
                >
                  <div className="w-100">
                    <select name="" id="" className="form-control form-select">
                      <option value="" selected disabled>
                        Select Country
                      </option>
                    </select>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="first-name"
                      className="form-control"
                    />
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="last-name"
                      className="form-control"
                    />
                  </div>
                  <div className="w-100">
                    <input
                      type="text"
                      placeholder="address"
                      className="form-control"
                    />
                  </div>
                  <div className="w-100">
                    <input
                      type="text"
                      placeholder="Apartment, suit, etc."
                      className="form-control"
                    />
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="city"
                    />
                  </div>
                  <div className="flex-grow-1">
                    <select name="" className="form-control form-select">
                      <option value="" selected disabled>
                        Select State
                      </option>
                    </select>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="zip-code"
                    />
                  </div>
                  <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center gap-15">
                      <Link className="text-dark" to="/cart">
                        <BiArrowBack className="fs-4 mb-1" /> Return to Cart
                      </Link>
                      <Link className="button" to="#">
                        Continue Shipping
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-5">
              <div className="border-bottom py-4">
                <div className="d-flex gap-10 align-items-center">
                  <div className="w-75 d-flex gap-10">
                    <div className="w-25">
                      <img
                        src="images/watch.jpg"
                        className="img-fluid"
                        alt="product"
                      />
                    </div>
                    <div>
                      <h5 className="title">Watch</h5>
                      <p>beauty</p>
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h5>$ 100.00</h5>
                  </div>
                </div>
              </div>
              <div className="border-bottom py-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p>Subtotal</p>
                  <p>$ 10000</p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p>Shipping</p>
                  <p>$ 10000</p>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center py-4">
                <h4>Total</h4>
                <h5>$ 10000</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
