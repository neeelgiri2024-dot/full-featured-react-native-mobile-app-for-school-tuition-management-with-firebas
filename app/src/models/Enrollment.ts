export interface Enrollment {
  id: string;
  orgId: string;
  classId: string;
  studentId: string;
  status: 'active' | 'inactive';
  createdAt: number;
}
