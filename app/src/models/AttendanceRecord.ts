export interface AttendanceRecord {
  id: string;
  orgId: string;
  classId: string;
  date: string; // YYYY-MM-DD
  studentId: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  createdAt: number;
}
