export interface Exam {
  id: string;
  orgId: string;
  classId: string;
  subjectId: string;
  name: string;
  date: string; // ISO date string
  maxMarks: number;
  createdAt: number;
}
