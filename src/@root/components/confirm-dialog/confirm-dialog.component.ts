import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector   : 'root-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls  : ['./confirm-dialog.component.scss']
})
export class RootConfirmDialogComponent
{
    public confirmMessage: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<RootConfirmDialogComponent>} dialogRef
     */
    constructor(
        public dialogRef: MatDialogRef<RootConfirmDialogComponent>
    )
    {
    }

}
