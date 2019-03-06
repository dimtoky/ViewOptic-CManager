import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiClientService } from '../api-client.service';
import { ApiPostClientService } from '../api-post-client.service';
import { MatSnackBar } from '@angular/material';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ApiClientService]
})
export class ProductComponent implements OnInit {

  @Output() refresh = new EventEmitter<boolean>();
  @Input() productData: any;
  @Input() brandData: any;
  @Input() productSelected: boolean;
  product: any;
  @Input() productNew: boolean;
  prArray: any[] = [];
  productName = new FormControl('');
  productIdBrand = new FormControl('');
  productPrice = new FormControl('');
  productForme = new FormControl('');
  productDescription = new FormControl('');
  productAvailable = new FormControl('');
  productGender = new FormControl('');
  productAge = new FormControl('');
  productSize = new FormControl('');
  productColor = new FormControl('');
  productRim = new FormControl('');
  productMaterial = new FormControl('');
  image = new FormControl('');
  fileToUpload;


  constructor(private postservice: ApiPostClientService, private snackBar: MatSnackBar, private apiservice: ApiClientService) {
    this.postservice.componentMethodCalled$.subscribe(
      () => {
        this.refresh.emit();
        this.backProduct();
      }
    );
  }


  onFileChanged(event) {
    if (event.target.files.length <= 3) {
      this.fileToUpload = <Array<File>>event.target.files;
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        const reader2 = new FileReader();
        const reader3 = new FileReader();
        reader.onload = (e: any) => { (<HTMLImageElement>document.getElementById('img1')).src = e.target.result; };
        reader2.onload = (e: any) => { (<HTMLImageElement>document.getElementById('img2')).src = e.target.result; };
        reader3.onload = (e: any) => { (<HTMLImageElement>document.getElementById('img3')).src = e.target.result; };
        reader.readAsDataURL(this.fileToUpload[0]);
        reader2.readAsDataURL(this.fileToUpload[1]);
        reader3.readAsDataURL(this.fileToUpload[2]);
      }
    } else {
      this.snackBar.open('Limite de 3 images depassée', 'OK', {
        duration: 4000,
      });
    }

  }

  createProduct() {
    this.prArray['pname'] = this.productName.value;
    this.prArray['idBrand'] = this.productIdBrand.value;
    this.prArray['price'] = this.productPrice.value;
    this.prArray['forme'] = this.productForme.value;
    this.prArray['description'] = this.productDescription.value;
    this.prArray['gender'] = this.productGender.value;
    this.prArray['age'] = this.productAge.value;
    this.prArray['size'] = this.productSize.value;
    this.prArray['color'] = this.productColor.value;
    this.prArray['rim'] = this.productRim.value;
    this.prArray['material'] = this.productMaterial.value;


    console.log(this.prArray);
    for (let i = 0; i < 4; i++) {
      if ((this.fileToUpload[i] === undefined) || (this.fileToUpload[i] === null)) {
        this.prArray['image' + (i + 1)] = 'none.png';
      } else {
        this.prArray['image' + (i + 1)] = this.fileToUpload[i].name;
        this.postservice.postImage(this.fileToUpload[i]);
      }
    }
    this.postservice.postProduct(this.prArray);


    this.snackBar.open('Monture Ajoutée', 'OK', {
      duration: 8000,
    });
  }



  selectProduct(product) {
    this.productSelected = true;
    this.prArray['id'] = product['id'];
    this.productName.setValue(product['pname']);
    this.productIdBrand.setValue(product['idBrand']);
    this.productPrice.setValue(product['price']);
    this.productForme.setValue(product['forme']);
    this.productDescription.setValue(product['description']);
    this.productAvailable.setValue(product['isAvailable']);
    this.productGender.setValue(product['gender']);
    this.productAge.setValue(product['age']);
    this.productSize.setValue(product['size']);
    this.productColor.setValue(product['couleur']);
    this.productRim.setValue(product['rimtype']);
    this.productMaterial.setValue(product['material']);
    this.product = product;

  }

  deleteProduct(id) {
    this.postservice.deleteProduct(id);


    this.snackBar.open('Monture supprimée', 'OK', {
      duration: 8000,
    });
  }

  modifyproduct() {
    this.prArray['pname'] = this.productName.value;
    this.prArray['idBrand'] = this.productIdBrand.value;
    this.prArray['price'] = this.productPrice.value;
    this.prArray['forme'] = this.productForme.value;
    this.prArray['description'] = this.productDescription.value;
    this.prArray['isAvailable'] = this.productAvailable.value;
    this.prArray['gender'] = this.productGender.value;
    this.prArray['age'] = this.productAge.value;
    this.prArray['size'] = this.productSize.value;
    this.prArray['color'] = this.productColor.value;
    this.prArray['rim'] = this.productRim.value;
    this.prArray['material'] = this.productMaterial.value;
    if ((this.fileToUpload === undefined) || (this.fileToUpload === null)) {
      this.prArray['image1'] = this.product['imgPath1'];
      this.prArray['image2'] = this.product['imgPath2'];
      this.prArray['image3'] = this.product['imgPath3'];
    } else {
      console.log(this.fileToUpload + 'files null');
      this.prArray['image1'] = this.fileToUpload[0].name;
      this.prArray['image2'] = this.fileToUpload[1].name;
      this.prArray['image3'] = this.fileToUpload[2].name;
      for (let i = 0; i < 3; i++) {
        if ((this.product['imgPath' + i] !== this.fileToUpload[i].name) && (this.fileToUpload[i] !== undefined)) {
          this.postservice.postImage(this.fileToUpload[i]);
        }
      }
    }

    this.postservice.changeProduct(this.prArray);
    console.log(this.prArray);
    this.getAllProduct();

    this.backProduct();
    this.snackBar.open('Monture modifiée', 'OK', {
      duration: 8000,
    });

  }

  backProduct() {
    this.productSelected = false;
    this.productNew = false;
    this.product = null;
    this.fileToUpload = null;
  }

  addNew() {
    this.productName.setValue('');
    this.productIdBrand.setValue('');
    this.productPrice.setValue('');
    this.productForme.setValue('');
    this.productDescription.setValue('');
    this.productAvailable.setValue('true');
    this.productGender.setValue('');
    this.productAge.setValue('');
    this.productSize.setValue('');
    this.productColor.setValue('');
    this.productRim.setValue('');
    this.productMaterial.setValue('');
    this.fileToUpload = null;
    this.productSelected = false;
    this.productNew = true;

  }

  getAllProduct() {
    this.apiservice.loadProductsdata().subscribe(data => {
      this.productData = data['products'];
      console.log(this.productData);
    });
  }

  ngOnInit() {
    this.productSelected = false;
    this.productNew = false;
  }

}
