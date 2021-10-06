import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {debounce} from 'lodash'
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  ngOnInit(): void {
    this.genData()
  }

  product = {} as Product
  products: Product[]

  constructor(private productService:ProductService) {
    this.products = []
    this.searchProducts = debounce (this.searchProducts, 1000)
  }

  genData(){
    this.productService.getProducts().subscribe((products: Product[]) =>{
      this.products =  products
      if(products.length < 1)
        this.productService.startDataBase().subscribe((products: Product[]) =>{
          this.products =  products
        })

  })
  }

  getProducts(keyWord:string = ""){
    this.productService.getProducts(keyWord).subscribe((products: Product[]) =>{
        this.products =  products
    })
  }

  onFocus(input:any){
    input.parentElement.getElementsByClassName('label')[0].classList.remove('label-inside')
  }

  onBlur(input:any){
    if(!input.value)
      input.parentElement.getElementsByClassName('label')[0].classList.add('label-inside')
  }

  searchProducts(input:any){
    let keyWord = input.value

    this.getProducts(keyWord)
  }

}
