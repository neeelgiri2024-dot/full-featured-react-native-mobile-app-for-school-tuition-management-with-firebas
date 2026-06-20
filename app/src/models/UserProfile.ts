export type Role = 'admin' | 'teacher' | 'student' | 'parent';
export interface UserProfile {
  uid: string;
  displayName?: string;
  email?: string;
  role: Role;
  orgId: string;
  relatedIds?: string[];
  pushTokens?: string[];
  createdAt: number;
}
