import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewAddressMapPage } from './new-address-map.page';

describe('NewAddressMapPage', () => {
  let component: NewAddressMapPage;
  let fixture: ComponentFixture<NewAddressMapPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewAddressMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
