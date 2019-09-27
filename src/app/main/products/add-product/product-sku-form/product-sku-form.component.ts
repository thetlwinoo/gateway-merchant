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
import { NgxPicaService, NgxPicaErrorInterface } from '@digitalascetic/ngx-pica';
import { ImageUtils } from '@root/services/image-util.service';

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
  frozenCols: any[];

  // productSku: ProductSku;
  private _unsubscribeAll: Subject<any>;
  private productAttributeListCombo: any[] = [];
  private productOptionListCombo: any[] = [];

  constructor(
    private store: Store<fromProducts.State>,
    private _formBuilder: FormBuilder,
    protected dataUtils: JhiDataUtils,
    protected elementRef: ElementRef,
    // private _ngxPicaService: NgxPicaService,
    private imageUtils: ImageUtils,
  ) {
    // this.productSku = new ProductSku();

    this.categoryId$ = store.pipe(select(fromProducts.getSelectedCategoryId)) as Observable<number>;
    this.productChoice$ = store.pipe(select(fromProducts.getFetchProductChoice)) as Observable<IProductChoice[]>;
    this.productAttributeList$ = store.pipe(select(fromProducts.getFetchProductAttributeList)) as Observable<IProductAttribute[]>;
    this.productOptionList$ = store.pipe(select(fromProducts.getFetchProductOptionList)) as Observable<IProductOption[]>;

    this.productAttributeList$.subscribe(data => {
      data.map(item => {
        this.productAttributeListCombo.push({
          label: item.value,
          value: item
        })
      });
    });

    this.productOptionList$.subscribe(data => {
      data.map(item => {
        this.productOptionListCombo.push({
          label: item.value,
          value: item
        })
      });
    });

    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    // this.productForm = this.createProductForm();
    this.stockItemsColumns = [
      { field: 'guid', header: 'guid' },
      { field: 'productAttribute', header: 'Attribute' },
      { field: 'productOption', header: 'Option' },
      { field: 'sellerSKU', header: 'SellerSKU' },
      { field: 'quantityPerOuter', header: 'Quantity' },
      { field: 'recommendedRetailPrice', header: 'RetailPrice' },
      { field: 'unitPrice', header: 'UnitPrice' },
      { field: 'typicalWeightPerUnit', header: 'Weight(kg)' },
      { field: 'typicalLengthPerUnit', header: 'Length(cm)' },
      { field: 'typicalWidthPerUnit', header: 'Width(cm)' },
      { field: 'typicalHeightPerUnit', header: 'Height(cm)' }
    ];

    // this.frozenCols = [
    //   { field: 'productAttribute', header: 'Attribute' },
    //   { field: 'productOption', header: 'Option' },
    //   { field: 'quantityPerOuter', header: 'Quantity' },
    //   { field: 'recommendedRetailPrice', header: 'RetailPrice' },
    //   { field: 'unitPrice', header: 'UnitPrice' }
    // ];

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
    return new Promise((resolve, reject) => {
      Promise.all([
        this.imageUtils.handleFiles(event, entity, 'thumbnailPhotoBlob', isImage),
        this.dataUtils.setFileData(event, entity, field, isImage)
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  clearInputImage(entity) {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.dataUtils.clearInputImage(entity, this.elementRef, 'thumbnailPhotoBlob', 'thumbnailPhotoBlobContentType', 'fileImage'),
        this.dataUtils.clearInputImage(entity, this.elementRef, 'originalPhotoBlob', 'originalPhotoBlobContentType', 'fileImage')
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  addAttribute(event) {
    const attribute = this.productsForm.getRawValue().productAttribute;
    this.products.addAttribute(attribute);
  }

  addOption(event) {
    const option = this.productsForm.getRawValue().productOption;
    this.products.addOption(option);
  }

  // private toBase64(file: File, cb: Function) {
  //   const fileReader: FileReader = new FileReader();
  //   fileReader.onload = function (e: any) {
  //     const base64Data = e.target.result.substr(e.target.result.indexOf('base64,') + 'base64,'.length);
  //     cb(base64Data);
  //   };
  //   fileReader.readAsDataURL(file);
  // }

  // private handleFiles(event: any, entity, field: string, isImage: boolean): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     if (event && event.target && event.target.files && event.target.files[0]) {
  //       const file: File = event.target.files[0];
  //       const files: File[] = event.target.files;
  //       if (isImage && !file.type.startsWith('image/')) {
  //         reject(`File was expected to be an image but was found to be ${file.type}`);
  //       } else {
  //         this._ngxPicaService.resizeImages(files, 256, 256)
  //           .subscribe((imageResized: File) => {
  //             this.toBase64(imageResized, base64Data => {
  //               entity[field] = base64Data;
  //               entity[`${field}ContentType`] = file.type;
  //               resolve(entity);
  //             });

  //           }, (err: NgxPicaErrorInterface) => {
  //             reject(err.err);
  //           });
  //       }
  //     } else {
  //       reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
  //     }
  //   });
  // }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
