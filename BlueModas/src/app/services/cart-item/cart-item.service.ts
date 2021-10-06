import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { CartItem } from 'src/app/models/cart-item';
import { Product } from 'src/app/models/product';


@Injectable({
  providedIn: 'root'
})
export class CartItemService {

  private storage : Storage

  private total = new BehaviorSubject('00.00')
  totalPrice = this.total.asObservable()

  constructor() {
    this.storage = window.localStorage;
    this.storage.setItem('cart', '')
  }

  show(){
    let data = this.storage.getItem('cart') // [ {productId: '1', name: 'Nome do produto' amount: '2', price: 00.00, total: 00.00}, {...} ]
    let cart = data ? JSON.parse(data) : []
    return cart
  }

  add(product: Product){
    let data = this.storage.getItem('cart') // [ {productId: '1', name: 'Nome do produto' amount: '2', price: 00.00, total: 00.00}, {...} ]
    let cart = data ? JSON.parse(data) : [] 

    if(cart.find((i:CartItem) => i.productId === product.id ? true : false)){
      cart.find((i:CartItem) => i.productId === product.id ? true : false).amount += 1
      cart.find((i:CartItem) => i.productId === product.id ? true : false).total += product.price
    }
    else
      cart.push({productId: product.id, product:{name:product.name, price:product.price}, amount: 1, total:product.price})

    this.save(cart)
  }

  remove(product: Product) {
    let data = this.storage.getItem('cart') // [ {productId: '1', product:{name: 'Nome do produto', price: 00.00}, amount: '2', total: 00.00}, {...} ]
    let cart = data ? JSON.parse(data) : []
    if(cart.find((i:CartItem) => i.productId === product.id ? true : false)){
      cart.find((i:CartItem) => i.productId === product.id ? true : false).amount -= 1
      cart.find((i:CartItem) => i.productId === product.id ? true : false).total -= product.price
      this.save(cart)
    }
  }

  getAmount(id: number){
    let data = this.storage.getItem('cart') // [ {productId: '1', product:{name: 'Nome do produto', price: 00.00}, amount: '2', total: 00.00}, {...} ]
    let cart = data ? JSON.parse(data) : [] 
    let item = cart.find((i:CartItem) => i.productId === id ? true : false)

    return item ? item.amount : undefined
  }

  getCart(){
    let data = this.storage.getItem('cart') // [ {productId: '1', product:{name: 'Nome do produto', price: 00.00}, amount: '2', total: 00.00}, {...} ]
    let cart = data ? JSON.parse(data) : []
    return cart
  }

  save(cart:[]){
    let cart_fil = cart.filter((i:CartItem) =>{ return i.amount ? true : false })
    this.storage.setItem('cart', JSON.stringify(cart_fil))
    this.sumPrices()
  }

  sumPrices(){
    let data = this.storage.getItem('cart') // [ {productId: '1', product:{name: 'Nome do produto', price: 00.00}, amount: '2', total: 00.00}, {...} ]
    let cart = data ? JSON.parse(data) : []
    let total = cart.reduce((x: number, i:CartItem) => x + i.product.price*i.amount, 0)

    this.total.next(total ? total.toFixed(2) : "00.00")
  }

  reset(){
    this.storage.setItem('cart', '')
    this.total.next("00.00")
  }
}
