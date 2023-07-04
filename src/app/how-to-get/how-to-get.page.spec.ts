import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HowToGetPage } from './how-to-get.page';

describe('HowToGetPage', () => {
  let component: HowToGetPage;
  let fixture: ComponentFixture<HowToGetPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HowToGetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
