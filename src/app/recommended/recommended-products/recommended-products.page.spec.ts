import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecommendedProductsPage } from './recommended-products.page';

describe('RecommendedProductsPage', () => {
  let component: RecommendedProductsPage;
  let fixture: ComponentFixture<RecommendedProductsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RecommendedProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
