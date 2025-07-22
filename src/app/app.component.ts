import { ExperienceComponent } from './experience/experience.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NameComponent } from './name/name.component';
import { AboutComponent } from './about/about.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, MatToolbarModule, MatButtonModule, MatIconModule,
    NameComponent, AboutComponent, NavbarComponent, RecommendationComponent, SkillsComponent,
    ExperienceComponent, ProjectsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'portfolio_sarthak';
}
