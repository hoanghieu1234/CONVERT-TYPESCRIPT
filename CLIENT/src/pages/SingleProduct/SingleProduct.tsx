import { useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import Meta from "../../components/Meta/Meta";
import ReactStars from "react-rating-star-with-type";
import "./SingleProduct.css";
import Color from "../../components/color/color";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LuGitCompare } from "react-icons/lu";
import { AiOutlineHeart } from "react-icons/ai";
import productAPI from "../../api/product.api";
import cartAPI from "../../api/cart.api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingComponent from "../../components/LoadingComponent";
import { updateState } from "../../redux/reduce/updateSlice";
import { useDispatch } from "react-redux";

const SingleProduct = () => {
  const [orderedProduct, _] = useState(true);
  const location = useLocation();
  const [product, setProduct] = useState<any>();
  const navigate = useNavigate();
  const getUserLogin = JSON.parse(localStorage.getItem("userLogin") as any)
  const [isLoading, setIsLoading] = useState(true);
  const idProduct = location.pathname.split("/")[2];
  const idUser = getUserLogin?.data?._id;
  console.log(idUser,123123);
  
  
  const dispatch = useDispatch();

  useEffect(() => {
    // Gọi sản phẩm để lấy thông tin sản phẩm dựa vào ID
    const fetchProduct = async (idProduct: string) => {
      try {
        const getProductById = await productAPI.getDetailProduct(idProduct);

        setProduct(getProductById);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log("Lỗi khi gọi API" + error);
      }
    };
    fetchProduct(idProduct);
  }, [idProduct]);

  // Add to cart
  const handleAddToCart = () => {
    if (!getUserLogin) {
      toast.error("Vui lòng đăng nhập trước khi thêm sản phẩm vào giỏ hàng", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/login");
    } else {
      setIsLoading(true);
      // Người dùng đã đăng nhập, tiếp tục thêm sản phẩm vào giỏ hàng
      cartAPI
        .userAddToCart({ idUser, idProduct, quantity: 1 })
        .then((_respone) => {
          setIsLoading(false);
          // Hiển thị toast thông báo sản phẩm đã được thêm vào giỏ hàng thành công
          toast.success("Sản phẩm đã được thêm vào giỏ hàng", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          dispatch(updateState(true as any));
        })
        .catch((error: any) => {
          setIsLoading(false);
          console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
        });
    }
  };
  return (
    <>
      {isLoading && <LoadingComponent />}
      <Meta title={"Product Name"} />
      <BreadCrumb title="Product Name" />
      <ToastContainer />
      <div className="main-product-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <div className="main-product-image">
                <div>
                  <img
                    src={product?.data.image}
                    style={{
                      margin: "auto",
                      width: "100%",
                      height: "400px",
                    }}
                  />
                </div>
              </div>
              <div className="other-product-images d-flex flex-wrap gap-15">
                <div>
                  <img src={product?.data.image} alt="" className="img-fluid" />
                </div>
                <div>
                  <img src={product?.data.image} alt="" className="img-fluid" />
                </div>
                <div>
                  <img src={product?.data.image} alt="" className="img-fluid" />
                </div>
                <div>
                  <img src={product?.data.image} alt="" className="img-fluid" />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="main-product-details">
                <div className="border-bottom">
                  <h3 className="title">{product?.title}</h3>
                </div>
                <div className="border-bottom py-3">
                  <p className="price">{product?.price}</p>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      // edit={false} // Dòng này ngăn ko cho sữa
                      activeColor="#ffd700"
                    />
                    <p className="mb-0 t-review"> (2 Reviews)</p>
                  </div>
                  <Link className="review-btn" to={"#reviews"}>
                    Write a Review
                  </Link>
                </div>

                <div className=" py-3">
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Type:</h3>
                    <p className="product-data">Watch</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">{product?.brand}</h3>
                    <p className="product-data">Havels</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">{product?.category}</h3>
                    <p className="product-data">Watch</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">{product?.slug}</h3>
                    <p className="product-data">Watch</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Availablity:</h3>
                    <p className="product-data">In Stock</p>
                  </div>
                  <div className="d-flex gap-10 flex-column mt-2 mb-3">
                    <h3 className="product-heading">Size:</h3>
                    <div className="d-flex flex-wrap gap-15">
                      <span className="badge border border-1 b bg-white text-dark border-secondary ">
                        S
                      </span>
                      <span className="badge border border-1 b bg-white text-dark border-secondary ">
                        M
                      </span>
                      <span className="badge border border-1 b bg-white text-dark border-secondary">
                        XL
                      </span>
                      <span className="badge border border-1 b bg-white text-dark border-secondary">
                        XXL
                      </span>
                    </div>
                  </div>
                  <div className="d-flex gap-10 flex-column mt-2 mb-3">
                    <h3 className="product-heading">Color:</h3>
                    <Color />
                  </div>
                  <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                    <h3 className="product-heading">Quantity:</h3>
                    <div className="">
                      <input
                        type="number"
                        placeholder="1"
                        name=""
                        id=""
                        min={0}
                        max={10}
                        className="form-control"
                        style={{ width: "70px" }}
                      />
                    </div>
                    <div className="d-flex just-content-center gap-15 align-items-center ms-5">
                      <button
                        className="button border-0"
                        type="submit"
                        onClick={handleAddToCart}
                      >
                        Add to Cart
                      </button>
                      <Link to="/" className="button signup">
                        Buy it Now
                      </Link>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-15">
                    <div>
                      <Link to="">
                        <LuGitCompare className="fs-4 me-2" /> Add to Compare
                      </Link>
                    </div>
                    <div>
                      <Link to="">
                        <AiOutlineHeart className="fs-4 me-2" /> Add to Wishlish
                      </Link>
                    </div>
                  </div>
                  <div className="d-flex gap-10 flex-column my-3">
                    <h3 className="product-heading">Shipping & Return</h3>
                    <p className="product-data">
                      Free shipping and returns available on all orders! <br />
                      We ship all Us domestic orders within{" "}
                      <b>5-10 business day!</b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="description-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h4>Description</h4>
              <div className="bg-white p-3">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="reviews-wrapper  home-wrapper-2  ">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 id="review">Reviews</h3>
              <div className="review-inner-wrapper mb-3">
                <div className="review-head d-flex justify-content-between align-items-end">
                  <div>
                    <h4 className="mb-2">Customer Reviews</h4>
                    <div className="d-flex align-items-center gap-10">
                      {/* Thư việc reactStars */}
                      <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        // edit={false} // Dòng này ngăn ko cho sữa
                        activeColor="#ffd700"
                      />
                      <p className="mb-0">Based on 2 Reviews</p>
                    </div>
                  </div>
                  {orderedProduct && (
                    <div>
                      <Link
                        className="text-dark text-decoration-underline"
                        to="#"
                      >
                        Write a Review
                      </Link>
                    </div>
                  )}
                </div>
                <div className="review-form py-4">
                  <h4>Write a Review</h4>
                  <form action="" className="d-flex flex-column gap-15">
                    <div>
                      {/* Thư việc reactStars */}
                      <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        // edit={true} // Dòng này ngăn ko cho sữa
                        activeColor="#ffd700"
                      />
                    </div>
                    <div>
                      <textarea
                        name=""
                        id=""
                        cols={30}
                        rows={4}
                        className="w-100 form-control"
                        placeholder="comments"
                      ></textarea>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button className="button border-0">Submit Review</button>
                    </div>
                  </form>
                </div>
                <div className="reviews mt-4 ">
                  <div className="review">
                    <div className="d-flex gap-10 align-items-center">
                      <h6 className="mb-0">Navdeep</h6>
                      {/* Thư việc reactStars */}
                      <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        // edit={false} // Dòng này ngăn ko cho sữa
                        activeColor="#ffd700"
                      />
                    </div>
                    <p className="mt-3">
                      Lorem ipsum dolor sit amet consectetuer adipiscing elit
                      sed diam nonummy nibh
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleProduct;
