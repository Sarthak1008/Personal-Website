import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit,Inject, PLATFORM_ID} from '@angular/core';

@Component({
  selector: 'app-name',
  standalone: true,
  templateUrl: './name.component.html',
  imports: [],
  styleUrls: ['./name.component.sass']
})
export class NameComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.typeWriter();
    }
  }


document:any
  typeWriter() {
    const element = document.querySelector('.typewriter') as HTMLElement;
    const textArray = [
      "Writer 📜",
      "Travel Enthusiast 🏔",
      "Coffee Enthusiast ☕",
      "Cricket & Football Sportsman 🏏",
      "Tech Stack Explorer 🛠️",
      "Movie Enthusiast 🎞"
    ];
    let arrayIndex = 0;
    let charIndex = 0;

    const type = () => {
      if (charIndex < textArray[arrayIndex].length) {
        element.textContent += textArray[arrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 120);
      } else {
        setTimeout(erase, 1800);
      }
    };

    const erase = () => {
      if (charIndex > 0) {
        element.textContent = textArray[arrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 60);
      } else {
        arrayIndex = (arrayIndex + 1) % textArray.length;
        setTimeout(type, 300);
      }
    };

    type();
  }
}

