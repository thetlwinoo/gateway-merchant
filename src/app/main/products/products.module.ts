import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
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
    path: 'manage-products/:id',
    component: AddProductComponent,
    resolve: {
      data: ManageProductService
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
