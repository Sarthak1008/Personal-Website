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
    { id: 'contact', title: 'Contact', emoji: '📞' }
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
        msg: "I'm currently serving my notice period and will be available to join soon. Always committed to smooth transitions! Would you like to know about my experience or tech stack?",
        emoji: '⏱️',
        options: [
          { id: 'exp', title: 'Experience', emoji: '💼' },
          { id: 'skills', title: 'Tech Stack', emoji: '🛠️' },
        ]
      },
      'exp': {
        msg: `I have 1+ years’ experience:\n\n• Software Developer - LogicSoft (2024–Now)\n• Associate Software Developer - Reshita (2023–24)\n• Engineer Trainee - PureSoftware (2023)\n\nCurious about a project or my responsibilities at any company?`,
        emoji: '💼',
        options: [
          { id: 'logicsoft', title: 'LogicSoft', emoji: '🏢' },
          { id: 'reshita', title: 'Reshita', emoji: '🏢' },
          { id: 'puresoftware', title: 'PureSoftware', emoji: '🏢' },
        ]
      },
      'logicsoft': {
        msg: "At LogicSoft, I built modules for FCIQMS - like an Officer Transfer Management module (reduced tickets by 60%), grain sample tracking (50k+ monthly), and monitoring with Prometheus, Grafana and ELK. Improved API speed by 40% via Redis.",
        emoji: '🏢',
        options: [
          { id: 'skills', title: 'Tech Stack', emoji: '🛠️' },
          { id: 'projects', title: 'Main Projects', emoji: '🚀' },
        ]
      },
      'reshita': {
        msg: "At Reshita, I migrated a MedTech Clinic Management system to microservices (Spring Boot, MySQL), handled secure JWT login, reduced admin time by 35%, and added PayPal payments. Also built an agile internal management & monitoring system with Kafka and Jaeger.",
        emoji: '🏢',
        options: [
          { id: 'skills', title: 'Tech Stack', emoji: '🛠️' },
          { id: 'projects', title: 'Main Projects', emoji: '🚀' },
        ]
      },
      'puresoftware': {
        msg: "At PureSoftware I built UIs in React/Material-UI (got 25% more user interaction), and backends in Spring Boot - boosting system scalability 40%.",
        emoji: '🏢',
        options: [
          { id: 'skills', title: 'Tech Stack', emoji: '🛠️' },
          { id: 'projects', title: 'Main Projects', emoji: '🚀' },
        ]
      },
      'skills': {
        msg: "Core skills: Java, Python, SpringBoot, Hibernate, Kafka, MySQL, PostgreSQL, MongoDB, Redis, HTML/CSS, SQL. Tools: VS Code, GitHub, AWS, GCP, Prometheus, Grafana, ELK Stack, Jaeger, Power BI.\n\nWant to know about Monitoring & Observability or Coding Projects?",
        emoji: '🛠️',
        options: [
          { id: 'monitoring', title: 'Monitoring/Observability', emoji: '📊' },
          { id: 'projects', title: 'Projects', emoji: '🚀' },
          { id: 'back', title: 'Back', emoji: '⬅️' }
        ]
      },
      'monitoring': {
        msg: "Worked with Prometheus, Grafana, ELK Stack & Jaeger to set up alerting, real-time dashboards, and incident tracing – cut incident resolution time by 50%.",
        emoji: '📊',
        options: [
          { id: 'skills', title: 'Tech Stack', emoji: '🛠️' },
          { id: 'back', title: 'Back', emoji: '⬅️' }
        ]
      },
      'projects': {
        msg: "Main project: Doc-Aid – a Clinic Management System (Java, SpringBoot, MySQL) for appointments and prescriptions; got an award from former IT Minister Ravi Shankar Prasad. Want details?",
        emoji: '🚀',
        options: [
          { id: 'docaid', title: 'Doc-Aid', emoji: '🏆' },
          { id: 'back', title: 'Back', emoji: '⬅️' }
        ]
      },
      'docaid': {
        msg: "Doc-Aid: End-to-end clinic/doctor workflow, built & deployed in 2023-2024. Awarded for technical innovation at its official launch. Made for modern, flexible care.",
        emoji: '🏆',
        options: [
          { id: 'projects', title: 'Other Projects', emoji: '🚀' },
          { id: 'back', title: 'Back', emoji: '⬅️' }
        ]
      },
      'education': {
        msg: "B.Tech in Computer Science (Manipal University Jaipur, 2019–23, GPA 8.66). Major courses: Data Structures, Java OOPs, Crypto & Security, ML. School: Sagar Public School, Bhopal.",
        emoji: '🎓',
        options: [
          { id: 'contact', title: 'Contact', emoji: '📞' },
          { id: 'back', title: 'Back', emoji: '⬅️' }
        ]
      },
      'contact': {
        msg: "You can reach me at +91 8519013280 or on LinkedIn, GitHub and LeetCode (links in portfolio header). Open to roles and collaborations!",
        emoji: '📞',
        options: [
          { id: 'main', title: 'Main Menu', emoji: '🏠' }
        ]
      }
    }

  messages: Message[] = [{
    user: false,
    text: "👋 Hey there! I'm your interactive portfolio assistant. What would you like to know about Sarthak Aggarwal?",
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

