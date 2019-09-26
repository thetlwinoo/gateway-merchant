import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { rootAnimations } from '@root/animations';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IProducts, Products } from '@root/models';

@Component({
  selector: 'product-decoration',
  templateUrl: './product-decoration.component.html',
  styleUrls: ['./product-decoration.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: rootAnimations
})
export class ProductDecorationComponent implements OnInit {
  @Input() productsForm: FormGroup;
  @Input() products: Products;
  description: string;
  text: string;
  constructor() { }

  ngOnInit() {
  }

}
