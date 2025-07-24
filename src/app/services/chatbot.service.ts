import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private resume: any;

  setResumeData(data: any) {
    this.resume = data;
  }

  getResponse(userMessage: string): string {
    const msg = userMessage.toLowerCase();

    if (!this.resume) return "Resume data is not loaded yet.";

    if (msg.includes('skills')) {
      return `My core skills are: ${this.resume.skills.join(', ')}`;
    }

    if (msg.includes('experience')) {
      const exp = this.resume.experience[0];
      return `I worked as a ${exp.role} at ${exp.company}, mainly in ${exp.domain}.`;
    }

    if (msg.includes('project')) {
      const p = this.resume.projects[0];
      return `One of my projects is '${p.name}', where I used ${p.tech.join(', ')}.`;
    }

    if (msg.includes('education')) {
      return `I completed ${this.resume.education.degree} from ${this.resume.education.university} in ${this.resume.education.year}.`;
    }

    return "I’m not sure how to answer that. Try asking about my skills, experience, or education.";
  }
}
