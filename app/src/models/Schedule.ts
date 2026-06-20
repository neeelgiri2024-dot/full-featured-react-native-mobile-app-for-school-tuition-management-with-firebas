export interface Schedule {
  id: string;
  orgId: string;
  classId: string;
  subjectId: string;
  dayOfWeek: number; // 0-6
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  createdAt: number;
}
