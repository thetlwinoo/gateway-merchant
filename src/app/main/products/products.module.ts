import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { RootSharedModule } from '@root/shared.module';
import { CommonModule } from '@angular/common';
import { UserRouteAccessService } from '@root/services/core';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ManageImagesComponent } from './manage-images/manage-images.component';

const routes = [
  {
    path: 'manage-products',
    component: ManageProductsComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PRODUCTS.TITLE'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'add-product',
    component: AddProductComponent,
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
    ManageImagesComponent
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
  ]
})
export class ProductsModule { }
