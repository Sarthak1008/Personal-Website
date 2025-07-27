import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodingJourneyComponent } from './coding-journey.component';

describe('CodingJourneyComponent', () => {
  let component: CodingJourneyComponent;
  let fixture: ComponentFixture<CodingJourneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodingJourneyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CodingJourneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
