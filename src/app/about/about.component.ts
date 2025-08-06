import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

export interface ProfileData {
  name: string;
  email: string;
  location: string;
  availability: string;
  dateOfBirth: string;
  age: number;
  bio: string;
  secretInfo: string;
  profileImage: string;
  backgroundImage: string;
  resumeLink: string;
  linkedIn: string;
  github: string;
  leetCode: string;
  skills: string[];
}


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.sass'
})
export class AboutComponent {

  profileData: ProfileData = {
    name: 'Sarthak Aggarwal',
    email: 'sarthak10082001@gmail.com',
    location: 'Bhopal, India',
    availability: 'Open to opportunities',
    dateOfBirth: '2001-08-10',
    age: 23,
    bio: `I'm Sarthak Aggarwal, a dedicated Full Stack Developer specializing in Java, Spring Boot and monitoring tools.
        I have experience building scalable web applications and RESTful APIs with a strong focus on clean code and user-centric design.`,
    secretInfo: 'Classified information about future projects.',
    profileImage: '../../assets/photo_with_ravishankar.jpeg',
    backgroundImage: 'assets/nature-background.jpg',
    resumeLink: '../../assets/Sarthak_Aggarwal_CV.pdf',
    linkedIn: 'https://www.linkedin.com/in/sarthak-aggarwal-670a16194',
    github: 'https://github.com/Sarthak1008',
    leetCode: 'https://leetcode.com/SarthakAgg/',
    skills: ['Java', 'Spring Boot', 'Microservices', 'PostgreSQL', 'Redis', 'Prometheus', 'Grafana', 'ELK Stack', 'Jaeger', 'Apache Kafka']
  };


  currentDate: string = '';
  isClassified: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.currentDate = new Date().toLocaleDateString();
    this.profileData.age = this.calculateAge(this.profileData.dateOfBirth);
  }

  toggleClassification(): void {
    this.isClassified = !this.isClassified;
  }

  calculateAge(dateOfBirth: string): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  onImageLoad(event: any): void {
    console.log('Image loaded successfully');
  }

  onImageError(event: any): void {
    console.error('Error loading image:', event);
    // Set fallback image or handle error
  }
}
