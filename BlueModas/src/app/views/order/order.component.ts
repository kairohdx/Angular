import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Order } from 'src/app/models/order';
import { CartItemService } from 'src/app/services/cart-item/cart-item.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  order:Order | undefined
  total:number

  constructor(private route: ActivatedRoute, private orderServ:OrderService, private cart: CartItemService) {
    this.total = 0
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
        this.orderServ.getOrderById(params.get('id')).subscribe(i => {
          this.order = i
          this.order.items.forEach(i  => {
            this.total += i.total
          })
        })
    })
    this.cart.reset()
  }

  loadData(){

  }

}
