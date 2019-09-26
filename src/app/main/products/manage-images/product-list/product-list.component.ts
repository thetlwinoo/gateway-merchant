import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { rootAnimations } from '@root/animations';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject, of, fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { StockItemsService, PhotosService } from '@root/services';
import { StockItemsDataSource } from '@root/services';
import { ImageUtils } from '@root/services/image-util.service';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: rootAnimations
})
export class ProductListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('input', { static: false }) input: ElementRef;

  routeData: any;
  totalItems: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;
  error: any;
  links: any;

  files: any;
  dataSource: StockItemsDataSource | null;
  displayedColumns = ['stockItemName', 'sellerSKU', 'photoList'];
  private _unsubscribeAll: Subject<any>;

  constructor(
    private stockItemsService: StockItemsService,
    private photosService: PhotosService,
    protected dataUtils: JhiDataUtils,
    private imageUtils: ImageUtils,
    protected elementRef: ElementRef,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.dataSource = new StockItemsDataSource(this.stockItemsService, this.photosService);
    this.loadAll();
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // fromEvent(this.input.nativeElement, 'keyup')
    //   .pipe(
    //     debounceTime(150),
    //     distinctUntilChanged(),
    //     tap(() => {
    //       this.paginator.pageIndex = 0;

    //       this.loadAll();
    //     })
    //   )
    //   .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadAll())
      )
      .subscribe();
  }

  loadAll() {
    this.dataSource.loadStockItems(
      {
        page: this.paginator ? this.paginator.pageIndex : 0,
        size: this.paginator ? this.paginator.pageSize : 20,
        // sort: this.sort ? this.sort.direction : 'asc'
      }
    );
  }

  setFileData(event, entity, field, isImage) {
    this.imageUtils.handleFiles(event, entity, 'thumbnailPhotoBlob', isImage);
    this.dataUtils.setFileData(event, entity, field, isImage);
  }

  clearInputImage(event) {
    this.dataUtils.clearInputImage(event, this.elementRef, 'thumbnailPhotoBlob', 'thumbnailPhotoBlobContentType', 'fileImage');
    this.dataUtils.clearInputImage(event, this.elementRef, 'originalPhotoBlob', 'originalPhotoBlobContentType', 'fileImage');
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
