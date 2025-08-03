import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

interface Option {
  title: string;
  id: string;
  emoji?: string;
}

interface Message {
  text: string;
  user: boolean;
  emoji?: string;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.sass'
})
export class ChatbotComponent {

  chatOpen = false;
  typing: boolean = false;
  mainMenu = true;
  currentOptions: Option[] | null = null;

  menuOptions: Option[] = [
    { id: 'notice', title: 'Notice Period', emoji: '⏱️' },
    { id: 'exp', title: 'Experience', emoji: '💼' },
    { id: 'skills', title: 'Skills & Tech Stack', emoji: '🛠️' },
    { id: 'projects', title: 'Projects', emoji: '🚀' },
    { id: 'education', title: 'Education', emoji: '🎓' },
    { id: 'contact', title: 'Contact', emoji: '📞' },
    { id: 'recruiter', title: 'For Recruiters', emoji: '📄' }
  ];

  // Answers + follow up options by section
  sectionData: {
    [key: string]: {
      msg: string,
      emoji?: string,
      options: Option[]
    }
  } = {
      'notice': {
        msg: "Notice period: 45 days. Available to join after smooth transition!",
        emoji: '⏱️',
        options: [
          { id: 'exp', title: 'Experience', emoji: '💼' },
          { id: 'skills', title: 'Tech Stack', emoji: '🛠️' },
        ]
      },
      'exp': {
        msg: `1.5-2 years experience:\n\n• Software Developer - LogicSoft (2024–Now)\n• Associate Software Developer - Reshita (2023–24)\n• Engineer Trainee - PureSoftware (2023)\n\nWant details about any company?`,
        emoji: '💼',
        options: [
          { id: 'logicsoft', title: 'LogicSoft', emoji: '🏢' },
          { id: 'reshita', title: 'Reshita', emoji: '🏢' },
          { id: 'puresoftware', title: 'PureSoftware', emoji: '🏢' },
        ]
      },
      'logicsoft': {
        msg: "Built FCIQMS modules: Officer Transfer Management (60% fewer tickets), grain tracking (50k+ monthly), monitoring with Prometheus/Grafana/ELK. Improved API speed 40% with Redis.",
        emoji: '🏢',
        options: [
          { id: 'skills', title: 'Tech Stack', emoji: '🛠️' },
          { id: 'projects', title: 'Main Projects', emoji: '🚀' },
        ]
      },
      'reshita': {
        msg: "Migrated MedTech system to microservices (Spring Boot, MySQL). Added JWT security, PayPal payments, reduced admin time 35%. Built monitoring system with Kafka/Jaeger.",
        emoji: '🏢',
        options: [
          { id: 'skills', title: 'Tech Stack', emoji: '🛠️' },
          { id: 'projects', title: 'Main Projects', emoji: '🚀' },
        ]
      },
      'puresoftware': {
        msg: "Built React/Material-UI interfaces (25% more user engagement) and Spring Boot backends (40% better scalability).",
        emoji: '🏢',
        options: [
          { id: 'skills', title: 'Tech Stack', emoji: '🛠️' },
          { id: 'projects', title: 'Main Projects', emoji: '🚀' },
        ]
      },
      'skills': {
        msg: "Backend: Java, Python, SpringBoot, Hibernate, Kafka\nDatabases: MySQL, PostgreSQL, MongoDB, Redis\nFrontend: HTML/CSS, React\nTools: AWS, GCP, Docker, Git\n\nSpecialized in monitoring & observability?",
        emoji: '🛠️',
        options: [
          { id: 'monitoring', title: 'Monitoring/Observability', emoji: '📊' },
          { id: 'projects', title: 'Projects', emoji: '🚀' },
          { id: 'back', title: 'Back', emoji: '⬅️' }
        ]
      },
      'monitoring': {
        msg: "Expert with Prometheus, Grafana, ELK Stack & Jaeger. Set up real-time dashboards and alerting - reduced incident resolution time by 50%.",
        emoji: '📊',
        options: [
          { id: 'skills', title: 'Tech Stack', emoji: '🛠️' },
          { id: 'back', title: 'Back', emoji: '⬅️' }
        ]
      },
      'projects': {
        msg: "Flagship: Doc-Aid Clinic Management System (Java, SpringBoot, MySQL). Awarded by former IT Minister Ravi Shankar Prasad for innovation.",
        emoji: '🚀',
        options: [
          { id: 'docaid', title: 'Doc-Aid Details', emoji: '🏆' },
          { id: 'back', title: 'Back', emoji: '⬅️' }
        ]
      },
      'docaid': {
        msg: "Complete clinic workflow solution: appointments, prescriptions, patient management. Built 2023-24, officially recognized for technical excellence.",
        emoji: '🏆',
        options: [
          { id: 'projects', title: 'Other Projects', emoji: '🚀' },
          { id: 'back', title: 'Back', emoji: '⬅️' }
        ]
      },
      'education': {
        msg: "B.Tech Computer Science, Manipal University Jaipur (2019–23, GPA 8.66). Focus: Data Structures, Java OOPs, Security, ML.",
        emoji: '🎓',
        options: [
          { id: 'contact', title: 'Contact', emoji: '📞' },
          { id: 'back', title: 'Back', emoji: '⬅️' }
        ]
      },
      'contact': {
        msg: "📱 +91 8519013280\n📧 sarthak10082001@gmail.com\n🔗 LinkedIn, GitHub, LeetCode (see header)\n\nOpen to roles and collaborations!",
        emoji: '📞',
        options: [
          { id: 'main', title: 'Main Menu', emoji: '🏠' }
        ]
      },
      'recruiter': {
        msg: `**Quick Recruiter Info:**\n\n👨‍💻 Software Developer @ LogicSoft\n⏱️ Notice: 45 days\n📍 Prefer: Gurgaon (main), open to Noida/Faridabad/Delhi/Pune\n💻 Mode: Remote/Hybrid preferred, on-site works too\n💰 Current: ₹6.5L | Expected: ₹11L\n📝 Type: Full-time preferred, open to contract/freelance\n🎯 Role: Java Full Stack Developer\n👥 Team: Currently leading team, client-facing comfortable\n📧 sarthak10082001@gmail.com`,
        emoji: '📄',
        options: [
          { id: 'main', title: 'Main Menu', emoji: '🏠' }
        ]
      }
    }

  messages: Message[] = [{
    user: false,
    text: "👋 Hi! I'm Sarthak's portfolio assistant. What would you like to know?",
    emoji: '👋'
  }];

  @ViewChild('chatBody', { static: false }) chatBody!: ElementRef;

  toggleChat() {
    this.chatOpen = !this.chatOpen;
    if (this.chatOpen) {
      setTimeout(() => this.scrollToBottom(), 200);
      this.showMainMenu();
    }
  }

  showMainMenu() {
    // Reset to main menu
    this.mainMenu = true;
    this.currentOptions = null;
    this.scrollToBottom();
  }

  handleOption(op: Option, isMain?: boolean) {
    this.mainMenu = false;
    // Always show chosen option as user message
    this.messages.push({ user: true, text: op.title });
    if (op.id === 'back' || op.id === 'main') {
      this.showMainMenu();
      return;
    }
    // Get proper sectionData
    const sec = this.sectionData[op.id];
    if (sec) {
      // Show typing indicator
      this.typing = true;
      setTimeout(() => {
        this.typing = false;
        this.messages.push({ user: false, text: sec.msg, emoji: sec.emoji });
        this.currentOptions = sec.options;
        this.scrollToBottom();
      }, 700);  // 700ms delay; change to 500 or 1000 as you prefer
    } else {
      this.messages.push({ user: false, text: 'Please choose a menu option.', emoji: '🤔' });
      this.showMainMenu();
    }
    this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.chatBody && this.chatBody.nativeElement) {
        this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
      }
    }, 90);
  }
}