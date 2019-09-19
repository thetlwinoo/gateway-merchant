import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { RootTranslationLoaderService } from '@root/services/translation-loader.service';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { rootAnimations } from '@root/animations';
import { RootUtils } from '@root/utils';

import { IProducts, Products } from '@root/models';
import { ManageProductService } from '@root/services';

import { locale as english } from './i18n/en';
import { locale as myanmar } from './i18n/mm';

@Component({
  selector: 'add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: rootAnimations
})
export class AddProductComponent implements OnInit, OnDestroy {

  product: Products;
  pageType: string;
  productForm: FormGroup;
  selectedTab: number = 0;
  description: string;
  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _ecommerceProductService: ManageProductService,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _matSnackBar: MatSnackBar,
    private _rootTranslationLoaderService: RootTranslationLoaderService
  ) {
    this.product = new Products();
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {

    this._ecommerceProductService.onProductChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(product => {

        if (product) {
          this.product = new Products(product);
          this.pageType = 'edit';
        }
        else {
          this.pageType = 'new';
          this.product = new Products();
        }

        this.productForm = this.createProductForm();
      });

    this._rootTranslationLoaderService.loadTranslations(english, myanmar);
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  createProductForm(): FormGroup {
    return this._formBuilder.group({
      id: [this.product.id],
      productName: [this.product.productName],
      productNumber: [this.product.productNumber],
      searchDetails: [this.product.searchDetails],
      warrantyPeriod: [this.product.warrantyPeriod],
      warrantyPolicy: [this.product.warrantyPolicy],
      whatInTheBox: [this.product.whatInTheBox],
      stockItemLists: [this.product.stockItemLists],
      warrantyTypeId: [this.product.warrantyTypeId],
      warrantyTypeWarrantyTypeName: [this.product.warrantyTypeWarrantyTypeName],
      productModelId: [this.product.productModelId],
      productModelName: [this.product.productModelProductModelName],
      productBrandId: [this.product.productBrandId],
      productBrandName: [this.product.productBrandProductBrandName],
      productCategoryId: [this.product.productCategoryId],
      productCategoryName: [this.product.productCategoryName],
      productAttributeList: [this.product.productAttributeList],
      productOptionList: [this.product.productOptionList],
      productAttribute: [],
      productOption: []
    });
  }

  saveProduct(): void {
    const data = this.productForm.getRawValue();
    data.handle = RootUtils.handleize(data.name);

    this._ecommerceProductService.saveProduct(data)
      .then(() => {

        // Trigger the subscription with new data
        this._ecommerceProductService.onProductChanged.next(data);

        // Show the success message
        this._matSnackBar.open('Product saved', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
      });
  }

  addProduct(): void {
    const data = this.productForm.getRawValue();
    data.handle = RootUtils.handleize(data.name);

    this._ecommerceProductService.addProduct(data)
      .then(() => {
        this._ecommerceProductService.onProductChanged.next(data);

        this._matSnackBar.open('Product added', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });

        this._location.go('apps/e-commerce/products/' + this.product.id);
      });
  }

  publishProduct(event): void {
    console.log('product form', this.productForm.getRawValue());
  }

  addProductAttribute(event) {
    const attribute = this.productForm.getRawValue().productAttribute;
    this.product.addAttribute(attribute);
  }

  addProductOption(event) {
    const option = this.productForm.getRawValue().productOption;
    this.product.addOption(option);
  }
}
