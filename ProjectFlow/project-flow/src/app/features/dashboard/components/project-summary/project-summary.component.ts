import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Project } from '../../../../store/project/project.model';

@Component({
  selector: 'app-project-summary',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-summary.component.scss']
})
export class ProjectSummaryComponent {
  @Input() projects: Project[] | null = [];
  @Input() loading: boolean | null = false;

  getStatusClass(status: string): string {
    return `status-${status}`;
  }
}