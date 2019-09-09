import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

import { RootDemoContentComponent } from './demo-content/demo-content.component';
import { RootDemoSidebarComponent } from './demo-sidebar/demo-sidebar.component';

@NgModule({
    declarations: [
        RootDemoContentComponent,
        RootDemoSidebarComponent
    ],
    imports     : [
        RouterModule,

        MatDividerModule,
        MatListModule
    ],
    exports     : [
        RootDemoContentComponent,
        RootDemoSidebarComponent
    ]
})
export class RootDemoModule
{
}
