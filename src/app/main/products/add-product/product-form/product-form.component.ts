import { Component, OnInit, OnDestroy, ViewEncapsulation, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IProducts, IProductCategory, Products, IProductModel, IMerchants, IProductBrand } from '@root/models';
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
import * as fromAuth from 'app/ngrx/auth/reducers';
import { FetchActions, CategoryActions } from 'app/ngrx/products/actions';
import { MerchantActions } from 'app/ngrx/auth/actions';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: rootAnimations
})
export class ProductFormComponent implements OnInit, OnDestroy {
  // product: IProducts;
  @Input() productForm: FormGroup;
  productcategories: IProductCategory[];
  pageType: string;
  dialogRef: any;
  hasSelectedCategory: boolean;

  productModels$: Observable<IProductModel[]>;
  public productModelsFiltered;

  productBrands$: Observable<IProductBrand[]>;

  merchant$: Observable<IMerchants>;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _formBuilder: FormBuilder,
    private _ecommerceProductService: ManageProductService,
    private _rootTranslationLoaderService: RootTranslationLoaderService,
    private store: Store<fromProducts.State>,
    private authStore: Store<fromAuth.State>,
    private _matDialog: MatDialog
  ) {
    // this.product = new Products();
    this.productModels$ = store.pipe(select(fromProducts.getFetchModels)) as Observable<IProductModel[]>;
    this.productBrands$ = store.pipe(select(fromProducts.getFetchBrands)) as Observable<IProductBrand[]>;
    this.merchant$ = authStore.pipe(select(fromAuth.getMerchantFetched)) as Observable<IMerchants>;
    this.productModels$.subscribe(models => this.productModelsFiltered = models.slice())
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.merchant$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(merchant => {
        if (merchant) {
          this.store.dispatch(FetchActions.fetchModels({ id: merchant.id }));
          this.store.dispatch(FetchActions.fetchBrands({ id: merchant.id }));
        }
      });
    this._rootTranslationLoaderService.loadTranslations(english, myanmar);
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

        this.store.dispatch(CategoryActions.selectCategory({ id: response.data.id }));
        this.productForm.patchValue({
          productCategoryId: response.data.id,
          productCategoryName: response.data.parentName + '>>' + response.label
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
