import { Component, ViewEncapsulation } from '@angular/core';

import { RootConfigService } from '@root/services/config.service';
import { rootAnimations } from '@root/animations';

@Component({
    selector     : 'maintenance',
    templateUrl  : './maintenance.component.html',
    styleUrls    : ['./maintenance.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : rootAnimations
})
export class MaintenanceComponent
{
    /**
     * Constructor
     *
     * @param {RootConfigService} _rootConfigService
     */
    constructor(
        private _rootConfigService: RootConfigService
    )
    {
        // Configure the layout
        this._rootConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }
}
