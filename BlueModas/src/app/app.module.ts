import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule, IConfig } from 'ngx-mask'

import { AppComponent } from './app.component';
import { ProductsComponent } from './views/products/products.component';
import { CartComponent } from './views/cart/cart.component';
import { OrderComponent } from './views/order/order.component';
import { ClientDataComponent } from './views/client-data/client-data.component';
import { ProductComponent } from './components/product/product.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';

export const options: Partial<IConfig> | any = null;

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductsComponent,
    CartComponent,
    OrderComponent,
    ClientDataComponent,
    TopNavComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule ,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'products', component: ProductsComponent},
      {path: 'cart', component: CartComponent},
      {path: 'client-data', component: ClientDataComponent},
      {path: 'order/:id', component: OrderComponent},
      {path: '', redirectTo: 'products', pathMatch: 'full'}
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
