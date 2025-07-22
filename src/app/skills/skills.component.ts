import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Skill {
  name: string;
  level: number; // 0-100 scale
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.sass'
})
export class SkillsComponent {
   skillCategories: SkillCategory[] = [
    {
      name: 'Languages',
      skills: [
        { name: 'Java', level: 90 },
        { name: 'Python', level: 85 },
        { name: 'HTML', level: 95 },
        { name: 'CSS', level: 90 },
        { name: 'SQL', level: 90 },
        { name: 'R', level: 70 },
      ]
    },
    {
      name: 'Tools',
      skills: [
        { name: 'VS Code', level: 100 },
        { name: 'GitHub', level: 90 },
        { name: 'GitLab', level: 85 },
        { name: 'Bootstrap', level: 80 },
        { name: 'WordPress', level: 60 },
        { name: 'Jira', level: 70 },
        { name: 'Tableau', level: 80 },
        { name: 'Power BI', level: 80 },
        { name: 'Google Data Studio', level: 70 },
        { name: 'AWS', level: 75 },
        { name: 'GCP', level: 65 },
      ]
    },
    {
      name: 'Technologies',
      skills: [
        { name: 'Spring Boot', level: 90 },
        { name: 'Hibernate', level: 85 },
        { name: 'Apache Kafka', level: 80 },
        { name: 'JDBC', level: 85 },
        { name: 'JUnit & Mockito', level: 85 },
        { name: 'Spring Security', level: 80 },
        { name: 'JWT', level: 80 },
        { name: 'SMTP', level: 75 }
      ]
    },
    {
      name: 'Databases',
      skills: [
        { name: 'MySQL', level: 90 },
        { name: 'PostgreSQL', level: 85 },
        { name: 'MongoDB', level: 75 },
        { name: 'AWS RDS', level: 75 },
        { name: 'Redis', level: 80 }
      ]
    },
    {
      name: 'Monitoring & Observability',
      skills: [
        { name: 'Prometheus', level: 85 },
        { name: 'Grafana', level: 80 },
        { name: 'ELK Stack', level: 85 },
        { name: 'Jaeger', level: 75 },
        { name: 'AlertManager', level: 70 }
      ]
    }
  ];

  skillBars = [
    { label: 'Backend Development', value: 90 },
    { label: 'Tools & DevOps', value: 85 },
    { label: 'Technologies & Frameworks', value: 80 },
    { label: 'Databases', value: 80 },
    { label: 'Monitoring & Observability', value: 75 }
  ];

  updateSkillLevel(skill: Skill, event: Event) {
    const input = event.target as HTMLInputElement;
    skill.level = Number(input.value);
  }
}
