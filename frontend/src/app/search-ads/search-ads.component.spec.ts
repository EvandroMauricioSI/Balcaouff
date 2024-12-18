import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAdsComponent } from './search-ads.component';

describe('SearchAdsComponent', () => {
  let component: SearchAdsComponent;
  let fixture: ComponentFixture<SearchAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchAdsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
