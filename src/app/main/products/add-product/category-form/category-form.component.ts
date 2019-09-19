import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IProductCategory } from '@root/models';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  selectedText: string;
  dialogTitle: string;

  constructor(
    public matDialogRef: MatDialogRef<CategoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    private store: Store<fromProducts.State>,
    private _matSnackBar: MatSnackBar,
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
    this._matSnackBar.open(event.node.label, 'OK', {
      verticalPosition: 'bottom',
      duration: 2000
    });
    this.selectedText = event.node.data.parentName ? event.node.data.parentName + '>>' + event.node.label : event.node.label;
  }

}
