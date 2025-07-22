import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';


interface Project {
  title: string;
  period: string;
  description: string;
  skills: string[];
  githubLink: string;
  backgroundImage: string; // New
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.sass'
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  @ViewChild('carousel') carousel!: ElementRef;

  projects: Project[] = [
    {
      title: 'GraphQL Tutorial',
      period: 'Sept 2024 - Present',
      description: ' GraphQL API & Single Endpoint: Enables precise data fetching, querying, mutations (create/update/delete), and real-time updates through subscriptions, all handled via a single /graphql endpoint.',
      skills: ["Java","Spring Boot","Git","Java Development","Hibernate","GraphQL"],
      githubLink: 'https://github.com/Sarthak1008/GraphQL-With-SpringBoot',
      backgroundImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaC5p-3KOxDwOTvLIX0ltDUWuGkJYFaGAf9g&s'
    },
    {
      title: 'CrickInformer Cricket Project',
      period: 'Jul 2024 - Aug 2024',
      description: 'Developed a live cricket score application using Spring Boot backend and Angular frontend.',
      skills: ['Core Java', 'Spring Boot', 'Angular', 'REST API'],
      githubLink: 'https://github.com/Sarthak1008/CrickInformer-Cricket-Project',
       backgroundImage: 'https://www.shutterstock.com/image-vector/silhouette-cricket-player-particles-hologram-600nw-1554719099.jpg',
    },
    {
      title: 'CashFree Integration Gateway',
      period: 'Mar 2024 - Apr 2024',
      description: 'Setup and Configuration: Sign up for a Cashfree account and obtain API credentials. of information.',
      skills: [' Payment Gateways ',' Spring Boot ', 'Java ','Hibernate','MySQL'],
       backgroundImage: 'https://i0.wp.com/vpurshan.wpcomstaging.com/wp-content/uploads/2023/05/BG1-1-5.png?fit=1200%2C800&ssl=1',
      githubLink: 'https://github.com/Sarthak1008/CashFree-Integration-Gateway-Made-Easy'
    },
    {
      title: 'Apache Kafka Location Update',
      period: 'Feb 2024 - Mar 2024',
      description: 'Apache Kafka is a distributed streaming platform that provides high-throughput, fault-tolerant messaging for real-time data processing',
      skills: [' Apache Kafka ',' Microservices ', 'Java ','Hibernate','Thymeleaf'],
       backgroundImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS15bJ4orcv1EP6E219N-P5-qioqX0E-voohA&s',
      githubLink: 'https://github.com/Sarthak1008/Apache-Kafka-Location-Update'
    },
    {
      title: 'Security with JWT Role Based Implementation',
      period: 'Jan 2024 - Feb 2024',
      description: 'Enables users to register for an account and login securely to the system.Leverages Spring Security for role-based authorization',
      skills: ['Spring Security', 'Role-Based Access Control (RBAC) ', 'JSON Web Token (JWT)',' Data Validation'],
      githubLink: 'https://github.com/Sarthak1008/Google-ReCaptcha-Validation',
       backgroundImage: 'https://img.freepik.com/premium-vector/padlock-security-cyber-digital-concept-abstract-technology-background-protect-system-innovation_42421-1313.jpg'
    },
    {
      title: 'Multi Threading in Spring Boot',
      period: 'Jul 2024 - Present',
      description: 'Demonstrated the use of CompletableFuture for asynchronous operations in a Spring Boot application.',
      skills: ['Spring Boot', 'Multi-threading', 'CompletableFuture', 'Java'],
       backgroundImage: 'https://mips.com/wp-content/uploads/2024/03/Embedded-Multithreading-01.jpg',
      githubLink: 'https://github.com/Sarthak1008/Multi-Threading-in-Spring-Boot-using-CompletableFuture'
    }
  ];

  ngOnInit() {
    // Double the projects array to create a seamless loop
    this.projects = [...this.projects, ...this.projects];
  }

  ngAfterViewInit() {
    this.startCarousel();
  }

  startCarousel() {
    if (typeof window !== 'undefined') {
      let scrollAmount = 0;
      const step = 1; // Adjust for faster/slower scrolling
      const carouselWidth = this.carousel.nativeElement.scrollWidth / 2;

      const scroll = () => {
        scrollAmount += step;
        if (scrollAmount >= carouselWidth) {
          scrollAmount = 0;
        }
        this.carousel.nativeElement.scrollTo(scrollAmount, 0);
        requestAnimationFrame(scroll);
      };

      requestAnimationFrame(scroll);
    }
  }
}
