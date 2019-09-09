import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { RootDirectivesModule } from '@root/directives/directives';
import { RootPipesModule } from '@root/pipes/pipes.module';
import { ResourceSharedLibsModule, ResourceSharedCommonModule } from './';

@NgModule({
    imports  : [
        CommonModule,
        ResourceSharedLibsModule, 
        ResourceSharedCommonModule,

        FlexLayoutModule,

        RootDirectivesModule,
        RootPipesModule
    ],
    exports  : [
        CommonModule,
        ResourceSharedLibsModule,
        FlexLayoutModule,

        RootDirectivesModule,
        RootPipesModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RootSharedModule
{
}
