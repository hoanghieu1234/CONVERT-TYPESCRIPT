export interface Product {
    _id: string;
    brand: string;
    title: string;
    image: string;
    description: string;
    price: number;
}
  
export interface ProductCardProps {
    grid: number;
}

export interface SpecialProductProps {
    brand: string;
    title: string;
    price: number;
    discountDays: number;
    productCount: number;
}
