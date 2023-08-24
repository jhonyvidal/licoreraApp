import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartCheckoutPage } from './cart-checkout.page';

describe('CartCheckoutPage', () => {
  let component: CartCheckoutPage;
  let fixture: ComponentFixture<CartCheckoutPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CartCheckoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
