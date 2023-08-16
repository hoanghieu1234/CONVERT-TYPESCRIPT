import React from "react";
import { Link } from "react-router-dom";
import { BsLinkedin, BsGithub, BsYoutube, BsInstagram } from "react-icons/bs";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-5">
              <div className="footer-top-data d-flex align-items-center gap-30">
                <img src="images/newsletter.png" alt="newletter" />
                <h2 className="text-while mb-0">Sign Up For Newsletter</h2>
              </div>
            </div>
            <div className="col-7">
              <div className="input-group ">
                <input
                  type="text"
                  className="form-control py-1"
                  placeholder="Your Email... "
                  aria-label="Your Email......"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-2" id="basic-addon2">
                  Subscribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h4 className="text-while mb-4">Contact</h4>
              <div className="footer-links d-flex flex-column">
                <address className="text-white ps-6 ">
                  Đà Nẵng: 366 Phan Đăng Lưu, <br />
                  Tòa Nhà Ticco <br />
                  Code: 72000
                </address>
                <Link
                  to="tel:+840899548260"
                  className="mt-2 d-block mb-3 text-white"
                >
                  +84: 0899548260
                </Link>
                <Link
                  to="mailto:hieunguyenhl123@gmail.com"
                  className="mt-2 d-block mb-3 text-white"
                >
                  hieunguyenhl123@gmail.com
                </Link>
                <div className="social_icons d-flex align-items-center gap-30 mt-4">
                  <Link className="text-white" to="">
                    <BsLinkedin className="fs-4" />
                  </Link>
                  <Link className="text-white" to="">
                    <BsInstagram className="fs-4" />
                  </Link>
                  <Link className="text-white" to="">
                    <BsGithub className="fs-4" />
                  </Link>
                  <Link className="text-white" to="">
                    <BsYoutube className="fs-4" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Information</h4>
              <div className="footer-links d-flex flex-column">
                <Link to="/privacy-policy" className="text-white py-2 mb-1">
                  Privacy Policy
                </Link>
                <Link to="/refund-policy" className="text-white py-2 mb-1">
                  Refund Policy
                </Link>
                <Link to="/shipping-policy" className="text-white py-2 mb-1">
                  Shipping Policy
                </Link>
                <Link to="/term-conditions" className="text-white py-2 mb-1">
                  Terms & Conditions
                </Link>
                <Link to="/blogs" className="text-white py-2 mb-1">
                  Blogs
                </Link>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Account</h4>
              <div className="footer-links d-flex flex-column">
                <Link to="" className="text-white py-2 mb-1">
                  About Us
                </Link>
                <Link to="" className="text-white py-2 mb-1">
                  Faq
                </Link>
                <Link to="" className="text-white py-2 mb-1">
                  Contact
                </Link>
              </div>
            </div>
            <div className="col-2">
              <h4 className="text-white mb-4">Quick Link</h4>
              <div className="footer-links d-flex flex-column">
                <Link to="" className="text-white py-2 mb-1">
                  Laptops
                </Link>
                <Link to="" className="text-white py-2 mb-1">
                  Head Phones
                </Link>
                <Link to="" className="text-white py-2 mb-1">
                  Tablets
                </Link>
                <Link to="" className="text-white py-2 mb-1">
                  Watch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-while">
                &copy; {new Date().getFullYear()}; Powered By Nguyễn Hoàng Hiếu
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
