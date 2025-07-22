import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.sass'
})
export class FooterComponent {

  linkedin: string = "https://www.linkedin.com/in/sarthak-aggarwal-670a16194/";
  github: string = "https://github.com/Sarthak1008";
  leetcode: string = "https://leetcode.com/u/SarthakAgg/";
  email: string = "mailto:sarthak10082001@gmail.com";
  contact: string = "tel:+919166132801";

  lat: number = 23.2235; // Example latitude
  lng: number = 77.3987; // Example longitude
  zoom: number = 15;
  currentYear: number = new Date().getFullYear();
  today: string = new Date().toLocaleDateString();

}
