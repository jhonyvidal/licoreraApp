import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PointEntryPage } from './point-entry.page';

describe('PointEntryPage', () => {
  let component: PointEntryPage;
  let fixture: ComponentFixture<PointEntryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PointEntryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
