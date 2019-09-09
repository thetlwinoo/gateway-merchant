import { NgModule } from '@angular/core';

import { RootHighlightComponent } from '@root/components/highlight/highlight.component';

@NgModule({
    declarations: [
        RootHighlightComponent
    ],
    exports: [
        RootHighlightComponent
    ],
})
export class RootHighlightModule
{
}
