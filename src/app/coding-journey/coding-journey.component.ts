import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';

interface JourneyItem {
  year: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-coding-journey',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coding-journey.component.html',
  styleUrl: './coding-journey.component.sass'
})
export class CodingJourneyComponent implements OnInit, AfterViewInit {
  journeyItems: JourneyItem[] = [
    {
      year: '2019',
      title: 'Started B.Eng in Computer Science',
      description: 'Began my journey at Manipal University Jaipur, diving deep into Data Structures, OOPs, and foundational programming concepts.'
    },
    {
      year: '2022',
      title: 'Advanced Learning Phase',
      description: 'Explored Machine Learning, Cryptography, and Security. Started building complex projects and understanding system architecture.'
    },
    {
      year: '2023',
      title: 'Professional Career Launch',
      description: 'Joined PureSoftware as Graduate Engineer Trainee, mastering React, Spring Boot, and microservices architecture.'
    },
    {
      year: '2024',
      title: 'Senior Developer & Recognition',
      description: 'Java Backend Software Developer at Reshita. Received award from IT Minister for Doc-Aid innovation.'
    },
    {
      year: '2025',
      title: 'Government Project at Logicsoft',
      description: 'Java Backend Software Developer at Logicsoft focusing on monitoring tools and backend systems.Like FCIQMS and FSSAI '
    }
  ];

  animatedIndices = new Set<number>();

  constructor(private elRef: ElementRef) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.initScrollAnimation();
  }

  private initScrollAnimation(): void {
    const journeyItems = this.elRef.nativeElement.querySelectorAll('.journey-item');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          journeyItems.forEach((item: HTMLElement, index: number) => {
            setTimeout(() => {
              this.animatedIndices.add(index);
            }, index * 300);
          });
          observer.disconnect(); // Animate once
        }
      });
    }, { threshold: 0.3 });

    if (journeyItems.length > 0) {
      observer.observe(journeyItems[0]);
    }
  }
}
