import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.sass'
})
export class FooterComponent implements OnInit, OnDestroy {
  linkedin: string = "https://www.linkedin.com/in/sarthak-aggarwal-670a16194/";
  github: string = "https://github.com/Sarthak1008";
  leetcode: string = "https://leetcode.com/u/SarthakAgg/";
  email: string = "mailto:sarthak10082001@gmail.com";

  currentYear: number = new Date().getFullYear();
  today: string = new Date().toLocaleDateString();

  private bubbleInterval: any;

  private isBrowser: boolean;
  private fishInterval: any;
  constructor(
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.createBubbles();
      this.bubbleInterval = setInterval(() => this.createBubbles(), 3000);
      this.fishInterval = setInterval(() => this.spawnFish(), 5000);
      window.addEventListener('mousemove', this.handleParallax);
    }
  }

  ngOnDestroy() {
    if (this.bubbleInterval) clearInterval(this.bubbleInterval);
    if (this.fishInterval) clearInterval(this.fishInterval);
    if (this.isBrowser) window.removeEventListener('mousemove', this.handleParallax);
  }

  onWaterClick(event: MouseEvent) {
    if (!this.isBrowser) return;
    const container = event.currentTarget as HTMLElement;
    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (y > container.offsetHeight * 0.3) {
      this.createRipple(x, y, container);
    }
  }

  private createRipple(x: number, y: number, container: HTMLElement) {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    ripple.style.left = `${x - 25}px`;
    ripple.style.top = `${y - 25}px`;
    container.appendChild(ripple);

    for (let i = 0; i < 5; i++) {
      this.createSingleBubble(container, x, y);
    }

    setTimeout(() => ripple.remove(), 1000);
  }

  private createBubbles() {
    const container = this.elementRef.nativeElement.querySelector('.footer-container');
    if (!container) return;

    const numBubbles = Math.random() * 5 + 3;

    for (let i = 0; i < numBubbles; i++) {
      setTimeout(() => {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');

        const size = Math.random() * 20 + 5;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = Math.random() * 100 + '%';
        bubble.style.bottom = '0';

        const duration = Math.random() * 3 + 4;
        bubble.style.animationDuration = `${duration}s`;

        container.appendChild(bubble);
        setTimeout(() => bubble.remove(), duration * 1000);
      }, i * 300);
    }
  }
  private createSingleBubble(container: HTMLElement, x: number, y: number) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    const size = Math.random() * 10 + 5;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${x + Math.random() * 20 - 10}px`;
    bubble.style.top = `${y}px`;
    bubble.style.animationDuration = `${Math.random() * 2 + 2}s`;
    container.appendChild(bubble);
    setTimeout(() => bubble.remove(), 5000);
  }

  private spawnFish() {
    const container = this.elementRef.nativeElement.querySelector('.footer-container');
    if (!container) return;

    const fishTypes = ['🐠', '🐟', '🐡', '🦈'];
    const fish = document.createElement('div');
    fish.classList.add('fish');
    fish.innerHTML = fishTypes[Math.floor(Math.random() * fishTypes.length)];
    fish.style.top = `${40 + Math.random() * 50}%`;

    if (Math.random() > 0.5) {
      fish.classList.add('fish-left');
      fish.style.animationDuration = `${12 + Math.random() * 8}s`;
    } else {
      fish.style.animationDuration = `${12 + Math.random() * 8}s`;
    }

    container.appendChild(fish);
    setTimeout(() => fish.remove(), 20000);
  }

  private handleParallax = (event: MouseEvent) => {
    const moveX = (event.clientX / window.innerWidth - 0.5) * 20;
    const moveY = (event.clientY / window.innerHeight - 0.5) * 10;

    const sky = this.elementRef.nativeElement.querySelector('.sky');
    const content = this.elementRef.nativeElement.querySelector('.underwater-content');

    if (sky) sky.style.transform = `translate(${moveX}px, ${moveY}px)`;
    if (content) content.style.transform = `translate(${moveX / 2}px, ${moveY / 2}px)`;
  }
}
