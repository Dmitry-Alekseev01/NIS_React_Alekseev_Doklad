export interface Project {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'completed' | 'onHold';
  team: string[];
  progress: number;
}

export interface ProjectState {
  projects: Project[];
  selectedProjectId: number | null;
  loading: boolean;
  error: string | null;
}