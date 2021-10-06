export interface CartItem {
    productId : number,
    product : {
        name : string,
        price : number,
    }
    amount : number,
    total : number
}