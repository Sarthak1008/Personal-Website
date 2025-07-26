import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NgImageSliderModule } from 'ng-image-slider';
import { ApiService } from '../services/api.service';

interface GalleryItem {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  category: string;
}

@Component({
  selector: 'app-life-beyond-code-component',
  standalone: true,
  imports: [CommonModule, NgImageSliderModule],
  templateUrl: './life-beyond-code-component.component.html',
  styleUrls: ['./life-beyond-code-component.component.sass']
})
export class LifeBeyondCodeComponent implements OnInit, OnDestroy {
  
  constructor(private apiService: ApiService) {}
quote: string = 'Travel is the only thing you buy that makes you richer';
  slidesList: GalleryItem[] = [
  {
    id: 1,
    imageUrl: '../../assets/BhandavGarh.jpg',
    title: 'Bhangarh Fort',
    description: 'India’s most haunted fort surrounded by legends and nestled in the Aravalli hills.',
    category: 'Heritage'
  },
  {
    id: 2,
    imageUrl: '../../assets/Kasol.jpg',
    title: 'Kasol',
    description: 'A serene Himalayan village by the Parvati River, perfect for trekkers and backpackers.',
    category: 'Mountains'
  },
  {
    id: 3,
    imageUrl: '../../assets/Kishangarh.jpg',
    title: 'Kishangarh',
    description: 'A city known for marble art, lakes, and the iconic Phool Mahal Palace.',
    category: 'Heritage'
  },
  {
    id: 4,
    imageUrl: '../../assets/Pushkar.jpg',
    title: 'Pushkar',
    description: 'A spiritual town with holy lakes, colorful ghats, and the famous camel fair.',
    category: 'Culture'
  },
  {
    id: 5,
    imageUrl: '../../assets/Tosh.jpeg',
    title: 'Tosh',
    description: 'A hidden gem in Himachal Pradesh offering breathtaking mountain views and tranquility.',
    category: 'Mountains'
  },
  {
    id: 6,
    imageUrl: '../../assets/Travel.jpeg',
    title: 'Wanderlust',
    description: 'Snapshots of diverse travel experiences from forests to coastlines.',
    category: 'Adventure'
  }
]

  selectedItem: number | null = null;

  ngOnInit(): void {
   
  }

  

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  selectItem(index: number): void {
    this.selectedItem = index;
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  closeModal(): void {
    this.selectedItem = null;
    document.body.style.overflow = 'auto'; // Restore scrolling
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.selectedItem !== null) {
      this.closeModal();
    }
  }

  exploreMore(): void {
    console.log('Explore more clicked');
    // Add navigation or logic here
  }

 
}