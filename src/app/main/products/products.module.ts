import { NgModule, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { RootSharedModule } from '@root/shared.module';
import { CommonModule } from '@angular/common';
import { UserRouteAccessService } from '@root/services/core';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ManageImagesComponent } from './manage-images/manage-images.component';
import { ManageProductsService } from '@root/services';
import { ManageProductService } from '@root/services';
import { ProductFormComponent } from './add-product/product-form/product-form.component';
import { CategoryFormComponent } from './add-product/category-form/category-form.component';
import { ProductSkuFormComponent } from './add-product/product-sku-form/product-sku-form.component';
import { filter, map } from 'rxjs/operators';
import { IProducts, Products } from '@root/models';
import { ProductsService } from '@root/services';
import { Observable, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProductsResolve implements Resolve<IProducts> {
  constructor(private service: ProductsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProducts> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Products>) => response.ok),
        map((products: HttpResponse<Products>) => products.body)
      );
    }
    return of(new Products());
  }
}

const routes = [
  {
    path: 'manage-products',
    component: ManageProductsComponent,
    resolve: {
      data: ManageProductsService
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PRODUCTS.TITLE'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'manage-products/new',
    component: AddProductComponent,
    resolve: {
      products: ProductsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PRODUCTS.TITLE'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'manage-products/:id/edit',
    component: AddProductComponent,
    resolve: {
      products: ProductsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PRODUCTS.TITLE'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'manage-products/:id/:handle',
    component: AddProductComponent,
    resolve: {
      products: ProductsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PRODUCTS.TITLE'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'manage-images',
    component: ManageImagesComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PRODUCTS.TITLE'
    },
    canActivate: [UserRouteAccessService]
  }
];

@NgModule({
  declarations: [
    ManageProductsComponent,
    AddProductComponent,
    ManageImagesComponent,
    ProductFormComponent,
    CategoryFormComponent,
    ProductSkuFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    RootSharedModule
  ],
  exports: [
    ManageProductsComponent,
    AddProductComponent,
    ManageImagesComponent
  ],
  providers: [
    ManageProductsService,
    ManageProductService
  ],
  entryComponents: [
    CategoryFormComponent
  ]
})
export class ProductsModule { }
