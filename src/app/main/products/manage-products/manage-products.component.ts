import { Component, OnInit } from '@angular/core';
import { RootTranslationLoaderService } from '@root/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as myanmar } from './i18n/mm';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnInit {

  constructor(
    private _rootTranslationLoaderService: RootTranslationLoaderService
  ) { }

  ngOnInit() {
    this._rootTranslationLoaderService.loadTranslations(english, myanmar);
  }

}
