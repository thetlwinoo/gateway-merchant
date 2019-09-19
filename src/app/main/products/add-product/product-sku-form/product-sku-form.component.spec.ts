import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSkuFormComponent } from './product-sku-form.component';

describe('ProductSkuFormComponent', () => {
  let component: ProductSkuFormComponent;
  let fixture: ComponentFixture<ProductSkuFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSkuFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSkuFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
