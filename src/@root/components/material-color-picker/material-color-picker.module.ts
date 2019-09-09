import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

import { RootPipesModule } from '@root/pipes/pipes.module';

import { RootMaterialColorPickerComponent } from '@root/components/material-color-picker/material-color-picker.component';

@NgModule({
    declarations: [
        RootMaterialColorPickerComponent
    ],
    imports: [
        CommonModule,

        FlexLayoutModule,

        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatTooltipModule,

        RootPipesModule
    ],
    exports: [
        RootMaterialColorPickerComponent
    ],
})
export class RootMaterialColorPickerModule
{
}
