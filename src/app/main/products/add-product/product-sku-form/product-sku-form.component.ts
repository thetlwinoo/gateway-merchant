import { Component, OnInit, ViewEncapsulation, Input, OnDestroy, ElementRef, Output, EventEmitter } from '@angular/core';
import { rootAnimations } from '@root/animations';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IProductCategory, IProductChoice, IProductAttribute, IProductOption, IStockItems, StockItems, IProducts, Products } from '@root/models';

import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import * as fromProducts from 'app/ngrx/products/reducers';
import { FetchActions, CategoryActions } from 'app/ngrx/products/actions';
// import { ProductSku } from './product-sku.model';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

const NO_OF_SELECTOR = 8;

@Component({
  selector: 'product-sku-form',
  templateUrl: './product-sku-form.component.html',
  styleUrls: ['./product-sku-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: rootAnimations
})
export class ProductSkuFormComponent implements OnInit, OnDestroy {
  @Input() productsForm: FormGroup;
  @Input() products: Products;
  // @Output() addAttribute = new EventEmitter();
  // @Output() addOption = new EventEmitter();

  category$: Observable<IProductCategory>;
  productChoice$: Observable<IProductChoice[]>;
  productAttributeList$: Observable<IProductAttribute[]>;
  productOptionList$: Observable<IProductOption[]>;
  productChoice: IProductChoice;
  categoryId$: Observable<number>;

  productOptionId: number;
  productAttribueId: number;
  attributeList: IProductAttribute[];
  optionList: IProductOption[];
  stockItemsColumns: any[];

  // productSku: ProductSku;
  private _unsubscribeAll: Subject<any>;

  get counter() {
    return new Array(NO_OF_SELECTOR);
  }

  constructor(
    private store: Store<fromProducts.State>,
    private _formBuilder: FormBuilder,
    protected dataUtils: JhiDataUtils,
    protected elementRef: ElementRef,
  ) {
    // this.productSku = new ProductSku();

    this.categoryId$ = store.pipe(select(fromProducts.getSelectedCategoryId)) as Observable<number>;
    this.productChoice$ = store.pipe(select(fromProducts.getFetchProductChoice)) as Observable<IProductChoice[]>;
    this.productAttributeList$ = store.pipe(select(fromProducts.getFetchProductAttributeList)) as Observable<IProductAttribute[]>;
    this.productOptionList$ = store.pipe(select(fromProducts.getFetchProductOptionList)) as Observable<IProductOption[]>;
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    // this.productForm = this.createProductForm();
    this.stockItemsColumns = [
      { field: 'guid', header: 'guid' },
      { field: 'productAttributeValue', header: 'Attribute' },
      { field: 'productOptionValue', header: 'Option' },
      { field: 'quantityPerOuter', header: 'Quantity' },
      { field: 'recommendedRetailPrice', header: 'RetailPrice' },
      { field: 'unitPrice', header: 'UnitPrice' },
      { field: 'typicalWeightPerUnit', header: 'Weight(kg)' },
      { field: 'typicalLengthPerUnit', header: 'Length(cm)' },
      { field: 'typicalWidthPerUnit', header: 'Width(cm)' },
      { field: 'typicalHeightPerUnit', header: 'Height(cm)' }
    ];

    this.categoryId$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(categoryId => {
        this.store.dispatch(FetchActions.fetchProductChoice({ id: categoryId }));
      });

    this.productChoice$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        if (data.length) {
          this.productChoice = data[0];
        }
      })
  }

  // createProductForm(): FormGroup {
  //   return this._formBuilder.group({
  //     attributeList: [this.product.productAttributeList],
  //     optionList: [this.product.productOptionList],
  //     productAttribute: [],
  //     productOption: [],
  //     stockItemList: [this.product.stockItemLists]
  //   });
  // }  

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, entity, field, isImage) {
    this.dataUtils.setFileData(event, entity, field, isImage);
  }

  clearInputImage(event, field: string, fieldContentType: string, idInput: string) {
    this.dataUtils.clearInputImage(event, this.elementRef, field, fieldContentType, idInput);
  }

  addAttribute(event) {
    const attribute = this.productsForm.getRawValue().productAttribute;
    this.products.addAttribute(attribute);
  }

  addOption(event) {
    const option = this.productsForm.getRawValue().productOption;
    this.products.addOption(option);
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
