import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RootTranslationLoaderService } from '@root/services/translation-loader.service';
import { rootAnimations } from '@root/animations';

import { locale as english } from './i18n/en';
import { locale as myanmar } from './i18n/mm';

@Component({
  selector: 'app-manage-images',
  templateUrl: './manage-images.component.html',
  styleUrls: ['./manage-images.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: rootAnimations
})
export class ManageImagesComponent implements OnInit {

  constructor(
    private _rootTranslationLoaderService: RootTranslationLoaderService
  ) { }

  ngOnInit() {
    this._rootTranslationLoaderService.loadTranslations(english, myanmar);
  }

}
