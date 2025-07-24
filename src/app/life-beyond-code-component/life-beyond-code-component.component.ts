import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgImageSliderModule } from 'ng-image-slider';

export interface ImageData {
  url: string;
  thumbnail: string;
  title: string;
  description: string;
  location: string;
  date: string;
}

import { HostListener } from '@angular/core';

export interface ImageData {
  url: string;
  thumbnail: string;
  title: string;
  description: string;
  location: string;
  date: string;
}

@Component({
  selector: 'app-life-beyond-code-component',
  standalone: true,
  imports: [CommonModule, NgImageSliderModule],
  templateUrl: './life-beyond-code-component.component.html',
  styleUrls: ['./life-beyond-code-component.component.sass'] // NOTE: should be `styleUrls`, not `styleUrl`
})
export class LifeBeyondCodeComponent implements OnInit {
  slidesList = [
    {
      image: '../../assets/Bhandavgarh.jpg',
      title: 'BhandavGarh Trip',
      subtitle: 'Exploring ancient ruins and natural beauty'
    },
    {
      image: '../../assets/Kasol.jpg',
      title: 'Kasol Adventures',
      subtitle: 'Trekking through the Himalayan valleys'
    },
    {
      image: '../../assets/Kishangarh.jpg',
      title: 'Kishangarh Memories',
      subtitle: 'Cultural heritage and local traditions'
    },
    {
      image: '../../assets/Pushkar.jpg',
      title: 'Pushkar Views',
      subtitle: 'Sacred lakes and desert landscapes'
    },
    {
      image: '../../assets/Tosh.jpg',
      title: 'Tosh Valley',
      subtitle: 'Pristine mountain views and serenity'
    },
    {
      image: '../../assets/Travel.jpg',
      title: 'Travel Diaries',
      subtitle: 'Collecting memories around the world'
    }
  ];

  currentIndex = 0;
  slideWidth = 0;
  autoSlideInterval: any;

  ngOnInit(): void {
    this.updateSlideWidth();
    this.startAutoSlide();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateSlideWidth();
  }

  updateSlideWidth() {
    const el = document.querySelector('.slide') as HTMLElement;
    if (el) this.slideWidth = el.clientWidth;
  }

  goToSlide(index: number) {
    this.currentIndex = (index + this.slidesList.length) % this.slidesList.length;
    this.resetAutoSlide();
  }

  nextSlide() {
    this.goToSlide(this.currentIndex + 1);
  }

  prevSlide() {
    this.goToSlide(this.currentIndex - 1);
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => this.nextSlide(), 3000);
  }

  resetAutoSlide() {
    clearInterval(this.autoSlideInterval);
    this.startAutoSlide();
  }
}


