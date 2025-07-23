import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Skill {
  name: string;
  level: number; // 0-100 scale
  icon?: string;
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
        { name: 'Java', level: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
        { name: 'Python', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'HTML', level: 95, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
        { name: 'CSS', level: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
        { name: 'SQL', level: 90 },
        { name: 'R', level: 70, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg' }
      ]
    },
    {
      name: 'Tools',
      skills: [
        {
          name: 'VS Code',
          level: 100,
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg'
        },
        {
          name: 'GitHub',
          level: 90,
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg'
        },
        {
          name: 'GitLab',
          level: 85,
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg'
        },
        {
          name: 'Bootstrap',
          level: 80,
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg'
        },
        {
          name: 'WordPress',
          level: 60,
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg'
        },
        {
          name: 'Jira',
          level: 70,
          icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/jira.svg'
        },
        {
          name: 'Tableau',
          level: 80,
          icon: 'https://cdn.worldvectorlogo.com/logos/tableau-software.svg'
        },
        {
          name: 'Power BI',
          level: 80,
          icon: 'https://cdn.worldvectorlogo.com/logos/power-bi.svg'
        },
        {
          name: 'Google Data Studio',
          level: 70,
          icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzBxBhM8DcLTdlVVtzyr3IU_6-G8FmCGgSMA&s'
        },
        {
          name: 'AWS',
          level: 75,
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg'
        },
        {
          name: 'GCP',
          level: 65,
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg'
        }
      ]
    },
    {
      name: 'Technologies',
      skills: [
        { name: 'Spring Boot', level: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
        { name: 'Hibernate', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hibernate/hibernate-original.svg' },
        { name: 'Apache Kafka', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg' },
        { name: 'JDBC', level: 85 , icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmT5h5HEkiMWGX0RaprJOmld4uujKqIgslVQ&s'}, // No official icon
        { name: 'JUnit & Mockito', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/junit/junit-original.svg' }, // Only JUnit icon available
        { name: 'Spring Security', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
        { name: 'JWT', level: 80, icon: 'https://seeklogo.com/images/J/json-web-tokens-jwt-io-logo-C003DEC47A-seeklogo.com.png' }, // Community logo
        { name: 'SMTP', level: 75 ,icon:'https://wpforms.com/wp-content/uploads/cache/integrations/b40f9170b5be1518802949ef1fe8d0e3.png'}
      ]
    },
    {
      name: 'Databases',
      skills: [
        { name: 'MySQL', level: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
        { name: 'PostgreSQL', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
        { name: 'MongoDB', level: 75, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
        { name: 'AWS RDS', level: 75, icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2FrKzOSe8tulfZqJEVmzMAVefqKTKo62dcQ&s' }, // AWS RDS icon
        { name: 'Redis', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' }
      ]
    },
    {
      name: 'Monitoring & Observability',
      skills: [
        { name: 'Prometheus', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg' },
        { name: 'Grafana', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg' },
        { name: 'ELK Stack', level: 85, icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhGKTa0OVt0DLMFvHhIuPmdtmt7Ydon_2c6w&sdata:image/png;base64,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://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6SIlPq_Cb3lHlbX2oI-xwXcdLH6wnrpdk1w&shttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFKm6dvbjzEhHpZyjGq9ph2o9eesDJpGYwdKfuIrRVaWKr6FD4WFvIngCAjR2E7PjXoXE&usqp=CAU' }, // No universal logo, this is a community version
        { name: 'Jaeger', level: 75, icon: 'https://i.pinimg.com/736x/a3/a8/33/a3a83349069eb81816459fa70677611b.jpg' },
        { name: 'AlertManager', level: 70, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg' } // Prometheus/AlertManager may share icon
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
