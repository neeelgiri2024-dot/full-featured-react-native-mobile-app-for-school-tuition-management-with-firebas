export interface Payment {
  id: string;
  orgId: string;
  studentId: string;
  feeId: string;
  amount: number;
  paidAt: string; // ISO date
  createdAt: number;
}
