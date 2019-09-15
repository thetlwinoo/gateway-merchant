import { FetchActions } from 'app/ngrx/products/actions';
import { createReducer, on } from '@ngrx/store';
import { IProductCategory, IProductModel } from '@root/models';

export const fetchFeatureKey = 'fetch';

export interface State {
    categories: any[];
    models: IProductModel[];
    loading: boolean;
    error: string;
}

const initialState: State = {
    categories: [],
    models: [],
    loading: false,
    error: ''
};

export const reducer = createReducer(
    initialState,
    on(
        FetchActions.fetchCategories,
        FetchActions.fetchModels,
        (state) => {
            return {
                ...state,
                loading: true,
                error: ''
            };
        }
    ),
    on(FetchActions.fetchCategoriesSuccess, (state, { categories }) => ({
        ...state,
        categories: categories,
        loading: false,
        error: ''
    })),
    on(FetchActions.fetchModelsSuccess, (state, { models }) => ({
        ...state,
        models: models,
        loading: false,
        error: ''
    })),
)

export const getCategories = (state: State) => state.categories;

export const getModels = (state: State) => state.models;

export const getLoading = (state: State) => state.loading;

export const getError = (state: State) => state.error;