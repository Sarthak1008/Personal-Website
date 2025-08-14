import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Skill {
  name: string;
  icon?: string;
}

interface SkillCategory {
  name: string;
  icon: string;
  gradient: string;
  skills: Skill[];
}


interface FloatingShape {
  size: number;
  left: number;
  delay: number;
}

interface NotificationState {
  show: boolean;
  message: string;
  x: number;
  y: number;
}


@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.sass'
})
export class SkillsComponent implements OnInit, OnDestroy {
  @ViewChild('skillsGrid', { static: false }) skillsGrid!: ElementRef<HTMLDivElement>;

  // Component state
  pageTitle = 'My Skills';
currentView: 'hover' | 'logo' = 'logo'; // now logo view is default

  titleAnimating = false;
  animatingCards = false;

  notification: NotificationState = {
    show: false,
    message: '',
    x: 50,
    y: 50
  };

  // Floating shapes configuration
  floatingShapes: FloatingShape[] = [
    { size: 80, left: 10, delay: 0 },
    { size: 60, left: 20, delay: -5 },
    { size: 100, left: 70, delay: -10 },
    { size: 40, left: 80, delay: -15 }
  ];

  public skillCategories: SkillCategory[] = [
    {
      name: 'Programming Languages',
      icon: '💻',
      gradient: 'linear-gradient(135deg, #6c63ff, #5a54d6)',
      skills: [
        { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
        { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
        { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
        { name: 'SQL',icon: '../../assets/sql.jpeg' },
        { name: 'R', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg' }
      ]
    },
    {
      name: 'Development Tools',
      icon: '🛠️',
      gradient: 'linear-gradient(135deg, #818cf8, #6366f1)',
      skills: [
        { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
        { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
        { name: 'GitLab', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg' },
        { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
        { name: 'WordPress', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg' },
        { name: 'Jira', icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/jira.svg'},
        { name: 'Tableau', icon: 'https://cdn.worldvectorlogo.com/logos/tableau-software.svg'},
        { name: 'Power BI', icon: 'https://cdn.worldvectorlogo.com/logos/power-bi.svg'}
      ]
    },
    {
      name: 'Frameworks & Technologies',
      icon: '⚡',
      gradient: 'linear-gradient(135deg, #a855f7, #8b5cf6)',
       skills: [
        { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
        { name: 'Hibernate', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hibernate/hibernate-original.svg' },
        { name: 'Apache Kafka', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg' },
        { name: 'JDBC', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmT5h5HEkiMWGX0RaprJOmld4uujKqIgslVQ&s'}, // No official icon
        { name: 'JUnit & Mockito', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/junit/junit-original.svg' }, // Only JUnit icon available
        { name: 'Spring Security', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
        { name: 'JWT', icon: 'https://seeklogo.com/images/J/json-web-tokens-jwt-io-logo-C003DEC47A-seeklogo.com.png' }, // Community logo
        { name: 'SMTP',icon:'https://wpforms.com/wp-content/uploads/cache/integrations/b40f9170b5be1518802949ef1fe8d0e3.png'}
      ]
    },
    {
      name: 'Databases & Storage',
      icon: '🗄️',
      gradient: 'linear-gradient(135deg, #10b981, #059669)',
      skills: [
        { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
        { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
        { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
        { name: 'AWS RDS',icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2FrKzOSe8tulfZqJEVmzMAVefqKTKo62dcQ&s' },
        { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' }
      ]
    },
    {
      name: 'Cloud & Monitoring',
      icon: '☁️',
      gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
      skills: [
        { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg' },
        { name: 'GCP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
        { name: 'Prometheus', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg' },
        { name: 'Grafana', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg' },
        { name: 'ELK Stack', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhGKTa0OVt0DLMFvHhIuPmdtmt7Ydon_2c6w&sdata:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXoAAACFCAMAAABizcPaAAABelBMVEX///9AvrAjHyDoR4vyvRo3pZXvvxsKpd4Am4/XoikAAACE1830wSwbFhdbV1g3p5fw+Pc7sqMouKn9yRlRQB4cGiAvf3Pc6O0AlYjsaZ/uvAD25sOq3NfUnA9f0sX77MG36uQiDRIAntvg8vj85LR/xbrwuABawrNfuasjAAAhAAkiGBrmM4IAGxIfHh4jFQ0TDQ7214L//ffjsSHjt2Hnth7/+vz96/JGtOTq7e58foBBR0okCQAWeKHX7fnP0tWusLMAHBFnZ2hivObL6/qz3/c/PD333pr103Dwy1nyyUX/+uz2pcT64KDwgq301Hr5x9r88tjszpTeqzrw27PszIvkvXbdqSX2scvykbb71uPucaMAeKiDy+0bWXbUb5jKSH7cR4chLjoADwA2JylnL0WMOFqmPWi/QXQQjr95M09VLDweRFdVOUQAMCWWyuYvdGorWlMnPTpOPhpUmIaamZkAYIglLiy06eLT8OwrUUtaTVBgf3nBwcH+9jmRAAAK/klEQVR4nO2c6V8TRxjHyTYkhITDVC2GCAsqQcADqlTswdEWCNZatHdrK61XtbYetZq2/u/d3Rws2Z2Z53nmmWGXD7+XebHPzDdPnuc3x6anh6iF7fGN+c36Vinnq7RV35zfOD16jfq4nlI2Kv+x8xvj2+SH0nTiLQua+4wytIXxjXqu4isXVvBJpT4/TuIfh97TlK9K/bpN/DbQz32OH9f2xlYEevc3ULoxvoB9rgB95wsobVijbwP9CeygRm/kZNTD+OuncfSl6Jv4t8ax46XJBvpF1IiuzcO4d+hvjiKerkTv0y+dxkGkyTz6ufcw4xnfQnBv08/BUx+C3oOftZD5xtHPfYEYzekSlnub/gYQPgy9B79Od1FAmUaPMTdU8Bj4UPRezb9OZQqUYfQIc+OVGjL4AH4OwgqM3k98tH9CyTB6sLm5duldLfAB/JK64SLQexXfqNE0jB5qbm6eLBQK2uxzlU1VomLQe/BNWh2j6KHmZvuWT75QuKzPvqKwJjj02akNfcQimUQPNTc3m+BZ2KsSH4neJHuD6IHmZuFSh3yhoF/wvYovq9BY9AbZm0MPNDfbhT1iYJ+rSCo0Gr25em8OPczcfHmyYID9vDAeHn12CrNRgZA59CBz81U3eSb2dVFAAvrslJmFrSn0MHPzdZQ8E/stQbOloM+WOIl3ZAg9zNxciiPPxL4Un6ok9FM3WJm3ZAY9zNwIyLN4TE+x7EnozZR7I+hh5kZInmNd6yuu5tDQZ7PM2H0ZQQ8yNxLyPOwrpRj2RPRTYs9ElhH0EHMT22E7+oaF/VY0LDXrDbgcA+hB5uamlDwX+6jHJKPn77T86EHmZlRBnqnVRtdWVPQG0p4d/dy3gKjXlOSZWm1kT4GOnj3tudHPfQeJektNnqnkdO8hk9Fnp7jPrLjRg8yNvMW2xbGLGdn60kDPfVbLjR5ibtSFnqnkxGxh0tFnY/xSgtCDzM0CkLx2yYk7sdJAP8V8UsuKHrhzAySv6XIqsTsJOuiZKw4nepC5AZcbzZJT2YyNroGeu+IwooeZmwU4eI1OW8kJjsd10DNbe0b0sGMp1TKWI+0rFeGBqhZ63v1LRvSgYynIYkov7SvSO4Ba6HlPyNnQA+/cwCw9Oe39O9/Smzha6IXHjiRxoZ/7HhRu+yRSlysI5erKd0J00DMfFDKhh5kbD/0oVuNAjW5vQ7qgFvoK614CD3qYuUmCtNDzWhwe9D9wDsmo9NCzrmd50OPeltpP6aFnfc2HAz3uban9lR561juADOiB5iYZOlDooeYmGTpI6NNjbgIdJPTpMTeBDhL69JibQAcHPcbcvGNEp4ZR8z0w6FHmZr2fph8n5cpfuf0JeBAHBT3K3Cz1OyRd+Cmvkof/T+AoEoT+5zuBdnZ2CORR5maFiN75RYk+oP8paBQJQj/46zlPq6ur5847d+/df/AQ8RXgzM3Vi0T0H0DQe/CvQKp+ktAPtCZ43jnvyf8anEcPHkLI7+DMzfsDUsAS9L/B2OfzH6lHkUT0u/K/AJ+/Kv+ROzfUeuNc+BCKflLNPtno2/xX7z6SlB/szs0yHb26z3bYn1INIwXo2/gfC5IfvXND7rLO7O9g9Pm8ahgpQR/g9+nHkEfv3JC7rOMcg5OfvK0YRorQN+nf6+67+J2bNWqXBVucJntFuU8X+oC+cz9ceJDmxhfZ4DjOWQT6/MfyYaQOfZD6j+5QzY0vcqn30IPdZV7ZaVOI3qe/+vgOydwE0kAPN/Y+evmWQjrR+/Cf3CEeS1F3cAL0YGPv64p0HGlF79edJzuk/4am23rMmipIe+l+QnrRO87AH7UGIY5F9NId5DSjd4Z6+87gjid8WUQv3cJMMfqJ3qFeT1VsHIvopX02vehnjgfke/umkVXnEH1EOPQzT5vkffi4xD9EHxEK/cSzI727GsIk/mGtjwiDfvZ5mDwu8Q8dTkQY9OeHeveqbxpsdZLi69/W0n6hb5mbvYIWnaSsZo++OErXi79qIY0hFJcOcPRtc9OV+NCik5A9nPVjGpo5Hp76kQxYZS30IXPTVXQShl6+c6mxd+397vdkny30e83NHg2BCr7Ofv0kAr1ivx6/eg9D2A/03eYmrEwGUvA1TqkwRyWqUyqNc8p9Qh8xN2HymbKrRq8x51kEedXZbOrQx5qb0AAA7BNyI+FlytDPjMjJe89WGh26sZ/lvIdDzwBnP9DH28pAQ52HF1WTTsbtM52lnX30EnPTG3q6in0y7lzqLO2so5ebGzh7coMDGhzYTWOd9YV19HJzE36+vN7TqywIfB52v15rTWUZ/YQQfCS2nD31pw4wOIi3SrTcpV30anMTjuDKJk19l+pvzneptCyOVfQQcxMOIVvXkt8RlAt5RK/TZ22in3gGLfSyGMkSnbxN9LP/wMxNWNZRYqVR7O2hn32FzHlfNesskXpDrzj20CPMTSiKclm7z1pMAXqUuQmFcW3DRIq+fW0LPdLchOJQ7mRaFN1eWkI/ITgQlBb6lqzTRGmR3GftoKeYm06ghJd7ssexgp5kbnYjubZpokTeOLaDXggeFlG0smpU0XKhajSg67l1YqO1gf6s4kBQKVHJaYxg1Zcpg+XFfQ3BT220FtCfpZqb3ViuYNZnRvpQGoHPrxm4nKmq6dPIW0A/8ZTeYjsSzH8Yib4PiT6gP6ayt8S0N45+QsPc7AYTlRxc2o8g5heOroJPIm8c/exzHXOzG000edNJ3wovN7i0tDee9ULwmGDifTQXkfbEpA9mK78TRzI5htHP6JqbTjhXMOtpBHsk770DkJ1Xkry9WfT65mZXglkPw5MeG7FrwrKiQ1nSGkUv2blBkxdmHbjkoEN2j0ByeLBEqDgm0bOYG3lAX1CXgw/ZPQIJe8KRiUH0TOamE1D4gx8ClRt6j90dwpiY/Rq65JjMejF5EgZh2sMWVpSQ3SNwxeh7HGzNMYeezdx0IgrTvqFmr9ljmwOQXspCuxxj6MnHUhIJt1OqKvYs5UZxcIBdWJlCL3pPTYd8+bVw2spWS40ZkvJ2xFUce0PoYVe50RJPW7Gy0ogJCN6ZPqrVmkEPvcqNlKzNydhzFHpxtQsJtaFgKOuZzU1bst+8mD1HoQeR71m8i2BvBL3qPTWypDdDhOx1l7G+gKeFSwiLaQK9CXPTktRkiHqtZkx/GQu+d4tgbwC9zp0bpaTzjmevHVO2iI2yX4f2Wn70hsxNK6ornXecv9ePibwINAj0mOzoDZmbthQJ2Ojrhq8dEX8NCOjvudHPmjI3srAhDXc1W+14oL9s6NJKP6Tgc6M3Zm7aYcUr2pb2FB3tcLRbh8sOoOAzo58wZ25aUr/s0BgaYas2Lom8pzV10eFF/6+BnRtI3C61E183VFHjXa43/arE50X/n0Fb2Y7rAubdrPiagShVPqTFNUXF50U/bZy8YlXVUaNXj3w5o2wqSi2vS6uOJfQsLbYl4MRdDx9V5TLgqiVAK44Evh30nOThb/i4NRp80B1XKPwBYdmxgp6rxTYDI/4FtjGGh1/OuEzYm1p5JYBvBT16+lKhrPZwFVV3yuUi/2tzy2v9cfRtoEfDVQg580bRvycPmVKm6DKQjtHSymCUvgX0VMLCyPi8bFRrCvrlcq0IfoWHoqWVNaf/4sCATfScLbYZ2SXNvVEtZprv6XQ9zvuoVnRt/BPG8sqa/18yF5vfgHH07OR13uYcbrjVYrE4NhY8qDZWKxarrtFkj2r5zcura4OD68zoz0RVNKD/ARHl/3XlTSziAAAAAElFTkSuQmCChttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6SIlPq_Cb3lHlbX2oI-xwXcdLH6wnrpdk1w&shttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFKm6dvbjzEhHpZyjGq9ph2o9eesDJpGYwdKfuIrRVaWKr6FD4WFvIngCAjR2E7PjXoXE&usqp=CAU' }, // No universal logo, this is a community version
        { name: 'Jaeger', icon: 'https://i.pinimg.com/736x/a3/a8/33/a3a83349069eb81816459fa70677611b.jpg' },
        { name: 'AlertManager', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg' }
      ]
    }
  ];

  displayedCategories: SkillCategory[] = [];
  private notificationTimeout?: ReturnType<typeof setTimeout>;

  constructor() {}

  ngOnInit(): void {
    this.displayedCategories = [...this.skillCategories];
  }

  ngOnDestroy(): void {
    if (this.notificationTimeout) {
      clearTimeout(this.notificationTimeout);
    }
  }

  // View switching
  switchView(view: 'hover' | 'logo'): void {
    this.currentView = view;
  }

  // Title animation trigger
  triggerTitleAnimation(): void {
    this.titleAnimating = true;
    setTimeout(() => {
      this.titleAnimating = false;
    }, 1000);
  }

  // Animate all cards
  animateAll(): void {
    this.animatingCards = true;
    
    // Reset animation state after completion
    setTimeout(() => {
      this.animatingCards = false;
    }, 1000);
  }

  // Shuffle skills functionality
  shuffleSkills(): void {
    // Create shuffled copy
    const shuffled = [...this.skillCategories];
    
    // Fisher-Yates shuffle algorithm
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Apply shuffle with animation
    this.displayedCategories = shuffled;
    this.animateAll();
  }

  // Handle skill item clicks
  onSkillClick(skillName: string): void {
    // Generate random position for notification
    const x = 30 + Math.random() * 40; // Between 30% and 70%
    const y = 30 + Math.random() * 40; // Between 30% and 70%
    
    this.showNotification(`${skillName} clicked!`, x, y);
  }

  // Show floating notification
  private showNotification(message: string, x: number, y: number): void {
    // Clear existing timeout
    if (this.notificationTimeout) {
      clearTimeout(this.notificationTimeout);
    }

    // Set notification state
    this.notification = {
      show: true,
      message,
      x,
      y
    };

    // Hide notification after 2 seconds
    this.notificationTimeout = setTimeout(() => {
      this.notification.show = false;
    }, 2000);
  }

  // Handle scroll wheel events
  // onScroll(event: WheelEvent): void {
  //   event.preventDefault();
    
  //   if (this.skillsGrid?.nativeElement) {
  //     this.skillsGrid.nativeElement.scrollLeft += event.deltaY;
  //   }
  // }

  // Handle image loading errors
  onImageError(event: Event, skill: Skill): void {
    // Remove the icon property to fall back to text initial
    const target = event.target as HTMLImageElement;
    target.style.display = 'none';
    
    // You could also implement a fallback icon service here
    console.warn(`Failed to load icon for ${skill.name}`);
  }

  // Get first letter for fallback icons
  getInitial(name: string): string {
    return name.charAt(0).toUpperCase();
  }

  // Utility method to track items in *ngFor
  trackByIndex(index: number, item: any): number {
    return index;
  }

  trackByName(index: number, item: SkillCategory): string {
    return item.name;
  }

  trackBySkillName(index: number, item: Skill): string {
    return item.name;
  }

  // Public methods for external interaction
  public addSkillCategory(category: SkillCategory): void {
    this.skillCategories.push(category);
    this.displayedCategories = [...this.skillCategories];
  }

  public removeSkillCategory(categoryName: string): void {
    this.skillCategories = this.skillCategories.filter(cat => cat.name !== categoryName);
    this.displayedCategories = [...this.skillCategories];
  }

  public updateSkillCategory(categoryName: string, updatedCategory: Partial<SkillCategory>): void {
    const index = this.skillCategories.findIndex(cat => cat.name === categoryName);
    if (index !== -1) {
      this.skillCategories[index] = { ...this.skillCategories[index], ...updatedCategory };
      this.displayedCategories = [...this.skillCategories];
    }
  }

  public addSkillToCategory(categoryName: string, skill: Skill): void {
    const category = this.skillCategories.find(cat => cat.name === categoryName);
    if (category) {
      category.skills.push(skill);
      this.displayedCategories = [...this.skillCategories];
    }
  }

  public removeSkillFromCategory(categoryName: string, skillName: string): void {
    const category = this.skillCategories.find(cat => cat.name === categoryName);
    if (category) {
      category.skills = category.skills.filter(skill => skill.name !== skillName);
      this.displayedCategories = [...this.skillCategories];
    }
  }

  // Auto-scroll functionality (optional)
  public startAutoScroll(intervalMs: number = 3000): void {
    if (!this.skillsGrid?.nativeElement) return;

    const container = this.skillsGrid.nativeElement;
    const scrollAmount = container.scrollWidth / this.displayedCategories.length;
    let currentScroll = 0;

    const autoScrollInterval = setInterval(() => {
      currentScroll += scrollAmount;
      if (currentScroll >= container.scrollWidth - container.clientWidth) {
        currentScroll = 0;
      }
      container.scrollTo({ left: currentScroll, behavior: 'smooth' });
    }, intervalMs);

    // Store interval for cleanup (you might want to store this in a property)
    // this.autoScrollInterval = autoScrollInterval;
  }

  // Performance optimization methods
  private debounce<T extends (...args: any[]) => void>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // Method to preload all skill icons
  public preloadIcons(): void {
    this.skillCategories.forEach(category => {
      category.skills.forEach(skill => {
        if (skill.icon) {
          const img = new Image();
          img.src = skill.icon;
        }
      });
    });
  }

  // Export/Import functionality for skills data
  public exportSkillsData(): string {
    return JSON.stringify(this.skillCategories, null, 2);
  }

  public importSkillsData(jsonData: string): boolean {
    try {
      const imported = JSON.parse(jsonData) as SkillCategory[];
      // Validate the structure
      if (Array.isArray(imported) && this.validateSkillCategories(imported)) {
        this.skillCategories = imported;
        this.displayedCategories = [...this.skillCategories];
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to import skills data:', error);
      return false;
    }
  }

  private validateSkillCategories(categories: any[]): boolean {
    return categories.every(category => 
      typeof category.name === 'string' &&
      typeof category.icon === 'string' &&
      typeof category.gradient === 'string' &&
      Array.isArray(category.skills) &&
      category.skills.every((skill: any) => typeof skill.name === 'string')
    );
  }

  // Search functionality
  public searchSkills(query: string): SkillCategory[] {
    if (!query.trim()) {
      return [...this.skillCategories];
    }

    const searchTerm = query.toLowerCase();
    return this.skillCategories
      .map(category => ({
        ...category,
        skills: category.skills.filter(skill =>
          skill.name.toLowerCase().includes(searchTerm)
        )
      }))
      .filter(category => 
        category.skills.length > 0 || 
        category.name.toLowerCase().includes(searchTerm)
      );
  }

  public filterByCategory(categoryName: string): void {
    if (categoryName === 'all') {
      this.displayedCategories = [...this.skillCategories];
    } else {
      this.displayedCategories = this.skillCategories.filter(
        category => category.name === categoryName
      );
    }
  }

  // Statistics methods
  public getTotalSkillsCount(): number {
    return this.skillCategories.reduce((total, category) => 
      total + category.skills.length, 0
    );
  }

  public getCategoryCount(): number {
    return this.skillCategories.length;
  }

  public getSkillsWithIcons(): number {
    return this.skillCategories.reduce((total, category) => 
      total + category.skills.filter(skill => skill.icon).length, 0
    );
  }

  // Theme customization
  public updateTheme(newTheme: { primaryColor?: string; accentColor?: string }): void {
    if (newTheme.primaryColor) {
      document.documentElement.style.setProperty('--primary-color', newTheme.primaryColor);
    }
    if (newTheme.accentColor) {
      document.documentElement.style.setProperty('--accent-color', newTheme.accentColor);
    }
  }

  // Accessibility methods
  public announceToScreenReader(message: string): void {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  // Keyboard navigation support
  public onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowLeft':
        this.scrollSkillsGrid(-200);
        break;
      case 'ArrowRight':
        this.scrollSkillsGrid(200);
        break;
      case 'Home':
        this.scrollToStart();
        break;
      case 'End':
        this.scrollToEnd();
        break;
      case 'Enter':
      case ' ':
        if (event.target instanceof HTMLElement && event.target.classList.contains('skill-item')) {
          const skillName = event.target.querySelector('.skill-name')?.textContent;
          if (skillName) {
            this.onSkillClick(skillName);
          }
        }
        break;
    }
  }

  private scrollSkillsGrid(amount: number): void {
    if (this.skillsGrid?.nativeElement) {
      this.skillsGrid.nativeElement.scrollBy({ left: amount, behavior: 'smooth' });
    }
  }

  private scrollToStart(): void {
    if (this.skillsGrid?.nativeElement) {
      this.skillsGrid.nativeElement.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }

  private scrollToEnd(): void {
    if (this.skillsGrid?.nativeElement) {
      const container = this.skillsGrid.nativeElement;
      container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
    }
  }
}