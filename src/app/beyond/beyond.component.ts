import { Component, OnDestroy, OnInit } from '@angular/core';


interface GalleryItem {
  id: number;
  title: string;
  location: string;
  category: string;
  thumbnail: string;
  fullSize: string;
  description?: string;
}

interface ShowcaseSlide {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
}

interface Category {
  key: string;
  label: string;
}

@Component({
  selector: 'app-beyond',
  standalone: true,
  imports: [],
  templateUrl: './beyond.component.html',
  styleUrl: './beyond.component.sass'
})
export class beyondComponent implements OnInit, OnDestroy {

  // Properties
  activeCategory: string = 'all';
  currentSlideIndex: number = 0;
  lightboxActive: boolean = false;
  selectedImage: GalleryItem | null = null;
  filteredGalleryItems: GalleryItem[] = [];
  slideInterval: any;

  // Categories for filtering
  categories: Category[] = [
    { key: 'all', label: 'All' },
    { key: 'travel', label: 'Travel' },
    { key: 'food', label: 'Culinary' },
    { key: 'adventure', label: 'Adventures' },
    { key: 'hobbies', label: 'Hobbies' }
  ];

  // Showcase slides data
  showcaseSlides: ShowcaseSlide[] = [
    {
      id: 1,
      title: 'Mountain Adventures',
      category: 'Travel',
      description: 'Exploring the breathtaking peaks of the Himalayas',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 2,
      title: 'Food Discoveries',
      category: 'Culinary',
      description: 'Savoring authentic local cuisines around the world',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 3,
      title: 'Ocean Explorations',
      category: 'Adventure',
      description: 'Diving into the depths of crystal clear waters',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 4,
      title: 'Creative Pursuits',
      category: 'Hobbies',
      description: 'Photography sessions capturing life\'s beautiful moments',
      image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    }
  ];

  // Gallery items data
  galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: 'Sunset Trek',
      location: 'Manali, India',
      category: 'travel',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      fullSize: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 2,
      title: 'Street Food',
      location: 'Delhi, India',
      category: 'food',
      thumbnail: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      fullSize: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 3,
      title: 'Beach Volleyball',
      location: 'Goa, India',
      category: 'adventure',
      thumbnail: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      fullSize: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 4,
      title: 'Photography Walk',
      location: 'Mumbai, India',
      category: 'hobbies',
      thumbnail: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      fullSize: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 5,
      title: 'Temple Visit',
      location: 'Rishikesh, India',
      category: 'travel',
      thumbnail: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      fullSize: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 6,
      title: 'Spice Market',
      location: 'Jaipur, India',
      category: 'food',
      thumbnail: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      fullSize: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 7,
      title: 'River Rafting',
      location: 'Rishikesh, India',
      category: 'adventure',
      thumbnail: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      fullSize: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 8,
      title: 'Guitar Sessions',
      location: 'Home Studio',
      category: 'hobbies',
      thumbnail: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      fullSize: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    }
  ];

  ngOnInit(): void {
    this.filteredGalleryItems = [...this.galleryItems];
    this.startSlideshow();
  }

  ngOnDestroy(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  // Category filtering
  filterByCategory(category: string): void {
    this.activeCategory = category;
    if (category === 'all') {
      this.filteredGalleryItems = [...this.galleryItems];
    } else {
      this.filteredGalleryItems = this.galleryItems.filter(item => item.category === category);
    }
  }

  // Slideshow functionality
  startSlideshow(): void {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopSlideshow(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  nextSlide(): void {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.showcaseSlides.length;
  }

  previousSlide(): void {
    this.currentSlideIndex = this.currentSlideIndex === 0
      ? this.showcaseSlides.length - 1
      : this.currentSlideIndex - 1;
  }

  goToSlide(index: number): void {
    this.currentSlideIndex = index;
  }

  // Lightbox functionality
  openLightbox(item: GalleryItem): void {
    this.selectedImage = item;
    this.lightboxActive = true;
    this.stopSlideshow();
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.lightboxActive = false;
    this.selectedImage = null;
    this.startSlideshow();
    document.body.style.overflow = 'auto';
  }

  // Handle keyboard events
  onKeydown(event: KeyboardEvent): void {
    if (this.lightboxActive) {
      if (event.key === 'Escape') {
        this.closeLightbox();
      }
    }
  }
}
