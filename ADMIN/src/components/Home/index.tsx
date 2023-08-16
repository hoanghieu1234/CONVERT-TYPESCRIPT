import React from "react";
import "./index.css";
import { ImagesAdmin } from "../../assets/image";

const Home: React.FC = () => {
  return (
    <div className="wrapper-home">
      <div className="content-home">
        <img src={ImagesAdmin.AdminImg} alt="Admin" />
      </div>
    </div>
  );
};

export default Home;
