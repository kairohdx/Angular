import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartItemService } from 'src/app/services/cart-item/cart-item.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  amount: number | undefined
  urlToImg:string

  @Input()
  product!: Product

  constructor(private cart:CartItemService) {
    this.urlToImg = "https://localhost:5001/api/products/img/"
  }

  ngOnInit(): void {
    this.checkBtnVisible()
  }

  showBtn = false
  showBtnInput = true
  mouseOver(){
    this.amount = this.cart.getAmount(this.product.id)
    this.showBtn = this.amount ? false : true
  }

  mouseOut(){
    this.showBtn = false
  }

  addToCart(){
    this.cart.add(this.product)
    this.amount = this.cart.getAmount(this.product.id)

    this.showBtn = false
    this.showBtnInput = true
  }

  remFromCart(){
    this.cart.remove(this.product)
    this.amount = this.cart.getAmount(this.product.id)

    this.showBtn = this.amount ? false : true
    this.showBtnInput = this.amount ? true : false
  }

  checkBtnVisible(){
    this.amount = this.cart.getAmount(this.product.id)
    this.showBtnInput = this.amount ? true : false
  }

}

