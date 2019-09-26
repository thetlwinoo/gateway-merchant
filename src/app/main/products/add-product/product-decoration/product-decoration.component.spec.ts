import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDecorationComponent } from './product-decoration.component';

describe('ProductDecorationComponent', () => {
  let component: ProductDecorationComponent;
  let fixture: ComponentFixture<ProductDecorationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDecorationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDecorationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
