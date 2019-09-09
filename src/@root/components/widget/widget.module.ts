import { NgModule } from '@angular/core';

import { RootWidgetComponent } from './widget.component';
import { RootWidgetToggleDirective } from './widget-toggle.directive';

@NgModule({
    declarations: [
        RootWidgetComponent,
        RootWidgetToggleDirective
    ],
    exports     : [
        RootWidgetComponent,
        RootWidgetToggleDirective
    ],
})
export class RootWidgetModule
{
}
