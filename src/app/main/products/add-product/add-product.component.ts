import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { RootTranslationLoaderService } from '@root/services/translation-loader.service';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { rootAnimations } from '@root/animations';
import { RootUtils } from '@root/utils';

import { IProducts, Products, IMerchants, ProductCategory, ProductModel, ProductBrand, ProductAttribute, ProductOption } from '@root/models';
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

@Component({
  selector: 'add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: rootAnimations
})
export class AddProductComponent implements OnInit, OnDestroy {
  actionsSubscription: Subscription;
  products: IProducts;
  isSaving: boolean;
  pageType: string;
  productsForm: FormGroup;
  selectedTab: number = 0;
  description: string;
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
        console.log('product', products)
        this.products = products;
        this.productsForm = this.createProductForm();
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
      merchantId: [this.products.merchantId],
      productName: [this.products.productName],
      productNumber: [this.products.productNumber],
      searchDetails: [this.products.searchDetails],
      warrantyPeriod: [this.products.warrantyPeriod],
      warrantyPolicy: [this.products.warrantyPolicy],
      whatInTheBox: [this.products.whatInTheBox],
      stockItemLists: [this.products.stockItemLists],
      warrantyTypeId: [this.products.warrantyTypeId],
      warrantyTypeWarrantyTypeName: [this.products.warrantyTypeWarrantyTypeName],
      productModelId: [this.products.productModelId],
      productModelName: [this.products.productModelProductModelName],
      productBrandId: [this.products.productBrandId],
      productBrandName: [this.products.productBrandProductBrandName],
      productCategoryId: [this.products.productCategoryId],
      productCategoryName: [this.products.productCategoryName],
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

    const _productCategory = new ProductCategory();
    _productCategory.id = data.productCategoryId;
    data.productCategory = _productCategory;

    const _productModel = new ProductModel();
    _productModel.id = data.productModelId;
    data.productModel = _productModel;

    const _productBrand = new ProductBrand();
    _productBrand.id = data.productBrandId;
    data.productBrand = _productBrand;

    data.handle = data.productName ? RootUtils.handleize(data.productName) : null;
    data.productNumber = data.handle;

    data.stockItemLists.map(stockItem => {
      const productAttribute = new ProductAttribute();
      productAttribute.id = stockItem.productAttributeId;
      stockItem.productAttribute = productAttribute;

      const productOption = new ProductOption();
      productOption.id = stockItem.productOptionId;
      stockItem.productOption = productOption;
    });
    
    this.store.dispatch(ProductActions.createProduct({ product: data }));
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
