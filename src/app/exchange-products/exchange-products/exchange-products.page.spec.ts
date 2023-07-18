import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ExchangeProductsPage } from './exchange-products.page';

describe('ExchangeProductsPage', () => {
  let component: ExchangeProductsPage;
  let fixture: ComponentFixture<ExchangeProductsPage>;

  beforeEach(waitForAsync () => {
    fixture = TestBed.createComponent(ExchangeProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
