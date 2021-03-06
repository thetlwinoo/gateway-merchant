import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RootModule } from '@root/root.module';
import { RootSharedModule } from '@root/shared.module';
import { RootProgressBarModule, RootSidebarModule, RootThemeOptionsModule } from '@root/components';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ROOT_REDUCERS, metaReducers } from 'app/ngrx';
import { NgrxCoreModule } from 'app/ngrx/core';
import { RouterEffects } from 'app/ngrx/core/effects';
import { AuthModule } from 'app/ngrx/auth';

import { rootConfig } from 'app/root-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { DashboardModule } from 'app/main/dashboard/dashboard.module';

import { NgxWebstorageModule } from 'ngx-webstorage';
import { NgJhipsterModule } from 'ng-jhipster';

import { AuthInterceptor } from '@root/blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from '@root/blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from '@root/blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from '@root/blocks/interceptor/notification.interceptor';
import { NgrxProductsModule } from 'app/ngrx/products';

const appRoutes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    {
        path: 'dashboard',
        loadChildren: './main/dashboard/dashboard.module#DashboardModule'
    },
    {
        path: 'products',
        loadChildren: './main/products/products.module#ProductsModule'
    },
    {
        path: 'pages',
        loadChildren: './main/pages/pages.module#PagesModule'
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),

        NgxWebstorageModule.forRoot({ prefix: 'jhi', separator: '-' }),
        NgJhipsterModule.forRoot({
            // set below to true to make alerts look like toast
            alertAsToast: false,
            alertTimeout: 5000,
            i18nEnabled: false
        }),
        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Root modules
        RootModule.forRoot(rootConfig),
        RootProgressBarModule,
        RootSharedModule,
        RootSidebarModule,
        RootThemeOptionsModule,

        // App modules
        LayoutModule,
        DashboardModule,

        // NGRX
        StoreModule.forRoot(ROOT_REDUCERS, {
            metaReducers,
            // runtimeChecks: {
            //   strictStateImmutability: true,
            //   strictActionImmutability: true,
            //   strictStateSerializability: true,
            //   strictActionSerializability: true,
            // },
        }),
        StoreRouterConnectingModule.forRoot({
            routerState: RouterState.Minimal,
        }),
        StoreDevtoolsModule.instrument({
            name: 'NgRx Merchant App',
            // In a production build you would want to disable the Store Devtools
            // logOnly: environment.production,
        }),
        EffectsModule.forRoot([RouterEffects]),
        AuthModule,

        NgrxProductsModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true
        }
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
