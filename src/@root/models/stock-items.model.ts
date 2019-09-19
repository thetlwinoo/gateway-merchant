import { Moment } from 'moment';
import { RootUtils } from '@root/utils';
import { IPhotos, Photos } from '@root/models';

export interface IStockItems {
    id?: number;
    stockItemName?: string;
    sellerSKU?: string;
    generatedSKU?: string;
    barcode?: string;
    unitPrice?: number;
    recommendedRetailPrice?: number;
    quantityPerOuter?: number;
    typicalWeightPerUnit?: number;
    typicalLengthPerUnit?: number;
    typicalWidthPerUnit?: number;
    typicalHeightPerUnit?: number;
    marketingComments?: string;
    internalComments?: string;
    discontinuedDate?: Moment;
    sellCount?: number;
    customFields?: string;
    thumbnailUrl?: string;
    reviewLineId?: number;
    productProductName?: string;
    productId?: number;
    lengthUnitMeasureCodeUnitMeasureCode?: string;
    lengthUnitMeasureCodeId?: number;
    weightUnitMeasureCodeUnitMeasureCode?: string;
    weightUnitMeasureCodeId?: number;
    widthUnitMeasureCodeUnitMeasureCode?: string;
    widthUnitMeasureCodeId?: number;
    heightUnitMeasureCodeUnitMeasureCode?: string;
    heightUnitMeasureCodeId?: number;
    productAttributeValue?: string;
    productAttributeId?: number;
    productOptionValue?: string;
    productOptionId?: number;
    stockItemHoldingId?: number;
    photoLists?: IPhotos[];
    guid?: string;
    handle?: string;
}

export class StockItems implements IStockItems {
    constructor(
        public id?: number,
        public stockItemName?: string,
        public sellerSKU?: string,
        public generatedSKU?: string,
        public barcode?: string,
        public unitPrice?: number,
        public recommendedRetailPrice?: number,
        public quantityPerOuter?: number,
        public typicalWeightPerUnit?: number,
        public typicalLengthPerUnit?: number,
        public typicalWidthPerUnit?: number,
        public typicalHeightPerUnit?: number,
        public marketingComments?: string,
        public internalComments?: string,
        public discontinuedDate?: Moment,
        public sellCount?: number,
        public customFields?: string,
        public thumbnailUrl?: string,
        public reviewLineId?: number,
        public productProductName?: string,
        public productId?: number,
        public lengthUnitMeasureCodeUnitMeasureCode?: string,
        public lengthUnitMeasureCodeId?: number,
        public weightUnitMeasureCodeUnitMeasureCode?: string,
        public weightUnitMeasureCodeId?: number,
        public widthUnitMeasureCodeUnitMeasureCode?: string,
        public widthUnitMeasureCodeId?: number,
        public heightUnitMeasureCodeUnitMeasureCode?: string,
        public heightUnitMeasureCodeId?: number,
        public productAttributeValue?: string,
        public productAttributeId?: number,
        public productOptionValue?: string,
        public productOptionId?: number,
        public stockItemHoldingId?: number,
        public photoLists?: IPhotos[],
        public guid?: string,
        public handle?: string
    ) {
        this.guid = RootUtils.generateGUID();
        this.handle = RootUtils.handleize(this.stockItemName);

        if (photoLists && photoLists.length) {
            for (var _i = 0; _i < (8 - photoLists.length); _i++) {
                const IPhotos = new Photos();
                this.photoLists.push(IPhotos);
            }
        } else {
            this.photoLists = [];
            for (var _i = 0; _i < 8; _i++) {
                const IPhotos = new Photos();
                this.photoLists.push(IPhotos);
            }
        }

    }
}
