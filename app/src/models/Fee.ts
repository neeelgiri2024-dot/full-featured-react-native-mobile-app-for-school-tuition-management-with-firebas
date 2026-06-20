export interface Fee {
  id: string;
  orgId: string;
  studentId: string;
  amount: number;
  dueDate: string; // ISO date
  status: 'due' | 'paid' | 'overdue';
  createdAt: number;
}
