import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = 'https://localhost:5001/api/' // **Alterar Url em Product.Component

  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todos os Produtos
  getProducts(keyWord:string=""):Observable<Product[]> {
    console.log(keyWord ? true : false)
    let params = keyWord ? new HttpParams().set("key-word", keyWord) : new HttpParams()
    return this.httpClient.get<Product[]>(this.url+"products", { params: params }).pipe(
      retry(2), catchError(this.handleError)
    )
  }

  startDataBase():Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.url+'loadDataBase').pipe(
      retry(2), catchError(this.handleError)
    )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };


}
