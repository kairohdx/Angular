import { Component, ContentChildren, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItemService } from 'src/app/services/cart-item/cart-item.service';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  totalPrice: string | undefined
  hasValue =  false
  constructor(private cart:CartItemService) {
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
  } 

}
