import { Component, ViewEncapsulation } from '@angular/core';

import { RootConfigService } from '@root/services/config.service';
import { rootAnimations } from '@root/animations';

@Component({
    selector     : 'mail-confirm',
    templateUrl  : './mail-confirm.component.html',
    styleUrls    : ['./mail-confirm.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : rootAnimations
})
export class MailConfirmComponent
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
