import { NgModule } from '@angular/core';

import { RootCountdownComponent } from '@root/components/countdown/countdown.component';

@NgModule({
    declarations: [
        RootCountdownComponent
    ],
    exports: [
        RootCountdownComponent
    ],
})
export class RootCountdownModule
{
}
