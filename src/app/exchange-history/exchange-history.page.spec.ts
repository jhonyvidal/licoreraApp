import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExchangeHistoyrPage } from './exchange-history.page';

describe('ExchangeHistoyrPage', () => {
  let component: ExchangeHistoyrPage;
  let fixture: ComponentFixture<ExchangeHistoyrPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ExchangeHistoyrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
