import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  skills: string[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.sass'
})
export class ExperienceComponent {
  experiences: Experience[] = [
    {
      company: 'Logicsoft - Beyond Hype',
      role: 'Java Software Developer',
      period: 'Jun 2024 - Present',
      location: 'Gurugram, Haryana, India · On-site',
      description: [],
      skills: ['Hibernate', 'Jira', 'Core Java', 'Spring Security', 'JavaScript', 'TypeScript', 'Gitlab', 'Java Development', 'Spring Framework', 'Microservices', 'Back-End Web Development', 'AngularJS', 'Spring MVC', 'Spring Boot', 'GitHub', 'PostgreSQL', 'Jaeger', 'Splunk']
    },
    {
      company: 'Reshita',
      role: 'Software Engineer',
      period: 'Dec 2023 - May 2024',
      location: 'Remote',
      description: [
        'Designed and developed a robust MedTech platform for clinic management, improving scalability by 40% and maintainability by 30%.',
        'Engineered critical services including OTP verification and JWT token-based authentication, reducing login time by 50%.',
        'Led the development of an Internal Management System with token and role-based authentication, reducing system downtime by 20%.',
        'Integrated Apache Kafka for real-time data streaming, reducing data processing time by 50%.'
      ],
      skills: ['Hibernate', 'Cascading Style Sheets (CSS)', 'Payment Gateways', 'OAuth', 'Java', 'Amazon Web Services (AWS)', 'Mockito', 'JSON Web Token (JWT)', 'Core Java', 'Data Validation', 'Git', 'HTML', 'Spring Security', 'Google Cloud Platform (GCP)', 'Logging', 'MySQL', 'Twilio', 'Java Development', 'Spring Framework', 'Microservices', 'Redis', 'Model-View-Controller (MVC)', 'Back-End Web Development', 'WebSocket', 'Apache Kafka', 'Spring MVC', 'Scheduling', 'Spring Boot', 'Amazon Relational Database Service (RDS)', 'Async', 'Splunk', 'JUnit', 'GitHub', 'PostgreSQL']
    },
    {
      company: 'PureSoftware Ltd',
      role: 'Graduate Engineer Trainee',
      period: 'Feb 2023 - Nov 2023',
      location: 'Noida, Uttar Pradesh, India · On-site',
      description: [
        'Developed user-friendly interfaces using React and Material UI, increasing user interaction by 25%.',
        'Architected and deployed microservices using Spring Boot, enhancing system scalability by 40%.'
      ],
      skills: ['React', 'Material UI', 'Spring Boot', 'Microservices', "OAuth", "Blazor", "Amazon Web Services (AWS)","JSON Web Token (JWT)", "Git", "Spring Security", "TypeScript", "JavaScript", "Thymeleaf", "Redis", "Payment Gateways","Kafka","Junit","Mockito"
      ]
    },
    {
      company: 'Fouses',
      role: 'Web Development Intern',
      period: 'Jun 2021 - Jul 2021',
      location: 'Remote',
      description: [
        'Received training in HTML, CSS, JavaScript, and SQL.',
        'Developed a news app with Google Translation API, categorized news, and pagination.'
      ],
      skills: ['HTML', 'CSS', 'JavaScript', 'SQL', 'Google Translation API', 'Bootstrap',]
    },
    {
      company: 'Takenmind Technologies',
      role: 'Data Analyst Intern',
      period: 'Oct 2020 - Nov 2020',
      location: 'Remote',
      description: [
        'Executed diverse projects using Python libraries and advanced concepts.',
        'Achieved 20% boost in customer retention, 15% cost reduction in production, and 25% enhancement in resource allocation efficiency.'
      ],
      skills: ['Python', 'NumPy', 'Data Analysis', 'Pandas', "Seaborn"]
    }
  ];
}
