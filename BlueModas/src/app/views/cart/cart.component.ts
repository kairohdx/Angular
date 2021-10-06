import { Component, OnInit } from '@angular/core';
import { CartItemService } from 'src/app/services/cart-item/cart-item.service';
import { CartItem } from 'src/app/models/cart-item';
import { Product } from 'src/app/models/product';
import { ProductComponent } from 'src/app/components/product/product.component';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  totalPrice: string | undefined
  cartItem = {} as CartItem
  cartItems: CartItem[]
  hasValue = false
  constructor(private cart: CartItemService) {
    this.cartItems = []
    this.cart.totalPrice.subscribe(price => {
      this.totalPrice = price
      this.hasValue = price !== "00.00"
    })
  }

  ngOnInit(): void {
    this.cart.totalPrice.subscribe(price => {
      this.totalPrice = price
      this.hasValue = price !== "00.00"
    })
    this.cartItems = this.cart.show()
  }

  addToCart(id:number){
    let product = this.getProductByItemId(id)
    if(product) 
      this.cart.add(product)
    this.cartItems = this.cart.show()
  }

  remFromCart(id: number){
    let product = this.getProductByItemId(id)
    if(product)
      this.cart.remove(product)
    this.cartItems = this.cart.show()
  }

  private getProductByItemId(id: number){
    let item = this.cartItems.find((i:CartItem) => i.productId === id ? true : false)
    if(item){
      let product:Product = {
        id: item.productId,
        name: item.product.name,
        price: item.product.price
      }
      return product
    }
    return undefined
  }

}
