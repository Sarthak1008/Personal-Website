import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-name',
  standalone: true,
  templateUrl: './name.component.html',
  imports: [CommonModule],
  styleUrls: ['./name.component.sass']
})
export class NameComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.typeWriter();
    }
  }


  document: any
  typeWriter() {
    const element = document.querySelector('.typewriter') as HTMLElement;
    const textArray = [
      'Writer <span class="type-icon">✍️</span>',
      'Travel Enthusiast <span class="type-icon">✈️</span>',
      'Coffee Enthusiast <span class="type-icon">☕</span>',
      'Cricket & Football Sportsman <span class="type-icon">⚽🏏</span>',
      'Tech Stack Explorer <span class="type-icon">💻</span>',
      'Movie Enthusiast <span class="type-icon">🎬</span>'
    ];
    let arrayIndex = 0;
    let charIndex = 0;

    const type = () => {
      const currentHTML = textArray[arrayIndex];
      const dummy = document.createElement('div');
      dummy.innerHTML = currentHTML;
      const iconHTML = dummy.querySelector('.type-icon')?.outerHTML || '';
      const text = dummy.textContent?.replace(/\s+/g, ' ').trim() || '';

      if (charIndex <= text.length) {
  element.innerHTML = '';  // clear first!
  element.innerHTML = `${text.substring(0, charIndex)}`;
  charIndex++;
  setTimeout(type, 120);
} else {
  element.innerHTML = '';  // clear before final render
  element.innerHTML = `${text} ${iconHTML}`;
  setTimeout(erase, 1800);
}
    };

    const erase = () => {
      const currentHTML = textArray[arrayIndex];
      const dummy = document.createElement('div');
      dummy.innerHTML = currentHTML;
      const text = dummy.textContent?.replace(/\s+/g, ' ').trim() || '';

     if (charIndex > 0) {
  element.innerHTML = '';  // clear first!
  element.innerHTML = `${text.substring(0, charIndex - 1)}`;
  charIndex--;
  setTimeout(erase, 60);
} else {
  arrayIndex = (arrayIndex + 1) % textArray.length;
  setTimeout(type, 300);
}
    };


    type();
  }

  dontClick(): void {
    debugger
    if (isPlatformBrowser(this.platformId)) {
      confetti({
        particleCount: 120,
        spread: 180,
        origin: { y: 0.6 },
        colors: ['#bb0000', '#ffffff', '#0000bb', '#ff69b4', '#FFD700']
      });
    }
  }
}

