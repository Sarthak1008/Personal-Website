import { AfterViewInit, Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-highlights',
  standalone: true,
  imports: [],
  templateUrl: './highlights.component.html',
  styleUrl: './highlights.component.sass'
})
export class HighlightsComponent implements AfterViewInit {
  isExpanded = false;

  toggleSidebar(): void {
    this.isExpanded = !this.isExpanded;
  }

  animateCounters(): void {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 180;

    counters.forEach((counter, index) => {
      const statItem = counter.closest('.stat-highlight')!;
      const value = +statItem.getAttribute('data-target')!;
      let data = 0;

      counter.classList.add('animate');

      const animate = () => {
        const time = value / speed;
        if (data < value) {
          data = Math.ceil(data + time);
          (counter as HTMLElement).innerText = data.toString();
          setTimeout(animate, 1);
        } else {
          (counter as HTMLElement).innerText = value.toString();
        }
      };

      setTimeout(animate, index * 150);
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.animateCounters(), 800);
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent): void {
    const sidebar = document.getElementById('highlightsSidebar');
    if (!sidebar?.contains(event.target as Node) && this.isExpanded && window.innerWidth <= 768) {
      this.toggleSidebar();
    }
  }
}