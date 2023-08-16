import React from "react";
import "./BlogCard.css";
import { Link } from "react-router-dom";

const BlogCard: React.FC = () => {
  return (
    <div className="blog-card">
      <div className="card-image">
        <img src="images/blog-1.jpg" alt="blog" className="img-fluid w-100" />
      </div>
      <div className="blog-content">
        <p className="date">9 Jul, 2023</p>
        <h5 className="title">A beautiful sunday morning renaissance</h5>
        <p className="desc">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          sagittis ligula tellus, ac elementum leo ultrices eu. Donec nec enim
          dapibus, ...
        </p>
        <Link to="/blogs/:id" className="button">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
