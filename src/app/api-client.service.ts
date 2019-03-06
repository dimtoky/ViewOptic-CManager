import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const serverURL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  constructor(private http: HttpClient) { }

  loadBrandData() {
    return this.http.get(serverURL + 'api/brands');
  }

  loadProductsdata() {
    console.log('je suis le service');
    return this.http.get(serverURL + 'api/products');
  }

  loadProductdata(id) {
    console.log('je suis le service');
    return this.http.get(serverURL + 'api/products/id/' + id);
  }

  loadProductsbybrand(brand) {
    return this.http.get(serverURL + 'api/products/brandid/' + brand);
  }

}
