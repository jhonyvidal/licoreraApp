import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RecentOrdersPage } from './recent-orders.page';

describe('RecentOrdersPage', () => {
  let component: RecentOrdersPage;
  let fixture: ComponentFixture<RecentOrdersPage>;

  beforeEach(waitForAsync () => {
    fixture = TestBed.createComponent(RecentOrdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
