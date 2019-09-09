import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { RootSearchBarComponent } from './search-bar.component';

@NgModule({
    declarations: [
        RootSearchBarComponent
    ],
    imports     : [
        CommonModule,
        RouterModule,

        MatButtonModule,
        MatIconModule
    ],
    exports     : [
        RootSearchBarComponent
    ]
})
export class RootSearchBarModule
{
}
