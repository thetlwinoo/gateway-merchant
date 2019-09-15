import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { RootSnackbarComponent } from './snackbar.component';

@NgModule({
    declarations: [
        RootSnackbarComponent
    ],
    imports     : [
        CommonModule,
        RouterModule,

        MatSnackBarModule
    ],
    exports     : [
        RootSnackbarComponent
    ],
    entryComponents:[
        RootSnackbarComponent
    ]
})
export class RootSnackbarModule
{
}
