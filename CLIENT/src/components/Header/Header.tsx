import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import getCartItem from "../../api/cart.api";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "../../redux/reduce/updateSlice";

interface CartItem {
  _id: string;
  idProduct: {
    _id: string;
    price: number;
    image: string;
    title: string;
    category: string;
  };
  quantity: number;
}
const Header: React.FC = () => {
  const [logOut, setLogOut] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isUpdate = useSelector((state: { update: string }) => state.update);
  const getUserLocal = JSON.parse(localStorage.getItem("userLogin") as string);

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userLogin");

    setLogOut(false);
    navigate("/login");
    dispatch(updateState());
  };
  let getAccessToken = localStorage.getItem("accessToken") as string;

  const checkAccessToken = () => {
    if (getAccessToken) {
      setLogOut(true);
    } else {
      setLogOut(false);
    }
  };

  useEffect(() => {
    checkAccessToken();
  }, [getAccessToken]);

  // cartItem
  const quantityRef  = React.useRef<number>(0) 
  const [_cartItems, setCartItems] = useState<CartItem[]>([]);
  let idUser = JSON.parse(localStorage.getItem("userLogin") as string)?.data._id;
  const getCartItems = async (id: string) => {
    const response = await getCartItem.getCartItem(id);
    const items: CartItem[] = response.data;
    quantityRef.current = items.reduce((total, product) => {
      return total= total + product.quantity
    }, 0)
    setCartItems(items);
  };
  useEffect(() => {
    idUser = JSON.parse(localStorage.getItem("userLogin") as string)?.data._id;
    if (idUser && isUpdate) {
      getCartItems(idUser);
    }
  }, [isUpdate]);


 
  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-10">
              <p className="text-white mb-0">
                Free Shipping Over $100 & Free Returns
              </p>
            </div>
            <div className="col-2">
              <p className="text-end text-white mb-0">
                Hotline:
                <NavLink className="text-white" to="tel:+840899548260">
                  +84: 0899548260
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3 ">
        <div className="container-xxl">
          <div className="row d-flex align-item-center">
            <div className="col-2">
              <h1>
                <Link to="/" className="text-white">
                  H&Store
                </Link>
              </h1>
            </div>
            <div className="col-5">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Product Here..."
                  aria-label="Search Product Here..."
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="fs-6" />
                </span>
              </div>
            </div>
            <div className="col-5">
              <div className="header-upper-links d-flex align-item-center justify-content-between gap-10 ">
                <div>
                  <Link
                    to="/compare-product"
                    className="d-flex align-items-center gap text-white "
                  >
                    <img src="images/compare.svg" alt="compare" />
                    <p className="mb-0">
                      Compare <br /> Product
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/wishlist"
                    className="d-flex align-items-center gap text-white "
                  >
                    <img src="images/wishlist.svg" alt="wishlist" />
                    <p className="mb-0">
                      Favourite <br /> Wishlist
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white "
                  >
                    <img src="images/cart.svg" alt="cart" />
                 
                      <div className="d-flex flex-column gap-10">
                        <span className="badge bg-white text-dark">
                        {quantityRef.current}
                        </span>
                        {/* <p className="mb-0">{result} $</p> */}
                      </div>
                  
                  </Link>
                </div>
                {!logOut ? (
                  <div>
                    <Link
                      to="/login"
                      className="d-flex align-items-center gap text-white "
                    >
                      <img src="images/user.svg" alt="user" />
                      <p className="mb-0">
                        Login <br /> My Account
                      </p>
                    </Link>
                  </div>
                ) : (
                  <div>
                    <span className="text-white">
                      {getUserLocal.data.firstname}
                      {getUserLocal.data.lastname}
                    </span>
                    <Link
                      to="/login"
                      className="d-flex align-items-center gap text-white "
                      onClick={handleLogOut}
                    >
                      <AiOutlineLogout className="fs-3 my-2" />
                      <p className="mb-0">LogOut</p>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary d-flex align-items-center dropdown-toggle bg-transparent border-0 gap-15"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src="images/menu.svg" alt="" />
                      <span> Shop Categories</span>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item text-white" href="#">
                          Action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item text-white" href="#">
                          Another action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item text-white" href="#">
                          Something else here
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink className="text-white" to="/">
                      Home
                    </NavLink>
                    <NavLink className="text-white" to="/product">
                      Our Store
                    </NavLink>
                    <NavLink className="text-white" to="/blogs">
                      Blogs
                    </NavLink>
                    <NavLink className="text-white" to="/contact">
                      Contact
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
