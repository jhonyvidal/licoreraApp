import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductSearchPage } from './product-search.page';

describe('ProductSearchPage', () => {
  let component: ProductSearchPage;
  let fixture: ComponentFixture<ProductSearchPage>;

  beforeEach((() => {
    fixture = TestBed.createComponent(ProductSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
