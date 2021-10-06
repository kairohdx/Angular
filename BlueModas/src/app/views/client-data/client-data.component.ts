import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItemService } from 'src/app/services/cart-item/cart-item.service';
import { OrderService } from 'src/app/services/order/order.service';
import { Order } from '../../models/order';

@Component({
  selector: 'app-client-data',
  templateUrl: './client-data.component.html',
  styleUrls: ['./client-data.component.css']
})
export class ClientDataComponent implements OnInit {

  formGroup =  new FormGroup ({
    clientName: new FormControl('', Validators.required),
    clientEmail: new FormControl('', Validators.required),
    clientTel: new FormControl('', Validators.required),
  }, {updateOn: 'blur'});

  constructor(private cart:CartItemService, private order:OrderService, private router: Router) { }

  ngOnInit(): void {
    var items = this.cart.getCart()
    //if (!items)

  }

  onSubmit(){
    if(this.formGroup.valid){
      var order:Order = this.formGroup.getRawValue()
      order.items = this.cart.getCart()
      this.order.postOrder(order).subscribe(res => this.redirect(res.id))
    }
  }

  redirect(id:number){
    this.router.navigate(['/order/' + id])
  }

  onFocus(input:any){
    input.parentElement.getElementsByClassName('label')[0].classList.remove('label-inside')
  }

  onBlur(input:any){
    if(!input.value)
      input.parentElement.getElementsByClassName('label')[0].classList.add('label-inside')
  }

  get clientName() {return this.formGroup.get('clientName')};
  get clientEmail() {return this.formGroup.get('clientEmail')};
  get clientTel() {return this.formGroup.get('clientTel')};


}
