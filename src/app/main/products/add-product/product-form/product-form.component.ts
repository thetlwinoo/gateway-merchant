import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IProducts, IProductCategory, Products, IProductModel } from '@root/models';
import { ManageProductService } from '@root/services';
import { RootTranslationLoaderService } from '@root/services/translation-loader.service';

import { locale as english } from '../i18n/en';
import { locale as myanmar } from '../i18n/mm';
import { rootAnimations } from '@root/animations';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CategoryFormComponent } from 'app/main/products/add-product/category-form/category-form.component';
import { TreeNode } from 'primeng/api';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromProducts from 'app/ngrx/products/reducers';
import { FetchActions } from 'app/ngrx/products/actions';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: rootAnimations
})
export class ProductFormComponent implements OnInit, OnDestroy {
  product: IProducts;
  productForm: FormGroup;
  productcategories: IProductCategory[];
  pageType: string;
  dialogRef: any;
  hasSelectedCategory: boolean;
  productModels$: Observable<IProductModel[]>;
  public productModelsFiltered;
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _formBuilder: FormBuilder,
    private _ecommerceProductService: ManageProductService,
    private _rootTranslationLoaderService: RootTranslationLoaderService,
    private store: Store<fromProducts.State>,
    private _matDialog: MatDialog
  ) {
    this.product = new Products();
    this.productModels$ = store.pipe(select(fromProducts.getFetchModels)) as Observable<IProductModel[]>;
    this.productModels$.subscribe(models => this.productModelsFiltered = models.slice())
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
    this.store.dispatch(FetchActions.fetchModels());
    this._rootTranslationLoaderService.loadTranslations(english, myanmar);
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
      productCategoryId: [this.product.productCategoryId],
      productCategoryName: [this.product.productCategoryName],
      productModelId: [this.product.productModelId],
      productModelName: [this.product.productModelProductModelName]
    });
  }

  selectCategory(): void {
    this.dialogRef = this._matDialog.open(CategoryFormComponent, {
      panelClass: 'category-form-dialog',
      data: {
        action: 'select'
      }
    });

    this.dialogRef.afterClosed()
      .subscribe((response: TreeNode) => {
        if (!response) {
          return;
        }

        this.productForm.patchValue({
          productCategoryId: response.data.id,
          productCategoryName: response.label
        })
        // this._contactsService.updateContact(response.getRawValue());
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
