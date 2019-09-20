import { createAction, props } from '@ngrx/store';

import { IProductCategory, IProductModel, IProductBrand, IProductChoice, IProductAttribute, IProductOption, IWarrantyTypes } from '@root/models';

export const fetchCategories = createAction('[Products/API] Fetch Categories');

export const fetchCategoriesSuccess = createAction(
    '[Products/API] Fetch Categories Success',
    props<{ categories: any[] }>()
);

export const fetchModels = createAction(
    '[Products/API] Fetch Models',
    props<{ id: number }>()
);

export const fetchModelsSuccess = createAction(
    '[Products/API] Fetch Models Success',
    props<{ models: IProductModel[] }>()
);

export const fetchBrands = createAction(
    '[Products/API] Fetch Brands',
    props<{ id: number }>()
);

export const fetchBrandsSuccess = createAction(
    '[Products/API] Fetch Brands Success',
    props<{ brands: IProductBrand[] }>()
);

export const fetchWarrantyType = createAction('[Products/API] Fetch Warranty Type');

export const fetchWarrantyTypeSuccess = createAction(
    '[Products/API] Fetch Warranty Type Success',
    props<{ warrantyTypes: IWarrantyTypes[] }>()
);

export const fetchProductChoice = createAction(
    '[Products/API] Fetch Product Choice',
    props<{ id: number }>()
);

export const fetchProductChoiceSuccess = createAction(
    '[Products/API] Fetch Product Choice Success',
    props<{ choice: IProductChoice[] }>()
);

export const fetchProductAttribute = createAction(
    '[Products/API] Fetch Product Attribute',
    props<{ id: number }>()
);

export const fetchProductAttributeSuccess = createAction(
    '[Products/API] Fetch Product Attribute Success',
    props<{ productAttributeList: IProductAttribute[] }>()
);

export const fetchProductOption = createAction(
    '[Products/API] Fetch Product Option',
    props<{ id: number }>()
);

export const fetchProductOptionSuccess = createAction(
    '[Products/API] Fetch Product Option Success',
    props<{ productOptionList: IProductOption[] }>()
);

export const fetchFailure = createAction(
    '[Products/API] Fetch Failure',
    props<{ errorMsg: string }>()
);