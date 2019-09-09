import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { RootSharedModule } from '@root/shared.module';

import { DashboardComponent } from './dashboard.component';
import { UserRouteAccessService } from '@root/services/core';

const routes = [
    {
        path: '',
        component: DashboardComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DASHBOARD.TITLE'
        },
        canActivate: [UserRouteAccessService]
    }
];

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        TranslateModule,

        RootSharedModule
    ],
    exports: [
        DashboardComponent
    ]
})

export class DashboardModule {
}
