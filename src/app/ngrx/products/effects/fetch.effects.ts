import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { asyncScheduler, EMPTY as empty, of } from 'rxjs';
import { catchError, debounceTime, map, skip, switchMap, takeUntil, filter } from 'rxjs/operators';
import { IProductCategory, IProductModel } from '@root/models';
import { FetchActions } from '../actions';
import { ProductCategoryService, ProductModelService } from '@root/services';

@Injectable()
export class FetchEffects {
    fetchCategories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FetchActions.fetchCategories),
            switchMap(() =>
                this.productCategoryService.fetch().pipe(
                    filter((res: HttpResponse<any[]>) => res.ok),
                    map((res: HttpResponse<any[]>) =>
                        FetchActions.fetchCategoriesSuccess({ categories: res.body })
                    ),
                    catchError(err =>
                        of(FetchActions.fetchFailure({ errorMsg: err.message }))
                    )
                )
            )
        )
    );

    fetchModels$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FetchActions.fetchModels),
            switchMap(() =>
                this.productModelService.query().pipe(
                    filter((res: HttpResponse<IProductModel[]>) => res.ok),
                    map((res: HttpResponse<IProductModel[]>) =>
                        FetchActions.fetchModelsSuccess({ models: res.body })
                    ),
                    catchError(err =>
                        of(FetchActions.fetchFailure({ errorMsg: err.message }))
                    )
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private productCategoryService: ProductCategoryService,
        private productModelService: ProductModelService
    ) { }
}
