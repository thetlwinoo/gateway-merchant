import { IProducts } from '@root/models';
import {
    createSelector,
    createFeatureSelector,
    combineReducers,
    Action,
} from '@ngrx/store';
import * as fromFetch from 'app/ngrx/products/reducers/fetch.reducer';
import * as fromCategory from 'app/ngrx/products/reducers/category.reducer';
import * as fromRoot from 'app/ngrx';
import { ITEMS_PER_PAGE } from '@root/constants';
import { TreeNode } from 'primeng/api';
export const productsFeatureKey = 'products';

export interface ProductsState {
    [fromFetch.fetchFeatureKey]: fromFetch.State;
    [fromCategory.categoryFeatureKey]: fromCategory.State;
}

export interface State extends fromRoot.State {
    [productsFeatureKey]: ProductsState;
}

export function reducers(state: ProductsState | undefined, action: Action) {
    return combineReducers({
        [fromFetch.fetchFeatureKey]: fromFetch.reducer,
        [fromCategory.categoryFeatureKey]: fromCategory.reducer,
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

export const getFetchBrands = createSelector(
    getFetchState,
    fromFetch.getBrands
);

export const getFetchProductChoice = createSelector(
    getFetchState,
    fromFetch.getProductChoice
);

export const getFetchProductAttributeList = createSelector(
    getFetchState,
    fromFetch.getProductAttributeList
);

export const getFetchProductOptionList = createSelector(
    getFetchState,
    fromFetch.getProductOptionList
);

//Category State
export const getCategoryState = createSelector(
    getProductsState,
    (state: ProductsState) => state.category
);

export const getSelectedCategoryId = createSelector(
    getCategoryState,
    fromCategory.getSelectedId
);

export const getSelectedCategory = createSelector(
    getFetchCategories,
    getSelectedCategoryId,
    (entities, selectedId) => findById(entities, selectedId) || null
);

function findById(data, id) {
    if (!data || !id) return null;
    for (const datum of data) {
        if (datum.id == id) return datum
        if (datum.children) {
            let result = findById(datum.children, id)
            if (result) return result
        }
    }
}

