import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RecentOrderPage } from './recent-order.page';

describe('RecentOrderPage', () => {
  let component: RecentOrderPage;
  let fixture: ComponentFixture<RecentOrderPage>;

  beforeEach(waitForAsync () => {
    fixture = TestBed.createComponent(RecentOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
