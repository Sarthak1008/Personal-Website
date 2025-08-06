import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, OnDestroy, HostListener } from '@angular/core';

interface JourneyItem {
  year: string;
  title: string;
  description: string;
  modalDescription?: string;
  skills?: string[];
  achievements?: string[];
}

interface TimelineDot {
  left: number;
  top: number;
}

@Component({
  selector: 'app-coding-journey',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coding-journey.component.html',
  styleUrl: './coding-journey.component.sass'
})
export class CodingJourneyComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('timelineCurve', { static: false }) timelineCurve!: ElementRef<SVGPathElement>;
  @ViewChild('walkingPerson', { static: false }) walkingPerson!: ElementRef<HTMLElement>;

  journeyItems: JourneyItem[] = [
    {
      year: '2019',
      title: 'Started B.Eng in Computer Science',
      description: 'Began my journey at Manipal University Jaipur, diving deep into Data Structures, OOPs, and foundational programming concepts.',
      modalDescription: 'This was the beginning of an incredible adventure! I dove deep into computer science fundamentals and discovered my passion for problem-solving through code.',
      skills: ['C++', 'Java', 'Data Structures', 'OOP'],
      achievements: [
        'Mastered fundamental programming concepts',
        'Built first console applications',
        'Completed 100+ coding problems'
      ]
    },
    {
      year: '2022',
      title: 'Advanced Learning Phase',
      description: 'Explored Machine Learning, Cryptography, and Security. Started building complex projects and understanding system architecture.',
      modalDescription: 'Advanced into complex topics and started building real-world applications. This phase shaped my understanding of modern software development.',
      skills: ['Machine Learning', 'Python', 'Cryptography', 'System Design'],
      achievements: [
        'Developed ML models for university projects',
        'Implemented security algorithms',
        'Built distributed system prototypes'
      ]
    },
    {
      year: '2023',
      title: 'Professional Career Launch',
      description: 'Joined PureSoftware as Graduate Engineer Trainee, mastering React, Spring Boot, and microservices architecture.',
      modalDescription: 'Entered the professional world and quickly adapted to enterprise-level development. Learned the importance of clean code and collaboration.',
      skills: ['React', 'Spring Boot', 'Microservices', 'Git'],
      achievements: [
        'Delivered production-ready features',
        'Implemented microservices architecture',
        'Improved application performance by 35%'
      ]
    },
    {
      year: '2024',
      title: 'Senior Developer & Recognition',
      description: 'Java Backend Software Developer at Reshita. Received award from IT Minister for Doc-Aid innovation.',
      modalDescription: 'Recognition for innovative work and leadership in developing healthcare solutions. This milestone marked my growth into a senior developer role.',
      skills: ['Java Backend', 'Healthcare Tech', 'Innovation', 'Leadership'],
      achievements: [
        'Received IT Minister Award for Doc-Aid',
        'Led development team of 5 members',
        'Architected scalable healthcare solutions'
      ]
    },
    {
      year: '2025',
      title: 'Government Project at Logicsoft',
      description: 'Java Backend Software Developer at Logicsoft focusing on monitoring tools and backend systems like FCIQMS and FSSAI.',
      modalDescription: 'Currently working on critical government projects that impact millions of users. Focused on building robust, scalable monitoring systems.',
      skills: ['Government Projects', 'Monitoring Systems', 'FCIQMS', 'FSSAI'],
      achievements: [
        'Building systems for millions of users',
        'Implementing robust monitoring tools',
        'Contributing to food safety initiatives'
      ]
    }
  ];

  timelineDots: TimelineDot[] = [
    { left: 20, top: 200 },
    { left: 80, top: 500 },
    { left: 20, top: 800 },
    { left: 80, top: 1100 },
    { left: 50, top: 1400 }
  ];

  animatedIndices = new Set<number>();
  activeModal: number | null = null;
  showSkillModal = false;
  selectedSkill = '';
  selectedSkillDescription = '';

  // Walking animation properties - FIXED FOR BIDIRECTIONAL MOVEMENT
  private currentPosition = 0;
  private targetPosition = 0;
  private isWalking = false;
  private walkingInterval: any;
  private particleInterval: any;
  private lastScrollY = 0;
  private scrollDirection = 1; // 1 for down, -1 for up
  private isScrolling = false;

  skillInfo: { [key: string]: string } = {
    'C++': 'Foundation programming language that taught me memory management and system-level programming.',
    'Java': 'Object-oriented programming language that became my primary backend development tool.',
    'Data Structures': 'Essential algorithms and data organization concepts for efficient programming.',
    'OOP': 'Object-Oriented Programming principles that structure modern software development.',
    'Machine Learning': 'AI and ML algorithms for pattern recognition and predictive modeling.',
    'Python': 'Versatile language perfect for data science, ML, and rapid prototyping.',
    'Cryptography': 'Security algorithms and encryption techniques for data protection.',
    'System Design': 'Architectural patterns for building scalable and maintainable systems.',
    'React': 'Modern frontend library for building dynamic user interfaces.',
    'Spring Boot': 'Java framework for rapid backend development and microservices.',
    'Microservices': 'Architectural pattern for building distributed, scalable applications.',
    'Git': 'Version control system for collaborative development and code management.',
    'Java Backend': 'Server-side development using Java for enterprise applications.',
    'Healthcare Tech': 'Technology solutions specifically designed for healthcare industry.',
    'Innovation': 'Creative problem-solving and development of novel solutions.',
    'Leadership': 'Team management and technical leadership in development projects.',
    'Government Projects': 'Large-scale systems serving public sector and citizens.',
    'Monitoring Systems': 'Tools and frameworks for system observability and performance tracking.',
    'FCIQMS': 'Food Corporation of India Quality Management System.',
    'FSSAI': 'Food Safety and Standards Authority of India compliance systems.'
  };

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initScrollAnimation();
      this.startParticleAnimation();
      this.initializeWalkingPerson();
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.walkingInterval) {
      clearInterval(this.walkingInterval);
    }
    if (this.particleInterval) {
      clearInterval(this.particleInterval);
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    this.requestTick();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    setTimeout(() => this.updateTimelineOnScroll(), 100);
  }

  private requestTick(): void {
    if (!this.isScrolling) {
      this.isScrolling = true;
      requestAnimationFrame(() => {
        this.updateTimelineOnScroll();
        setTimeout(() => {
          this.isScrolling = false;
        }, 16); // Allow for smooth continuous scrolling
      });
    }
  }

  private initializeWalkingPerson(): void {
    // Set initial position for the walking person
    if (this.timelineCurve?.nativeElement && this.walkingPerson?.nativeElement) {
      const path = this.timelineCurve.nativeElement;
      const point = path.getPointAtLength(0);
      const walkingEl = this.walkingPerson.nativeElement;

      walkingEl.style.left = `${point.x / 10}%`;
      walkingEl.style.top = `${point.y + 50}px`;
      walkingEl.style.transform = 'rotate(0deg)';
    }
  }

  private initScrollAnimation(): void {
    const journeyItems = this.elRef.nativeElement.querySelectorAll('.timeline-item');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Array.from(journeyItems).indexOf(entry.target);
          if (index !== -1) {
            setTimeout(() => {
              this.animatedIndices.add(index);
            }, index * 200);
          }
        }
      });
    }, { threshold: 0.2 });

    journeyItems.forEach((item: Element) => observer.observe(item));
  }

  private updateTimelineOnScroll(): void {
    if (!this.timelineCurve?.nativeElement || !this.walkingPerson?.nativeElement) return;

    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const journeySection = this.elRef.nativeElement.querySelector('.coding-journey');

    if (!journeySection) return;

    // Determine scroll direction - KEY FIX FOR BIDIRECTIONAL MOVEMENT
    this.scrollDirection = scrollY >= this.lastScrollY ? 1 : -1;
    this.lastScrollY = scrollY;

    const sectionTop = journeySection.offsetTop;
    const sectionHeight = journeySection.offsetHeight;

    // Calculate scroll progress within the coding journey section
    const relativeScrollTop = scrollY - sectionTop + windowHeight * 0.5;
    const newTargetPosition = Math.max(0, Math.min(1, relativeScrollTop / (sectionHeight * 0.8)));

    // Only update if there's a significant change - ENABLES BIDIRECTIONAL MOVEMENT
    if (Math.abs(newTargetPosition - this.targetPosition) > 0.01) {
      this.targetPosition = newTargetPosition;

      // Start walking if not already walking
      if (!this.isWalking) {
        this.startWalking();
      }
    }

    // Animate timeline items visibility
    this.animateTimelineItems(scrollY, windowHeight, sectionTop);
  }

  private animateTimelineItems(scrollY: number, windowHeight: number, sectionTop: number): void {
    const timelineItems = this.elRef.nativeElement.querySelectorAll('.timeline-item');

    timelineItems.forEach((item: HTMLElement, index: number) => {
      const itemTop = item.offsetTop + sectionTop;
      const itemHeight = item.offsetHeight;

      if (scrollY + windowHeight > itemTop + itemHeight * 0.3) {
        setTimeout(() => {
          this.animatedIndices.add(index);
        }, index * 100);
      }
    });
  }

  private startWalking(): void {
    if (this.isWalking || !this.timelineCurve?.nativeElement || !this.walkingPerson?.nativeElement) return;

    this.isWalking = true;
    const walkingEl = this.walkingPerson.nativeElement;
    walkingEl.classList.add('moving');
    walkingEl.classList.remove('stopped');

    this.walkingInterval = setInterval(() => {
      const difference = this.targetPosition - this.currentPosition;

      // Stop walking when very close to target
      if (Math.abs(difference) < 0.005) {
        this.stopWalking();
        return;
      }

      // Move towards target position - CAN GO BOTH DIRECTIONS NOW!
      const step = difference * 0.12; // Increased responsiveness
      this.currentPosition += step;
      this.currentPosition = Math.max(0, Math.min(1, this.currentPosition));

      const path = this.timelineCurve.nativeElement;
      const pathLength = path.getTotalLength();
      const currentPoint = path.getPointAtLength(this.currentPosition * pathLength);

      // Calculate direction based on movement, not just scroll direction
      const lookAheadDistance = difference > 0 ? 20 : -20;
      const nextPointPosition = Math.max(0, Math.min(pathLength, (this.currentPosition * pathLength) + lookAheadDistance));
      const nextPoint = path.getPointAtLength(nextPointPosition);

      // Calculate angle for rotation
      const angle = Math.atan2(nextPoint.y - currentPoint.y, nextPoint.x - currentPoint.x) * 180 / Math.PI;

      // Update position based on screen size
      if (window.innerWidth > 768) {
        walkingEl.style.left = `${(currentPoint.x / 1000) * 100}%`;
        walkingEl.style.top = `${currentPoint.y * 0.9 + 80}px`;
        walkingEl.style.transform = `rotate(${Math.max(-25, Math.min(25, angle))}deg)`;

        // Flip person based on actual movement direction - BIDIRECTIONAL FIX
        const personIcon = walkingEl.querySelector('.person-icon') as HTMLElement;
        if (personIcon) {
          const isMovingLeft = difference < 0; // Moving backwards when scrolling up
          personIcon.style.transform = isMovingLeft ? 'scaleX(-1)' : 'scaleX(1)';
        }
      } else {
        // Mobile: simple vertical movement
        walkingEl.style.left = '50px';
        walkingEl.style.top = `${this.currentPosition * 1000 + 100}px`;
        walkingEl.style.transform = 'none';

        // Mobile person flipping for bidirectional movement
        const personIcon = walkingEl.querySelector('.person-icon') as HTMLElement;
        if (personIcon) {
          personIcon.style.transform = difference < 0 ? 'scaleX(-1)' : 'scaleX(1)';
        }
      }
    }, 16); // ~60fps for smooth animation
  }

  private stopWalking(): void {
    if (!this.isWalking || !this.walkingPerson?.nativeElement) return;

    this.isWalking = false;
    clearInterval(this.walkingInterval);
    const walkingEl = this.walkingPerson.nativeElement;
    walkingEl.classList.remove('moving');
    walkingEl.classList.add('stopped');

    setTimeout(() => {
      walkingEl.classList.remove('stopped');
    }, 1000);
  }

  private startParticleAnimation(): void {
    this.particleInterval = setInterval(() => {
      this.createParticle();
    }, 300);
  }

  private createParticle(): void {
    const particleContainer = this.elRef.nativeElement.querySelector('.floating-particles');
    if (!particleContainer) return;

    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random size and position
    const size = Math.random() * 8 + 3;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;

    // Random animation duration and delay
    const duration = Math.random() * 4 + 4; // 4-8 seconds
    const delay = Math.random() * 3; // 0-3 seconds delay

    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationName = 'float';
    particle.style.animationIterationCount = '1';
    particle.style.animationTimingFunction = 'linear';
    particle.style.animationFillMode = 'forwards';

    // Add some variety to particles
    const opacity = Math.random() * 0.3 + 0.1; // 0.1 to 0.4
    particle.style.background = `rgba(255, 255, 255, ${opacity})`;

    particleContainer.appendChild(particle);

    // Clean up particle after animation completes
    setTimeout(() => {
      if (particle.parentNode) {
        particle.remove();
      }
    }, (duration + delay) * 1000 + 1000); // Extra second for safety
  }

  getItemClass(index: number): string {
    return index % 2 === 0 ? 'left' : 'right';
  }

  getItemTop(index: number): number {
    const basePositions = [150, 450, 750, 1050, 1350];
    return basePositions[index] || 150 + (index * 300);
  }

  scrollToItem(index: number): void {
    // const timelineWrapper = this.elRef.nativeElement.querySelector('.timeline-wrapper');
    // if (timelineWrapper) {
    //   const targetY = timelineWrapper.offsetTop + this.getItemTop(index) - 100;
    //   window.scrollTo({ top: targetY, behavior: 'smooth' });
    // }
  }

  openModal(index: number): void {
    this.activeModal = index;
    document.body.style.overflow = 'hidden';
  }

  closeModal(event?: Event): void {
    if (event && (event.target as HTMLElement).classList.contains('modal-content')) {
      return;
    }
    this.activeModal = null;
    document.body.style.overflow = 'auto';
  }

  showSkillInfo(skill: string, event: Event): void {
    event.stopPropagation();
    this.selectedSkill = skill;
    this.selectedSkillDescription = this.skillInfo[skill] || 'Information about this skill coming soon!';
    this.showSkillModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeSkillModal(event?: Event): void {
    if (event && (event.target as HTMLElement).classList.contains('modal-content')) {
      return;
    }
    this.showSkillModal = false;
    document.body.style.overflow = 'auto';
  }

  getModalIcon(index: number): string {
    const icons = ['🚀', '📚', '💼', '👑', '🏛️'];
    return icons[index] || '✨';
  }

  getProgressWidth(index: number): number {
    const progressWidths = [20, 40, 60, 80, 95];
    return progressWidths[index] || 50;
  }

  getProgressLevel(index: number): string {
    const levels = ['Beginner Level', 'Intermediate Level', 'Professional Level', 'Senior Level', 'Expert Level'];
    return levels[index] || 'In Progress';
  }


}
