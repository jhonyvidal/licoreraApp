import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeggestionsPage } from './suggestions.page';

describe('SeggestionsPage', () => {
  let component: SeggestionsPage;
  let fixture: ComponentFixture<SeggestionsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SeggestionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
