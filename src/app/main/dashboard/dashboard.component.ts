import { Component } from '@angular/core';

import { RootTranslationLoaderService } from '@root/services/translation-loader.service';

import { locale as english } from 'app/navigation/i18n/en';
import { locale as myanmar } from 'app/navigation/i18n/mm';

@Component({
    selector   : 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls  : ['./dashboard.component.scss']
})
export class DashboardComponent
{
    /**
     * Constructor
     *
     * @param {RootTranslationLoaderService} _rootTranslationLoaderService
     */
    constructor(
        private _rootTranslationLoaderService: RootTranslationLoaderService
    )
    {
        this._rootTranslationLoaderService.loadTranslations(english, myanmar);
    }
}
