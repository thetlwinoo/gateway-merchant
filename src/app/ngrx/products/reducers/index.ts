import { IProducts } from '@root/models';
import {
    createSelector,
    createFeatureSelector,
    combineReducers,
    Action,
} from '@ngrx/store';
import * as fromFetch from 'app/ngrx/products/reducers/fetch.reducer';
import * as fromRoot from 'app/ngrx';
import { ITEMS_PER_PAGE } from '@root/constants';
import { TreeNode } from 'primeng/api';
export const productsFeatureKey = 'products';

export interface ProductsState {
    [fromFetch.fetchFeatureKey]: fromFetch.State;
}

export interface State extends fromRoot.State {
    [productsFeatureKey]: ProductsState;
}

export function reducers(state: ProductsState | undefined, action: Action) {
    return combineReducers({
        [fromFetch.fetchFeatureKey]: fromFetch.reducer,
    })(state, action);
}

export const getProductsState = createFeatureSelector<State, ProductsState>(
    productsFeatureKey
);

//Fetch State
export const getFetchState = createSelector(
    getProductsState,
    (state: ProductsState) => state.fetch
);

export const getFetchError = createSelector(
    getFetchState,
    fromFetch.getError
);

export const getFetchLoading = createSelector(
    getFetchState,
    fromFetch.getLoading
);

export const getFetchCategories = createSelector(
    getFetchState,
    fromFetch.getCategories
);

export const getFetchCategoriesTree = createSelector(
    getFetchCategories,
    (entities) => {

        const treeModel = [];
        entities.map(category => {
            const _category: TreeNode = {                
                label: category.name,
                data: category,
                expandedIcon: "fa fa-folder-open",
                collapsedIcon: "fa fa-folder",
                type: 'category',
                children: []
            }

            category.children.map(subCategory => {
                const _subCategory = {                    
                    label: subCategory.name,
                    data: subCategory,
                    expandedIcon: "fa fa-folder-open",
                    collapsedIcon: "fa fa-folder",
                    type: 'sub-category',
                }
                _category.children.push(_subCategory);
            });

            treeModel.push(_category);
        });

        return treeModel;
    }
);

export const getFetchModels = createSelector(
    getFetchState,
    fromFetch.getModels
);

