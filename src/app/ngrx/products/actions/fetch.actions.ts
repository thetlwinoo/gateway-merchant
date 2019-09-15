import { createAction, props } from '@ngrx/store';

import { IProductCategory, IProductModel } from '@root/models';

export const fetchCategories = createAction('[Products/API] Fetch Categories');

export const fetchCategoriesSuccess = createAction(
    '[Products/API] Fetch Categories Success',
    props<{ categories: any[] }>()
);

export const fetchModels = createAction('[Products/API] Fetch Models');

export const fetchModelsSuccess = createAction(
    '[Products/API] Fetch Models Success',
    props<{ models: IProductModel[] }>()
);

export const fetchFailure = createAction(
    '[Products/API] Fetch Failure',
    props<{ errorMsg: string }>()
);