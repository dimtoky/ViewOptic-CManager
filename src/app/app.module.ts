import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule, MatCheckboxModule, MatCardModule, MatSidenavModule, MatGridListModule, MatMenuModule, } from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatSliderModule} from '@angular/material/slider';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { ApiClientService } from './api-client.service';
import { ApiPostClientService } from './api-post-client.service';
import {MatListModule} from '@angular/material/list';
import { AddbrandComponent } from './addbrand/addbrand.component';



@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    SidemenuComponent,
    AddbrandComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatSidenavModule,
    MatGridListModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule,
    MatDividerModule,
    MatListModule,
    MatSliderModule
  ],
  providers: [
    ApiClientService,
    ApiPostClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
