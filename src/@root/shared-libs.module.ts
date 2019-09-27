import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgJhipsterModule } from 'ng-jhipster';
import { CookieModule } from 'ngx-cookie';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule, MatTooltipModule, MatProgressSpinnerModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { MatListModule } from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';

import { MatSelectFilterModule } from 'mat-select-filter';

import { TreeModule } from 'primeng/tree';
import { TableModule } from 'primeng/table';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { OverlayPanelModule } from 'primeng/overlaypanel';

import { NgxPicaModule } from '@digitalascetic/ngx-pica';
@NgModule({
    imports: [
        CookieModule.forRoot(),
        FontAwesomeModule,

        MatButtonModule,
        MatChipsModule,
        MatRippleModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatSelectModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatMenuModule,
        MatToolbarModule,
        MatDialogModule,
        MatListModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        NgxChartsModule,
        AgmCoreModule,

        MatSelectFilterModule,
        NgxPicaModule,
        //primeng modules
        TreeModule,
        TableModule,
        EditorModule,
        InputTextModule,
        DropdownModule,
        OverlayPanelModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        NgbModule,
        NgJhipsterModule,
        FontAwesomeModule,

        MatButtonModule,
        MatChipsModule,
        MatRippleModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatSelectModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatMenuModule,
        MatToolbarModule,
        MatDialogModule,
        MatListModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        NgxChartsModule,
        AgmCoreModule,

        MatSelectFilterModule,
        NgxPicaModule,
        //primeng modules
        TreeModule,
        TableModule,
        EditorModule,
        InputTextModule,
        DropdownModule,
        OverlayPanelModule
    ]
})
export class ResourceSharedLibsModule {
    static forRoot() {
        return {
            ngModule: ResourceSharedLibsModule
        };
    }
}