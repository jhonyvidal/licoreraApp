import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CampaignDetailsPage } from './campaign-details.page';

describe('CampaignDetailsPage', () => {
  let component: CampaignDetailsPage;
  let fixture: ComponentFixture<CampaignDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CampaignDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
