import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { asyncScheduler, EMPTY as empty, of, forkJoin } from 'rxjs';
import { catchError, debounceTime, map, skip, switchMap, takeUntil, filter, exhaustMap, flatMap, mergeMap } from 'rxjs/operators';
import { JhiParseLinks } from 'ng-jhipster';
import { IProducts, IPhotos, IStockItems } from '@root/models';
import { ProductActions } from '../actions';
import { ProductsService, StockItemsService, PhotosService } from '@root/services';
import { IOptions } from 'minimatch';
import * as _ from 'lodash';
import { RootUtils } from '@root/utils';

@Injectable()
export class ProductEffects {
    searchWithNoPaging$ = createEffect(
        () => ({ debounce = 300, scheduler = asyncScheduler } = {}) =>
            this.actions$.pipe(
                ofType(ProductActions.searchProductsWithNoPaging),
                debounceTime(debounce, scheduler),
                switchMap(({ keyword }) => {
                    if (keyword === '') {
                        return empty;
                    }

                    const nextSearch$ = this.actions$.pipe(
                        ofType(ProductActions.searchProductsWithNoPaging),
                        skip(1)
                    );

                    return this.productsService.searchAll(keyword).pipe(
                        takeUntil(nextSearch$),
                        filter((res: HttpResponse<IProducts[]>) => res.ok),
                        map((res: HttpResponse<IProducts[]>) => {
                            const products: IProducts[] = res.body;
                            return ProductActions.searchWithNoPagingSuccess({ products })
                        }),
                        catchError(err =>
                            of(ProductActions.searchFailure({ errorMsg: err.message }))
                        )
                    );
                })
            )
    );

    searchWithPaging$ = createEffect(
        () => ({ debounce = 300, scheduler = asyncScheduler } = {}) =>
            this.actions$.pipe(
                ofType(ProductActions.searchProductsWithPaging),
                debounceTime(debounce, scheduler),
                switchMap(({ query }) => {
                    if (!query) {
                        return empty;
                    }

                    const nextSearch$ = this.actions$.pipe(
                        ofType(ProductActions.searchProductsWithPaging),
                        skip(1)
                    );

                    console.log('final query', query)
                    return this.productsService.search(query).pipe(
                        takeUntil(nextSearch$),
                        filter((res: HttpResponse<IProducts[]>) => res.ok),
                        map((res: HttpResponse<IProducts[]>) => {
                            const _payload = {
                                products: res.body,
                                links: this.parseLinks.parse(res.headers.get('link')),
                                totalItems: parseInt(res.headers.get('X-Total-Count'), 10)
                            }
                            return ProductActions.searchWithPagingSuccess({ payload: _payload })
                        }),
                        catchError(err =>
                            of(ProductActions.searchFailure({ errorMsg: err.message }))
                        )
                    );
                })
            )
    );



    saveProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.saveProduct),
            switchMap(({ product }) => {
                console.log('save product', product)
                if (!product) {
                    return empty;
                }

                return this.productsService.create(product).pipe(
                    filter((res: HttpResponse<IProducts>) => res.ok),
                    switchMap((res: HttpResponse<IProducts>) => [
                        ProductActions.saveProductSuccess({ product: res.body }),
                        ProductActions.saveStockItem({ stockItems: product.stockItemLists }),
                    ]),
                    catchError(err =>
                        of(ProductActions.productFailure({ errorMsg: err.message }))
                    )
                );
            })
        )
    );

    // saveStockItem$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(ProductActions.saveStockItem),
    //         switchMap(({ stockItem }) => {
    //             console.log('save stockItem', stockItem)
    //             if (!stockItem) {
    //                 return empty;
    //             }

    //             return this.stockItemsService.create(stockItem).pipe(
    //                 filter((res: HttpResponse<IStockItems>) => res.ok),
    //                 switchMap((res: HttpResponse<IStockItems>) => [
    //                     ProductActions.saveStockItemSuccess({ stockItem: res.body }),
    //                     // ProductActions.saveStockItemPhoto({ photos: stockItem.photoLists })
    //                 ]),
    //                 catchError(err =>
    //                     of(ProductActions.productFailure({ errorMsg: err.message }))
    //                 )
    //             );
    //         })
    //     )
    // );

    saveStockItemPhoto$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.saveStockItemPhoto),
            switchMap(({ photo }) => {
                console.log('save stockItem', photo)
                if (!photo) {
                    return empty;
                }

                return this.photosService.create(photo).pipe(
                    filter((res: HttpResponse<IPhotos>) => res.ok),
                    map((res: HttpResponse<IPhotos>) => ProductActions.saveStockItemPhotoSuccess({ photo: res.body })),
                    catchError(err =>
                        of(ProductActions.productFailure({ errorMsg: err.message }))
                    )
                );
            })
        )
    );

    saveStockItems$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.saveStockItem),
            exhaustMap(({ stockItems }) => {
                if (!stockItems.length) {
                    return empty;
                }
                return forkJoin(stockItems.map(stockItem =>
                    this.stockItemsService.create(stockItem).pipe(
                        filter((res: HttpResponse<IStockItems>) => res.ok),
                        map((res: HttpResponse<IStockItems>) => ProductActions.saveStockItemSuccess({ stockItem: res.body })
                            // [
                            //     ProductActions.saveStockItemSuccess({ stockItem: res.body }),
                            //     ProductActions.saveStockItemPhoto({ photos: stockItem.photoLists })
                            // ]
                        ),
                        catchError(err =>
                            of(ProductActions.productFailure({ errorMsg: err.message }))
                        )
                    )
                )).pipe(
                    map(() => {
                        return ProductActions.saveStockItemListSuccess();
                    })
                )
            })
        )
    );

    // saveStockItemPhotos$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(ProductActions.saveStockItemPhoto),
    //         exhaustMap(({ photos }) => {
    //             if (!photos.length) {
    //                 return empty;
    //             }

    //             return forkJoin(
    //                 photos.filter(x => RootUtils.notEmpty(x.originalPhotoBlob)).map(photo => {
    //                     this.photosService.create(photo).pipe(
    //                         filter((res: HttpResponse<IPhotos>) => res.ok),
    //                         map((res: HttpResponse<IPhotos>) => ProductActions.saveStockItemPhotoSuccess({ photo: res.body })),
    //                         catchError(err =>
    //                             of(ProductActions.productFailure({ errorMsg: err.message }))
    //                         ))
    //                 })
    //             ).pipe(
    //                 map(() => {
    //                     return ProductActions.saveStockItemPhotoListSuccess();
    //                 })
    //             )
    //         })
    //     )
    // );

    constructor(
        private actions$: Actions,
        private productsService: ProductsService,
        private stockItemsService: StockItemsService,
        private photosService: PhotosService,
        protected parseLinks: JhiParseLinks
    ) { }
}