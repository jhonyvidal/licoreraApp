import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserExchangesPage } from './user-exchanges.page';

describe('UserExchangesPage', () => {
  let component: UserExchangesPage;
  let fixture: ComponentFixture<UserExchangesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserExchangesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
