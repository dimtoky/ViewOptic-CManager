import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiClientService } from '../api-client.service';
import { FormControl } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  brandData;
  productData;
  productSelected: boolean;
  brandNew: boolean;
  productNew: boolean;
  brandName = new FormControl('');
  brandDescription = new FormControl('');

  constructor(private http: HttpClient, private apiservice: ApiClientService) {
  }

  onRefresh() {
    this.getAllBrand();
    this.getAllProduct();
    console.log('rafraichi');
  }

  getAllBrand() {
    this.apiservice.loadBrandData().subscribe(data => {
      this.brandData = data['brands'];
      console.log(this.brandData[1]);
     });
  }

  getAllProduct() {
    this.apiservice.loadProductsdata().subscribe(data => {
      this.productData = data['products'];
      console.log(this.productData);
     });
  }

  getAllBrandProduct(id) {
    this.apiservice.loadProductsbybrand(id).subscribe(data => {
      this.productData = data['products']; });
      this.productSelected = false;
    this.productNew = false;
  }



  addBrandForm() {
    this.brandNew = true;
  }

  backProduct() {
    this.brandNew = false;
  }

  addBrand() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.http.post('http://localhost:8080/api/brands/create',
      {

        'bname': this.brandName.value,
        'bdescription': this.brandDescription.value,
      }, httpOptions)
      .subscribe(
        data => {
          console.log('POST Request is successful ', data);
          this.ngOnInit();
          this.backProduct();
        },
        error => {
          console.log('Error', error);
        }
      );
  }

  ngOnInit() {
    this.getAllBrand();
    this.getAllProduct();
    this.brandNew = false;
  }

}
