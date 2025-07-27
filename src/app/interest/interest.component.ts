import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-interest',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interest.component.html',
  styleUrl: './interest.component.sass'
})
export class InterestComponent {
funFacts = [
  {
    icon: '☕',
    title: 'Coffee Enthusiast',
    description: 'Fueled by coffee—over 365 cups consumed during coding marathons each year!'
  },
  {
    icon: '🏏',
    title: 'Cricket & Football Sportsman',
    description: 'A passionate player who brings teamwork and strategy from the sports field to tech.'
  },
  {
    icon: '🛠️',
    title: 'Tech Stack Explorer',
    description: 'Hands-on with Spring Boot, Kafka, AWS, and monitoring stacks—always eager to try new tools.'
  },
  {
    icon: '🚀',
    title: 'Performance Optimizer',
    description: 'Engineered microservices and caching solutions delivering 40%+ speed-ups and robust scalability in real-world systems.'
  }
];

}
