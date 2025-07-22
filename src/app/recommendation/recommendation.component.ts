import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Card {
  image: string;
  name: string;
  title: string;
  description: string;
  showFullDescription: boolean;
}

@Component({
  selector: 'app-recommendation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recommendation.component.html',
  styleUrl: './recommendation.component.sass'
})
export class RecommendationComponent {
  cards: Card[] = [
    {
      image: 'https://static.vecteezy.com/system/resources/previews/002/002/297/non_2x/beautiful-woman-avatar-character-icon-free-vector.jpg',
      name: 'Ghausia Fatima',
      title: 'HR Manager at Reshita',
      showFullDescription: false,
      description: "I have had the pleasure of working closely with Sarthak Agarwal during his tenure at Reshita, where he served as a Software Engineer. Sarthak's contributions to our projects, particularly in the development of the MedTech Clinic Management System and Internal Management System (IMS), have been exceptional.Sarthak possesses a comprehensive skill set, with expertise in Java, Spring Boot, MySQL, Hibernate, and more. His proficiency extends to various technologies crucial for our projects, including payment gateways, AWS, web sockets, JUnit, Mockito, Apache Kafka, and Git."
    },
    {
      image: 'https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png',
      name: 'Akhilesh Bibiyan',
      title: 'Embedded 5G',
      showFullDescription: false,
      description: "I have had the pleasure of witnessing Sarthak's growth firsthand during his time as an intern at our company. From his initial days, it was evident that he possessed a strong willingness to learn and adapt. Over time, Sarthak has not only honed his skills but has also demonstrated a remarkable level of dedication and professionalism.It's been inspiring to see him evolve into a competent professional, consistently delivering quality work and contributing positively to our team. I have no doubt that Sarthak will continue to excel in his career endeavors.I highly recommend Sarthak and I am confident in his abilities."
    },
    {
      image: 'https://cdn-icons-png.freepik.com/512/186/186313.png',
      name: 'Shubham Tanger',
      title: 'Full Stack Developer',
      showFullDescription: false,
      description: "During Sarthak's tenure at PureSoftware as my colleague, I witnessed his exemplary dedication to learning and exploration. His insatiable curiosity and enthusiasm for delving into the functionalities of various libraries and crafting diverse applications were truly commendable.Throughout the internship, Sarthak showcased a remarkable commitment to backend development, particularly in Java and Spring Boot. His proactive engagement in exploring the depths of these frameworks exemplified his passion for technology and his eagerness to push the boundaries of what can be achieved."
    }

  ];

  toggleDescription(card: Card) {
    card.showFullDescription = !card.showFullDescription;
  }

  trackByCardName(index: number, card: Card) {
    return card.name; // Ensure each card is uniquely identified for efficient tracking
  }
}
