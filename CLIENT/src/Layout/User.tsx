import React, { ReactNode } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

interface UserProps {
  children: ReactNode;
}

const User: React.FC<UserProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default User;
