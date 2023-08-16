import React from "react";
// import ReactStars from "react-rating-stars-component";
import "./SpecialProduct.css";
import { Link } from "react-router-dom";
import { SpecialProductProps } from "../../types/type";


const SpecialProduct: React.FC<SpecialProductProps> = ({
  brand,
  title,
  price,
  discountDays,
  productCount,
}) => {
  return (
    <div className="col-6 mb-3">
      <div className="special-product-card">
        <div className="d-flex justify-content-between">
          <div>
            <img src="images/watch.jpg" alt="watch" className="img-fluid" />
          </div>
          <div className="special-product-content">
            <h5 className="brand">{brand}</h5>
            <h6 className="title">{title}</h6>
            {/* ReactStars component */}
            {/* <ReactStars
              count={5}
              size={24}
              value={3}
              edit={false}
              activeColor="#ffd700"
            /> */}
            <p className="price">
              <span className="red-p">${price}</span>&nbsp; <s>${200}</s>
            </p>
            <div className="discount-till d-flex align-items-center gap-10">
              <p className="mb-0">
                <b>{discountDays}</b> days
              </p>
              <div className="d-flex gap-10 align-items-center">
                <span className="badge rounded-circle p-3 bg-danger">1</span>:
                <span className="badge rounded-circle p-3 bg-danger">1</span>:
                <span className="badge rounded-circle p-3 bg-danger">1</span>
              </div>
            </div>
            <div className="prod-count my-3">
              <p>Products: {productCount}</p>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "25%" }}
                  aria-label="Basic example"
                  aria-valuenow={25}
                  aria-valuemin={0}
                  aria-valuemax={100}
                ></div>
              </div>
            </div>
            <Link to="/" className="button">Add to cart</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialProduct;
