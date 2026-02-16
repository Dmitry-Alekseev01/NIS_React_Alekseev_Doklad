import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Project } from '../../store/project/project.model';
import { Task } from '../../store/task/task.model';
import { AnalyticsData } from '../../store/analytics/analytics.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return of([
      {
        id: 1,
        name: 'Project Alpha',
        description: 'Description for Alpha',
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-06-01'),
        status: 'active',
        team: ['Alice', 'Bob'],
        progress: 45
      },
      {
        id: 2,
        name: 'Project Beta',
        description: 'Description for Beta',
        startDate: new Date('2025-02-01'),
        endDate: new Date('2025-07-01'),
        status: 'onHold',
        team: ['Charlie'],
        progress: 20
      },
      {
        id: 3,
        name: 'Project Gamma',
        description: 'Description for Gamma',
        startDate: new Date('2024-12-01'),
        endDate: new Date('2025-03-01'),
        status: 'completed',
        team: ['David', 'Eve'],
        progress: 100
      }
    ]);
  }

  getProject(id: number): Observable<Project> {
    return of({
      id: 1,
      name: 'Project Alpha',
      description: 'Description for Alpha',
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-06-01'),
      status: 'active',
      team: ['Alice', 'Bob'],
      progress: 45
    });
  }

  createProject(project: Partial<Project>): Observable<Project> {
    return of({
      id: Math.floor(Math.random() * 1000),
      ...project,
      status: project.status || 'active',
      progress: project.progress || 0,
      team: project.team || []
    } as Project);
  }

  updateProject(id: number, changes: Partial<Project>): Observable<Project> {
    return of({
      id,
      name: 'Updated Project',
      description: 'Updated description',
      startDate: new Date(),
      endDate: new Date(),
      status: 'active',
      team: [],
      progress: 50,
      ...changes
    });
  }

  deleteProject(id: number): Observable<void> {
    return of(undefined);
  }

  getTasks(projectId?: number): Observable<Task[]> {
    return of([
      { id: 1, projectId: 1, name: 'Task 1', description: 'Do something', status: 'todo' },
      { id: 2, projectId: 1, name: 'Task 2', description: 'Do more', status: 'inProgress' }
    ]);
  }

  getAnalytics(projectId: number): Observable<AnalyticsData> {
    return of({
      projectId,
      burndown: {
        dates: ['2025-03-01', '2025-03-02', '2025-03-03'],
        ideal: [10, 8, 6],
        actual: [10, 9, 7]
      },
      dependencies: {
        nodes: [{ id: 'task1', name: 'Task 1' }, { id: 'task2', name: 'Task 2' }],
        links: [{ source: 'task1', target: 'task2' }]
      }
    });
  }
}