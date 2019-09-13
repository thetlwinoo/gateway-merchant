import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IProducts, IProductCategory } from '@root/models';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  product: IProducts;
  productForm: FormGroup;
  productcategories: IProductCategory[];

  constructor(
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
  }

  createProductForm(): FormGroup {
    return this._formBuilder.group({
      id: [this.product.id],
      productName: [this.product.productName],
      productNumber: [this.product.productNumber],
      searchDetails: [this.product.searchDetails],
      sellStartDate: [this.product.sellStartDate],
      sellEndDate: [this.product.sellEndDate],
      warrantyPeriod: [this.product.warrantyPeriod],
      warrantyPolicy: [this.product.warrantyPolicy],
      whatInTheBox: [this.product.whatInTheBox],
      productCategoryId: [this.product.productCategoryId]
    });
  }
}
