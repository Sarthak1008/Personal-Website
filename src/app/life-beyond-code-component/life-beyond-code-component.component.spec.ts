import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeBeyondCodeComponentComponent } from './life-beyond-code-component.component';

describe('LifeBeyondCodeComponentComponent', () => {
  let component: LifeBeyondCodeComponentComponent;
  let fixture: ComponentFixture<LifeBeyondCodeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LifeBeyondCodeComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LifeBeyondCodeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
