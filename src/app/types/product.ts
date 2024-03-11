import { ICartItem } from "./cart-item";

export interface IProduct {
  id: number;
  nameProduct: String;
  quantityProduct: number;
  expiredDate: String;
  provider: string;
  unit: string;
  origin: string;
  avatar: any;
  codeProduct: string;
  description: string;
  providePrice: number;
  floorPrice: number;
}