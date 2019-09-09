import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RootConfigService } from '@root/services/config.service';
import { rootAnimations } from '@root/animations';

@Component({
    selector     : 'coming-soon',
    templateUrl  : './coming-soon.component.html',
    styleUrls    : ['./coming-soon.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : rootAnimations
})
export class ComingSoonComponent implements OnInit
{
    comingSoonForm: FormGroup;

    /**
     * Constructor
     *
     * @param {RootConfigService} _rootConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _rootConfigService: RootConfigService,
        private _formBuilder: FormBuilder
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

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.comingSoonForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }
}
