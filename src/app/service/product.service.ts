import { Createproduct, Product } from './../../types/Product';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http = inject(HttpClient);
  apiUrl = 'http://localhost:3000/products';

  constructor() {}

  //get all product
  getAllProduct() {
    return this.http.get<Product[]>(this.apiUrl);
  }
  getProductDetail(id: number) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(data:Createproduct){
    return this.http.post(this.apiUrl, data)
  }

  updateProduct(id:string, data:Createproduct){
    return this.http.put(`${this.apiUrl}/${id}`, data)
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  searchProducts(keyword: string): Observable<any[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?title_like=${keyword}`);
  }
}
