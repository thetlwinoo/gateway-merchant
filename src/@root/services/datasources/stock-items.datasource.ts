import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of } from "rxjs";
import { IStockItems, IPhotos, Photos } from "@root/models";
import { StockItemsService, PhotosService } from "@root/services";
import { catchError, finalize, filter, map } from "rxjs/operators";
import { HttpResponse } from '@angular/common/http';


export class StockItemsDataSource implements DataSource<IStockItems> {

    private stockItemsSubject = new BehaviorSubject<IStockItems[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(
        private stockItemsService: StockItemsService,
        private photosService: PhotosService
    ) {

    }

    loadStockItems(query: any) {

        this.loadingSubject.next(true);

        this.stockItemsService.query(query)
            .pipe(
                filter((res: HttpResponse<IStockItems[]>) => res.ok),
                map((res: HttpResponse<IStockItems[]>) => res.body),
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(stockItems => {
                stockItems.forEach(stockItem => {
                    this.photosService
                        .query({
                            'stockItemId.equals': stockItem.id
                        })
                        .pipe(
                            filter((res: HttpResponse<IPhotos[]>) => res.ok),
                            map((res: HttpResponse<IPhotos[]>) => res.body)
                        )
                        .subscribe((res: IPhotos[]) => {

                            if (res.length) {
                                const _length = res.length;
                                for (var _i = 0; _i < (8 - _length); _i++) {
                                    const newPhoto = new Photos();
                                    res.push(newPhoto);
                                }
                            } else {
                                for (var _i = 0; _i < 8; _i++) {
                                    const newPhoto = new Photos();
                                    res.push(newPhoto);
                                }
                            }

                            stockItem.photoLists = res;
                        });
                });
                console.log('stockitems', stockItems);
                return this.stockItemsSubject.next(stockItems);
            });

    }

    connect(collectionViewer: CollectionViewer): Observable<IStockItems[]> {
        console.log("Connecting data source");
        return this.stockItemsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.stockItemsSubject.complete();
        this.loadingSubject.complete();
    }

}
