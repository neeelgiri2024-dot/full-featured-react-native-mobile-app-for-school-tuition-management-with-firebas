export interface Classroom {
  id: string;
  orgId: string;
  name: string;
  grade: string;
  section?: string;
  teacherIds: string[];
  createdAt: number;
}
