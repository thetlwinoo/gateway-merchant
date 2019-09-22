import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ProductsService, StockItemsService } from '@root/services';
import { IProducts, IStockItems } from '@root/models';

@Injectable()
export class ManageProductsService implements Resolve<any>
{
    products: any[];
    onProductsChanged: BehaviorSubject<any>;

    constructor(
        private productsService: ProductsService,
        private stockItemsService: StockItemsService
    ) {
        this.onProductsChanged = new BehaviorSubject({});
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getProducts()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getProducts(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.stockItemsService.query()
                .pipe(
                    filter((res: HttpResponse<IStockItems[]>) => res.ok),
                    map((res: HttpResponse<IStockItems[]>) => res.body)
                )
                .subscribe((response: any) => {
                    console.log('response',response)
                    this.products = response;
                    this.onProductsChanged.next(this.products);
                    resolve(response);
                }, reject);
        });
    }
}
