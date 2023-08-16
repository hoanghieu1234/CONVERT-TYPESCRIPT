import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-star-with-type";
import { Link, useLocation } from "react-router-dom";
import { ProductCardProps, Product } from "../../types/type";
import productAPI from "../../api/product.api"; // Thêm dòng này để import productAPI
import "./ProductCard.css";

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const location = useLocation();
  const { grid } = props;
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Gọi API và lấy dữ liệu từ server
    const fetchProducts = async () => {
      try {
        const response = await productAPI.getAllProducts();

        setProducts(response.data);
      } catch (error) {
        console.error("Lỗi khi gọi API: " + error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      {products.map((product) => (
        <div
          className={`${
            location.pathname === "/store" ? `gr-${grid}` : "col-3"
          }`}
          key={product._id}
        >
          <Link
            to={`/product/${product._id}`}
            className="product-card position-relative"
          >
            <div className="product-image">
              <img
                src={product.image}
                alt="product image"
                className="img-fluid"
              />
            </div>
            <div className="product-details">
              <h6 className="brand">{product.brand}</h6>
              <h5 className="product-title">{product.title}</h5>
              <ReactStars
                count={5}
                size={24}
                value={3}
                // edit={false}
                activeColor="#ffd700"
              />
              <p
                className={`description ${grid === 12 ? "d-block" : "d-none"}`}
              >
                {product.description}
              </p>
              <p className="price">{product.price} $</p>
            </div>
            <div className="action-bar position-absolute">
              <div className="d-flex flex-column gap-15">
                <Link to="/">
                  <img src="images/prodcompare.svg" alt="addcart" />
                </Link>
                <Link to="/">
                  <img src="images/view.svg" alt="addcart" />
                </Link>
                <Link to="/">
                  <img src="images/add-cart.svg" alt="addcart" />
                </Link>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default ProductCard;
