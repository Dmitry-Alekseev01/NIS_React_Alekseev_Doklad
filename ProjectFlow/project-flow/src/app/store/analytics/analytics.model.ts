export interface AnalyticsData {
  projectId: number;
  burndown: { dates: string[]; ideal: number[]; actual: number[] };
  dependencies: { nodes: any[]; links: any[] };
}

export interface AnalyticsState {
  data: AnalyticsData | null;
  loading: boolean;
  error: string | null;
}