import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../services/chatbot.service';
import { ResumeService } from '../services/resume.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.sass'
})
export class ChatComponent implements OnInit {
  messages: { text: string; sender: 'user' | 'bot' }[] = [];
  userInput: string = '';

  constructor(
    private resumeService: ResumeService,
    private chatbotService: ChatbotService
  ) {}

  ngOnInit(): void {
    this.resumeService.getResumeData().subscribe({
      next: (data) => {
        this.chatbotService.setResumeData(data);
        this.messages.push({
          text: 'Hi! I am your resume bot. Ask me anything about my skills, experience, or education!',
          sender: 'bot'
        });
      },
      error: () => {
        this.messages.push({
          text: 'Failed to load resume. Please try again later.',
          sender: 'bot'
        });
      }
    });
  }

  sendMessage() {
    const question = this.userInput.trim();
    if (!question) return;

    this.messages.push({ text: question, sender: 'user' });

    const reply = this.chatbotService.getResponse(question);
    this.messages.push({ text: reply, sender: 'bot' });

    this.userInput = '';
  }
}
