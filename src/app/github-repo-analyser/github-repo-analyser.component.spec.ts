import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubRepoAnalyserComponent } from './github-repo-analyser.component';

describe('GithubRepoAnalyserComponent', () => {
  let component: GithubRepoAnalyserComponent;
  let fixture: ComponentFixture<GithubRepoAnalyserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GithubRepoAnalyserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GithubRepoAnalyserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
