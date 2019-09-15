import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IProductCategory } from '@root/models';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromProducts from 'app/ngrx/products/reducers';
import { FetchActions } from 'app/ngrx/products/actions';
import { RootSnackbarService } from '@root/components/snackbar/snackbar.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryFormComponent implements OnInit {
  categories$: Observable<IProductCategory>;
  action: string;
  category: IProductCategory;
  selectedNode: any;
  dialogTitle: string;

  constructor(
    public matDialogRef: MatDialogRef<CategoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    private store: Store<fromProducts.State>,
    private rootSnackbarService: RootSnackbarService
  ) {
    this.action = _data.action;
    this.dialogTitle = 'Select Category';

    this.categories$ = store.pipe(select(fromProducts.getFetchCategoriesTree)) as Observable<IProductCategory>;
  }

  ngOnInit() {
    this.store.dispatch(FetchActions.fetchCategories());
  }

  nodeSelect(event) {
    // this.messageService.add({ severity: 'info', summary: 'Node Selected', detail: event.node.label });
    this.selectedNode = event.node;
    this.rootSnackbarService.open(event.node.label);
  }

}
