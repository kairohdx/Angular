import { CartItem } from "./cart-item";

export interface  Order{
    id: number,
    items: CartItem[],
    clientName: string,
    clientEmail: string,
    clientTel: string
}