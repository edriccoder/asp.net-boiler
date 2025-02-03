import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductDialog } from './create-product/create-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';


@NgModule({
  declarations: [
    CreateProductDialog,
    EditProductComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProductModule { }
