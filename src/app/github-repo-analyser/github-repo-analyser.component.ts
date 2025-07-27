import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface FileData {
  name: string;
  path: string;
  size: number;
  type: string;
}

interface TechSection {
  name: string;
  class: string;
  icon: string;
  files: FileData[];
  expanded?: boolean;
}

interface RepoInfo {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  owner: {
    avatar_url: string;
  };
  default_branch: string;
}


@Component({
  selector: 'app-github-repo-analyser',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './github-repo-analyser.component.html',
  styleUrl: './github-repo-analyser.component.sass'
})
export class GithubRepoAnalyserComponent {
githubUrl: string = '';
  loading: boolean = false;
  errorMessage: string = '';
  repoInfo: RepoInfo | null = null;

  currentFilter: string = 'all';
  techData: TechSection[] = [];
  filteredTechData: TechSection[] = [];

  techMapping: { [key: string]: { name: string, class: string, icon: string } } = {
    'js': { name: 'JavaScript', class: 'tech-javascript', icon: '📄' },
    'jsx': { name: 'React', class: 'tech-react', icon: '⚛️' },
    'ts': { name: 'TypeScript', class: 'tech-typescript', icon: '📘' },
    'tsx': { name: 'React', class: 'tech-react', icon: '⚛️' },
    'py': { name: 'Python', class: 'tech-python', icon: '🐍' },
    'java': { name: 'Java', class: 'tech-java', icon: '☕' },
    'html': { name: 'HTML', class: 'tech-html', icon: '🌐' },
    'htm': { name: 'HTML', class: 'tech-html', icon: '🌐' },
    'css': { name: 'CSS', class: 'tech-css', icon: '🎨' },
    'scss': { name: 'CSS', class: 'tech-css', icon: '🎨' },
    'sass': { name: 'CSS', class: 'tech-css', icon: '🎨' },
    'less': { name: 'CSS', class: 'tech-css', icon: '🎨' },
    'vue': { name: 'Vue', class: 'tech-vue', icon: '💚' },
    'php': { name: 'PHP', class: 'tech-php', icon: '🐘' },
    'rb': { name: 'Ruby', class: 'tech-ruby', icon: '💎' },
    'go': { name: 'Go', class: 'tech-go', icon: '🐹' },
    'rs': { name: 'Rust', class: 'tech-rust', icon: '🦀' },
    'cpp': { name: 'C++', class: 'tech-cpp', icon: '⚡' },
    'cc': { name: 'C++', class: 'tech-cpp', icon: '⚡' },
    'cxx': { name: 'C++', class: 'tech-cpp', icon: '⚡' },
    'c': { name: 'C++', class: 'tech-cpp', icon: '⚡' },
    'cs': { name: 'C#', class: 'tech-csharp', icon: '🔷' },
    'swift': { name: 'Swift', class: 'tech-swift', icon: '🐦' },
    'kt': { name: 'Kotlin', class: 'tech-kotlin', icon: '🎯' },
    'dart': { name: 'Dart', class: 'tech-dart', icon: '🎯' },
    'sh': { name: 'Shell', class: 'tech-shell', icon: '⚡' },
    'bash': { name: 'Shell', class: 'tech-shell', icon: '⚡' },
    'zsh': { name: 'Shell', class: 'tech-shell', icon: '⚡' },
    'sql': { name: 'SQL', class: 'tech-sql', icon: '🗃️' },
    'md': { name: 'Markdown', class: 'tech-markdown', icon: '📝' },
    'json': { name: 'JSON', class: 'tech-json', icon: '📋' },
    'xml': { name: 'XML', class: 'tech-xml', icon: '📄' },
    'yml': { name: 'YAML', class: 'tech-yaml', icon: '📄' },
    'yaml': { name: 'YAML', class: 'tech-yaml', icon: '📄' },
    'dockerfile': { name: 'Docker', class: 'tech-docker', icon: '🐳' }
  };

  get techNames(): string[] {
    return this.techData.map(t => t.name);
  }

  async analyzeRepository(): Promise<void> {
    this.errorMessage = '';
    this.repoInfo = null;
    this.techData = [];
    this.filteredTechData = [];
    this.currentFilter = 'all';

    const url = this.githubUrl.trim();

    if (!url) {
      this.errorMessage = 'Please enter a GitHub repository URL';
      return;
    }
    if (!this.isValidGitHubUrl(url)) {
      this.errorMessage = 'Please enter a valid GitHub repository URL';
      return;
    }

    const { owner, repo } = this.parseGitHubUrl(url);

    this.loading = true;
    try {
      const [repoInfo, repoContents] = await Promise.all([
        this.fetchRepositoryInfo(owner, repo),
        this.fetchRepositoryContents(owner, repo)
      ]);

      this.repoInfo = repoInfo;
      this.organizeFilesByTechnology(repoContents);
      this.applyFilter();
    } catch (error: any) {
      this.errorMessage = error.message || 'Error fetching repository data';
    } finally {
      this.loading = false;
    }
  }

  private isValidGitHubUrl(url: string): boolean {
    const githubPattern = /^https:\/\/github\.com\/[^\/]+\/[^\/]+\/?$/;
    return githubPattern.test(url);
  }

  private parseGitHubUrl(url: string): { owner: string; repo: string } {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    return {
      owner: match ? match[1] : '',
      repo: match ? match[2].replace(/\.git$/, '') : ''
    };
  }

  private async fetchRepositoryInfo(owner: string, repo: string): Promise<RepoInfo> {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
    if (!res.ok) {
      throw new Error(`Repository not found or is private`);
    }
    return res.json();
  }

  private async fetchRepositoryContents(owner: string, repo: string, path = ''): Promise<FileData[]> {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`);
    if (!res.ok) throw new Error(`Failed to fetch repository contents`);
    const contents: any[] = await res.json();
    let allFiles: FileData[] = [];
    for (const item of contents) {
      if (item.type === 'file') {
        allFiles.push({
          name: item.name,
          path: item.path,
          size: item.size,
          type: 'file'
        });
      } else if (item.type === 'dir' && !item.name.startsWith('.') && item.name !== 'node_modules') {
        try {
          const subFiles = await this.fetchRepositoryContents(owner, repo, item.path);
          allFiles = allFiles.concat(subFiles);
        } catch (error) {
          // skip directories that can't be accessed
        }
      }
    }
    return allFiles;
  }

  private organizeFilesByTechnology(files: FileData[]) {
    const organized: { [key: string]: TechSection } = {};
    files.forEach(file => {
      const extension = this.getFileExtension(file.name);
      const tech = this.getTechnologyInfo(extension, file.name);
      if (!organized[tech.name]) {
        organized[tech.name] = {
          ...tech,
          files: [],
          expanded: false
        };
      }
      organized[tech.name].files.push(file);
    });
    this.techData = Object.values(organized).sort((a, b) => b.files.length - a.files.length);
  }

  private getFileExtension(filename: string): string {
    if (filename.toLowerCase() === 'dockerfile') return 'dockerfile';
    const parts = filename.split('.');
    return parts.length > 1 ? parts.pop()!.toLowerCase() : '';
  }

  private getTechnologyInfo(extension: string, filename: string): { name: string; class: string; icon: string } {
    if (this.techMapping[extension]) return this.techMapping[extension];
    if (filename.toLowerCase().includes('makefile')) {
      return { name: 'Build', class: 'tech-other', icon: '🔧' };
    }
    return { name: 'Other', class: 'tech-other', icon: '📄' };
  }

  filterByTechnology(tech: string): void {
    this.currentFilter = tech;
    this.applyFilter();
  }

  private applyFilter(): void {
    if (this.currentFilter === 'all') {
      this.filteredTechData = this.techData;
    } else {
      this.filteredTechData = this.techData.filter(t => t.name.toLowerCase() === this.currentFilter);
    }
  }

  toggleTechSection(techName: string): void {
    const section = this.techData.find(t => t.name === techName);
    if (section) section.expanded = !section.expanded;
  }

  openFile(path: string): void {
    if (!this.repoInfo) return;
    const url = `https://github.com/${this.repoInfo.full_name}/blob/${this.repoInfo.default_branch}/${path}`;
    window.open(url, '_blank');
  }

  formatNumber(num: number): string {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  getTechClass(language: string | null): string {
    if (!language) return '';
    const lang = language.toLowerCase();
    if (this.techMapping[lang]) {
      return this.techMapping[lang].class;
    }
    return '';
  }
}
