import React from 'react';
import { Images } from "../../assets/images";

const NotFound: React.FC = () => {
  return (
    <div>
      <img src={Images.NotFound} style={{width:"100vw",height:"100vh",objectFit:"cover"}}/>
    </div>
  );
};

export default NotFound;
