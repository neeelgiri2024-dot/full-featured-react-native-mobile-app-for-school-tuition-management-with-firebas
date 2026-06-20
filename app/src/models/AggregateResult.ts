export interface AggregateResult {
  id: string;
  orgId: string;
  classId: string;
  studentId: string;
  examId: string;
  total: number;
  percentage: number;
  rank?: number;
  createdAt: number;
}
