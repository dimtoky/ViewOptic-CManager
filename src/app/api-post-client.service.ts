import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
const serverURL = 'http://localhost:8080/';
@Injectable({
  providedIn: 'root'
})
export class ApiPostClientService {

 // Observable string sources
 private componentMethodCallSource = new Subject<any>();

 // Observable string streams
 componentMethodCalled$ = this.componentMethodCallSource.asObservable();


  constructor(private http: HttpClient) { }


  postProduct(prArray) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(serverURL + 'api/products/create',
      {
        'idBrand': prArray['idBrand'],
        'pname': prArray['pname'],
        'price': prArray['price'],
        'forme': prArray['forme'],
        'description': prArray['description'],
        'isAvailable': prArray['isAvailable'],
        'age': prArray['age'],
        'size': prArray['size'],
        'rimtype': prArray['rim'],
        'material': prArray['material'],
        'gender': prArray['gender'],
        'color': prArray['color'],
        'imgPath1': prArray['image1'],
        'imgPath2': prArray['image2'],
        'imgPath3': prArray['image3']
      }, httpOptions)
      .subscribe(
        data => {
          console.log('POST Request is successful ', data);
          this.componentMethodCallSource.next();
        },
        error => {


          console.log('Error', error);

        }

      );
  }

  postImage(selectedFile) {
    // this.http is the injected HttpClient
    const uploadData = new FormData();
    uploadData.append('image', selectedFile, selectedFile.name);
    this.http.post(serverURL + 'api/products/img/add', uploadData)
      .subscribe(event => {
        console.log(event); // handle event here
      });
  }

  changeProduct(prArray) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(serverURL + 'api/products/update/' + prArray['id'],
      {
        'idBrand': prArray['idBrand'],
        'pname': prArray['pname'],
        'price': prArray['price'],
        'forme': prArray['forme'],
        'description': prArray['description'],
        'isAvailable': prArray['isAvailable'],
        'age': prArray['age'],
        'size': prArray['size'],
        'rimtype': prArray['rim'],
        'material': prArray['material'],
        'gender': prArray['gender'],
        'color': prArray['color'],
        'imgPath1': prArray['image1'],
        'imgPath2': prArray['image2'],
        'imgPath3': prArray['image3']
      }, httpOptions)
      .subscribe(
        data => {
          console.log('POST Request is successful ', data);
          this.componentMethodCallSource.next();
        },
        error => {
          console.log('Error', error);
        }
      );
  }

  deleteProduct(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.http.post(serverURL + 'api/products/delete/', { 'id': id }, httpOptions)
      .subscribe(event => {
        console.log(event); // handle event here
        this.componentMethodCallSource.next();
      },
        error => {
          console.log('Error', error);
        });
  }
}
