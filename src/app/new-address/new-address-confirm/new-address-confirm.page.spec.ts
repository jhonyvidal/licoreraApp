import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewAddressConfirmPage } from './new-address-confirm.page';

describe('NewAddressConfirmPage', () => {
  let component: NewAddressConfirmPage;
  let fixture: ComponentFixture<NewAddressConfirmPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewAddressConfirmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
