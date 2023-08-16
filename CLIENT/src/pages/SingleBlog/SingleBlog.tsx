import React from "react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import Meta from "../../components/Meta/Meta";
import "./SingleBlog.css";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";

const SingleBlog: React.FC = () => {
  return (
    <>
      <Meta title={"Dynamic Blog Name"} />
      <BreadCrumb title="Dynamic Blog Name" />
      <div className="blog-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="single-blog-card">
                <Link to="/blogs" className="d-flex align-items-center gap-10">
                  <HiOutlineArrowLeft className="fs-3" />
                  Go back to Blogs
                </Link>
                <h3 className="title">
                  A Beautiful Sunday Morning Renaissance
                </h3>
                {/* <img
                  src="/images"
                  alt="blog"
                  className="img-fluid w-100 my-4"
                /> */}
                <p>
                  Now, think about what those things do for your customer. Does
                  careful construction mean that your product is safe for
                  children? Do ethically sourced materials make the buyer feel
                  good about purchasing your product? Do those bells and
                  whistles make everyone who sees your customer with your
                  product weep with envy? Those are benefits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
