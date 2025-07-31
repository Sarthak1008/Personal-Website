import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit, Component, ElementRef, HostListener,
  Inject, PLATFORM_ID, ViewChild
} from '@angular/core';

@Component({
  selector: 'app-highlights',
  standalone: true,
  imports: [],
  templateUrl: './highlights.component.html',
  styleUrl: './highlights.component.sass'
})
export class HighlightsComponent implements AfterViewInit {

  @ViewChild('highlightsSidebar', { static: false }) sidebar?: ElementRef;

  isExpanded = false;
  private hasAnimated = false;
  private hoverTimeout: any = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const toggleBtn = document.querySelector('.panel-toggle');
        toggleBtn?.classList.add('entrance-animation');
      }, 500);
    }
  }

  // Called on mouseenter on either the toggle btn or panel
  openSidebar(): void {
    clearTimeout(this.hoverTimeout);
    this.isExpanded = true;

    if (this.isExpanded && !this.hasAnimated) {
      setTimeout(() => this.animateCounters(), 400);
    }
  }

  // Called on click of close button or keyboard
  closeSidebar(): void {
    this.isExpanded = false;
  }

  // Handle mouse leaving the toggle button
  onToggleMouseLeave(event: MouseEvent): void {
    // If mouse moves directly onto the panel, keep open
    const panel = document.getElementById('highlightsSidebar');
    if (panel && panel.contains(event.relatedTarget as Node)) {
      return;
    }
    this.setHoverTimeout();
  }

  // Handle mouse leaving the panel
  onPanelMouseLeave(event: MouseEvent): void {
    // If mouse moves directly onto the toggle, keep open
    const toggleBtn = document.querySelector('.panel-toggle');
    if (toggleBtn && toggleBtn.contains(event.relatedTarget as Node)) {
      return;
    }
    this.setHoverTimeout();
  }

  // Delay closing for a brief moment to avoid flicker
  private setHoverTimeout() {
    clearTimeout(this.hoverTimeout);
    this.hoverTimeout = setTimeout(() => this.isExpanded = false, 180);
  }

  private animateCounters(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    counters.forEach((counter, index) => {
      const statItem = counter.closest('.stat-highlight') as HTMLElement;
      if (!statItem) return;

      const targetValue = parseInt(statItem.getAttribute('data-target') || '0', 10);
      const isPercentage =
        (statItem.getAttribute('data-target') ?? '').includes('%') ||
        (statItem.querySelector('.stat-label')?.textContent ?? '').includes('%');

      let currentValue = 0;
      const counterElement = counter as HTMLElement;
      counterElement.classList.add('animate');

      const animate = (): void => {
        const increment = Math.max(1, Math.ceil(targetValue / speed));
        if (currentValue < targetValue) {
          currentValue = Math.min(currentValue + increment, targetValue);
          counterElement.textContent = currentValue.toString() + (isPercentage ? '%' : '');
          requestAnimationFrame(animate);
        } else {
          counterElement.textContent = targetValue.toString() + (isPercentage ? '%' : '');
          setTimeout(() => counterElement.classList.remove('animate'), 500);
        }
      };
      setTimeout(() => requestAnimationFrame(animate), index * 200);
    });

    this.hasAnimated = true;
  }

  // Optionally, you may still want to allow closing via Esc key
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent): void {
    if (this.isExpanded) {
      this.closeSidebar();
      event.preventDefault();
    }
  }

  // You can keep your resize logic and other event handlers as appropriate
}
