import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MissingInfoPage } from './missing-info.page';

describe('MissingInfoPage', () => {
  let component: MissingInfoPage;
  let fixture: ComponentFixture<MissingInfoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MissingInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
