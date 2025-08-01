import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { NgImageSliderModule } from 'ng-image-slider';
import { AboutComponent } from './about/about.component';
import { CodingJourneyComponent } from "./coding-journey/coding-journey.component";
import { ExperienceComponent } from './experience/experience.component';
import { FooterComponent } from './footer/footer.component';
import { GithubRepoAnalyserComponent } from "./github-repo-analyser/github-repo-analyser.component";
import { HighlightsComponent } from './highlights/highlights.component';
import { InterestComponent } from './interest/interest.component';
import { LifeBeyondCodeComponent } from './life-beyond-code-component/life-beyond-code-component.component';
import { NameComponent } from './name/name.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProjectsComponent } from './projects/projects.component';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { SkillsComponent } from './skills/skills.component';
import { ChatbotComponent } from './chatbot/chatbot.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, MatToolbarModule, MatButtonModule, MatIconModule,
    NameComponent, AboutComponent, NavbarComponent, RecommendationComponent, SkillsComponent,
    ExperienceComponent, ProjectsComponent, LifeBeyondCodeComponent, NgImageSliderModule, InterestComponent, HighlightsComponent, CodingJourneyComponent, GithubRepoAnalyserComponent,ChatbotComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'portfolio_sarthak';
}
