import { DecimalPipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service'; // Adjust path as needed

interface ContributionData {
  total: Record<string, number>;
  contributions: any[]; // or proper type for contributions
}

@Component({
  selector: 'app-leetcode',
  standalone: true,
  templateUrl: './leetcode.component.html',
  styleUrls: ['./leetcode.component.sass'],
  imports: [DecimalPipe],
})
export class LeetcodeComponent implements AfterViewInit {
  @ViewChild('mainChartCanvas') mainChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('submissionCalendar') submissionCalendar!: ElementRef<HTMLDivElement>;

  // Add properties for stats
  totalSolved = 0;
  totalQuestions = 0;
  easySolved = 0;
  totalEasy = 0;
  mediumSolved = 0;
  totalMedium = 0;
  hardSolved = 0;
  totalHard = 0;
  acceptanceRate = 0;
  ranking = 0;
  contributionPoints = 0;
  reputation = 0;
  submissionCalendarData: { [key: string]: number } = {};
  totalSubmissions = 0;
  totalContributions = 0;
  longestStreak = 0;

  constructor(private apiService: ApiService) { }

  ngAfterViewInit() {
    this.apiService.getLeetCodeData().subscribe(data => {
      // Patch stats
      this.totalSolved = data.totalSolved;
      this.totalQuestions = data.totalQuestions;
      this.easySolved = data.easySolved;
      this.totalEasy = data.totalEasy;
      this.mediumSolved = data.mediumSolved;
      this.totalMedium = data.totalMedium;
      this.hardSolved = data.hardSolved;
      this.totalHard = data.totalHard;
      this.acceptanceRate = data.acceptanceRate;
      this.ranking = data.ranking;
      this.contributionPoints = data.contributionPoints;
      this.reputation = data.reputation;
      this.submissionCalendarData = data.submissionCalendar;
      this.totalSubmissions = Object.values(data.submissionCalendar).map(Number).reduce((a: number, b: number) => a + b, 0);

      // --- Submission Activity Calendar ---
      const calendarContainer = this.submissionCalendar.nativeElement;
      const today = new Date();
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - 90);

      for (let i = 0; i < 90; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        const timestamp = Math.floor(date.getTime() / 1000);
        const submissions = this.submissionCalendarData[timestamp] || 0;

        let level = '1';
        if (submissions > 0) {
          if (submissions === 1) level = '1';
          else if (submissions <= 3) level = '2';
          else if (submissions <= 5) level = '3';
          else if (submissions <= 7) level = '4';
          else level = '5';
        }
        const cell = document.createElement('span');
        cell.className = `calendar-cell legend-cell--${level}`;
        cell.title = `${date.toLocaleDateString()}: ${submissions} submissions`;
        calendarContainer.appendChild(cell);
      }

      // --- CHART.JS logic ---
      const ctx = this.mainChartCanvas.nativeElement.getContext('2d')!;

      const doughnutData = {
        labels: [
          `Easy (${data.easySolved})`,
          `Medium (${data.mediumSolved})`,
          `Hard (${data.hardSolved})`
        ],
        datasets: [{
          data: [data.easySolved, data.mediumSolved, data.hardSolved],
          backgroundColor: [
            'rgba(16, 185, 129, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(239, 68, 68, 0.8)'
          ]
        }]
      };

      const progressData = {
        labels: ['Easy', 'Medium', 'Hard', 'Total'],
        datasets: [
          {
            label: 'Solved',
            data: [data.easySolved, data.mediumSolved, data.hardSolved, data.totalSolved],
            backgroundColor: 'rgba(79, 70, 229, 0.8)'
          },
          {
            label: 'Remaining',
            data: [
              data.totalEasy - data.easySolved,
              data.totalMedium - data.mediumSolved,
              data.totalHard - data.hardSolved,
              data.totalQuestions - data.totalSolved
            ],
            backgroundColor: 'rgba(209, 213, 219, 0.8)'
          }
        ]
      };

      let mainChart = new (window as any).Chart(ctx, {
        type: 'doughnut',
        data: doughnutData
      });

      document.querySelectorAll('[data-chart]').forEach(tab => {
        tab.addEventListener('click', (event) => {
          document.querySelectorAll('.tab').forEach(t => t.classList.remove('tab--active'));
          (event.currentTarget as HTMLElement).classList.add('tab--active');

          if ((event.currentTarget as HTMLElement).getAttribute('data-chart') === 'difficulty') {
            mainChart.destroy();
            mainChart = new (window as any).Chart(ctx, { type: 'doughnut', data: doughnutData });
          } else {
            mainChart.destroy();
            mainChart = new (window as any).Chart(ctx, {
              type: 'bar',
              data: progressData,
              options: {
                indexAxis: 'x',
                plugins: { legend: { display: true } },
                scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true } }
              }
            });
          }
        });
      });
    });

    this.apiService.getGitHubData().subscribe((data: ContributionData) => {
      const totals = Object.values(data.total); // now totals inferred as number[]

      const totalContributions = totals.reduce((sum, val) => sum + val, 0);
      this.totalContributions = totalContributions;
      console.log('Total contributions:', this.totalContributions);
      let currentStreak = 0;
      let longestStreak = 0;

      for (const day of data.contributions) {
        if (day.count > 0) {
          currentStreak++;
          if (currentStreak > longestStreak) longestStreak = currentStreak;
        } else {
          currentStreak = 0;
        }
      }
      this.longestStreak = longestStreak;
      console.log('Longest streak:', this.longestStreak);
      
      
    });


  }
}
