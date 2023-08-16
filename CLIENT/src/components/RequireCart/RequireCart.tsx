
import React from 'react';
import Cart from '../../pages/Cart/Cart';
import { Navigate } from 'react-router-dom';



const RequireCart: React.FC = () => {
  // Your logic to check if the user is authenticated or not
  const idUsers: any = JSON.parse(localStorage.getItem("userLogin") as string)?.data?._id;
  console.log("idUser", idUsers)
  if (idUsers == null) {
    return <Navigate to="/login"/>
  }

  return <Cart />;
};

export default RequireCart;