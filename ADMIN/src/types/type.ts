import { ReactNode } from "react";

export interface DefaultLayoutProps {
  children: ReactNode;
}

export interface ISearchUser {
  lastname: string;
}

export interface PaymentItem {
  _id: string;
  idUser: {
    lastname: string;
    mobile: string;
    email: string;
  };
  total: number;
  listProduct: {
    idProduct: {
      category: string;
      createdAt: string;
      price: number;
    };
  }[];
}

export interface Product {
  _id?: string;
  title: string;
  price: string;
  category: string;
  image: string;
  quantity: string;
}


