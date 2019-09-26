import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { RootTranslationLoaderService } from '@root/services/translation-loader.service';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { rootAnimations } from '@root/animations';
import { RootUtils } from '@root/utils';

import { IProducts, Products, IMerchants, ProductCategory, ProductModel, ProductBrand, ProductAttribute, ProductOption, WarrantyTypes } from '@root/models';
import { ManageProductService, ProductModelService } from '@root/services';

import { locale as english } from './i18n/en';
import { locale as myanmar } from './i18n/mm';

import { select, Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import * as fromProducts from 'app/ngrx/products/reducers';
import * as fromAuth from 'app/ngrx/auth/reducers';
import { ProductActions } from 'app/ngrx/products/actions';
import { MerchantActions } from 'app/ngrx/auth/actions';
import { ProductsDTO } from '@root/dto';

@Component({
  selector: 'add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: rootAnimations
})
export class AddProductComponent implements OnInit, OnDestroy {
  actionsSubscription: Subscription;
  products: ProductsDTO;
  isSaving: boolean;
  pageType: string;
  productsForm: FormGroup;
  selectedTab: number = 0;
  merchant$: Observable<IMerchants>;
  merchant: IMerchants;
  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _ecommerceProductService: ManageProductService,
    private store: Store<fromProducts.State>,
    private storeAuth: Store<fromAuth.State>,
    route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _matSnackBar: MatSnackBar,
    private _rootTranslationLoaderService: RootTranslationLoaderService,
    protected activatedRoute: ActivatedRoute
  ) {
    // this.products = new Products();
    this._unsubscribeAll = new Subject();
    this.merchant$ = storeAuth.pipe(select(fromAuth.getMerchantFetched)) as Observable<IMerchants>;
    this.merchant$.pipe(takeUntil(this._unsubscribeAll)).subscribe(merchant => this.merchant = merchant);

    this.actionsSubscription = route.params
      .pipe(map(params => ProductActions.selectProduct({ id: params.id })))
      .subscribe(action => store.dispatch(action));
  }

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ products }) => {
        this.products = products;
        if (products.id) {
          this.pageType = 'edit';
        } else {
          this.pageType = 'new';
        }
        // this.products.productAttributeList = products.stockItemLists ? [...new Set(products.stockItemLists.map(item => item.productAttribute))] : [];
        // this.products.productOptionList = products.stockItemLists ? [...new Set(products.stockItemLists.map(item => item.productOption))] : [];
        console.log('on thir products', this.products)
        this.productsForm = this.createProductForm();
        console.log('FORM', this.productsForm)
      });
    // this._ecommerceProductService.onProductChanged
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe(product => {

    //     if (product) {
    //       this.products = new Products(product);
    //       this.pageType = 'edit';
    //     }
    //     else {
    //       this.pageType = 'new';
    //       this.products = new Products();
    //     }

    //     this.productsForm = this.createProductForm();
    //   });

    this._rootTranslationLoaderService.loadTranslations(english, myanmar);
  }

  createProductForm(): FormGroup {
    return this._formBuilder.group({
      id: [this.products.id],
      merchantId: [this.products.merchant ? this.products.merchant.id : ''],
      productName: [this.products.productName],
      productNumber: [this.products.productNumber],
      searchDetails: [this.products.searchDetails],
      warrantyPeriod: [this.products.warrantyPeriod],
      warrantyPolicy: [this.products.warrantyPolicy],
      whatInTheBox: [this.products.whatInTheBox],
      stockItemLists: [this.products.stockItemLists],
      warrantyType: [this.products.warrantyType],
      productModel: [this.products.productModel],
      productBrand: [this.products.productBrand],
      productCategory: [this.products.productCategory],
      productCategoryName: [this.products.productCategory ? this.products.productCategory.parent.name + " / " + this.products.productCategory.name : ''],
      productAttributeList: [this.products.productAttributeList],
      productOptionList: [this.products.productOptionList],
      productAttribute: [],
      productOption: []
    });
  }

  saveProduct(): void {
    const data = this.productsForm.getRawValue();
    data.stockItemLists = this.products.stockItemLists;
    data.searchDetails = data.productName ? data.productName : '';
    // data.merchantId = this.merchant ? this.merchant.id : null;
    data.merchant = this.merchant ? this.merchant : null;
    data.productCategory.createdDate = null;
    data.productCategory.lastModifiedDate = null;
    data.handle = data.productName ? RootUtils.handleize(data.productName) : null;
    console.log('before save', data);
    if (this.pageType == 'new') {
      this.store.dispatch(ProductActions.createProduct({ product: data }));
    } else {      
      this.store.dispatch(ProductActions.updateProduct({ product: data }));
    }

    // const _productCategory = new ProductCategory();
    // _productCategory.id = data.productCategory.id;
    // data.productCategory = _productCategory;

    // const _productModel = new ProductModel();
    // _productModel.id = data.productModel.id;
    // data.productModel = _productModel;

    // const _productBrand = new ProductBrand();
    // _productBrand.id = data.productBrand.id;
    // data.productBrand = _productBrand;

    // const _warrantyType = new WarrantyTypes();
    // _warrantyType.id = data.warrantyType.id;
    // data.warrantyType = _warrantyType;


    // data.productNumber = data.handle;

    // data.stockItemLists.map(stockItem => {
    //   const productAttribute = new ProductAttribute();
    //   productAttribute.id = stockItem.productAttributeId;
    //   stockItem.productAttribute = productAttribute;

    //   const productOption = new ProductOption();
    //   productOption.id = stockItem.productOptionId;
    //   stockItem.productOption = productOption;
    // });

    // data.stockItemLists.map(stockItem => {
    //   stockItem.photoLists.filter(x => RootUtils.notEmpty(x.originalPhotoBlob)).map(photo => {
    //     this.store.dispatch(ProductActions.saveStockItemPhoto({ photo: photo, stockItem: stockItem }));
    //   })
    // });

    // this._ecommerceProductService.saveProduct(data)
    //   .then(() => {

    //     // Trigger the subscription with new data
    //     this._ecommerceProductService.onProductChanged.next(data);

    // Show the success message
    this._matSnackBar.open('Product saved', 'OK', {
      verticalPosition: 'top',
      duration: 2000
    });
  }

  addProduct(): void {
    const data = this.productsForm.getRawValue();
    data.handle = RootUtils.handleize(data.name);

    this._ecommerceProductService.addProduct(data)
      .then(() => {
        this._ecommerceProductService.onProductChanged.next(data);

        this._matSnackBar.open('Product added', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });

        this._location.go('apps/e-commerce/products/' + this.products.id);
      });
  }



  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
    this.actionsSubscription.unsubscribe();
  }
}
