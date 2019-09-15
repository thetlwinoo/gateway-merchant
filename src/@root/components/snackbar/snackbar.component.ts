import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { RootSnackbarService } from '@root/components/snackbar/snackbar.service';


@Component({
    selector     : 'root-snackbar',
    templateUrl  : './snackbar.component.html',
    styleUrls    : ['./snackbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RootSnackbarComponent implements OnInit, OnDestroy
{
    value: string;
    visible: boolean;    

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _rootSnackBarService: RootSnackbarService,
        
    )
    {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void
    {
        // Value
        this._rootSnackBarService.value
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((value) => {
                this.value = value;
            });

        // Visible
        this._rootSnackBarService.visible
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((visible) => {
                this.visible = visible;
            });

    }    

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
