import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { RootConfirmDialogComponent } from '@root/components/confirm-dialog/confirm-dialog.component';

@NgModule({
    declarations: [
        RootConfirmDialogComponent
    ],
    imports: [
        MatDialogModule,
        MatButtonModule
    ],
    entryComponents: [
        RootConfirmDialogComponent
    ],
})
export class RootConfirmDialogModule
{
}
