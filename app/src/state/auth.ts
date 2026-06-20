import create from 'zustand';
import { User } from 'firebase/auth';
import { db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';

export type Role = 'admin' | 'teacher' | 'student' | 'parent' | null;

export interface UserProfile {
  uid: string;
  displayName?: string;
  email?: string;
  role: Role;
  orgId?: string;
  relatedIds?: string[]; // e.g., studentIds for parent, parentIds for student
  pushTokens?: string[];
}

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  claims: any | null;
  setUser: (u: User | null) => void;
  loadProfile: (uid: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  profile: null,
  claims: null,
  setUser: (u) => set({ user: u }),
  loadProfile: async (uid: string) => {
    const snap = await getDoc(doc(db, 'users', uid));
    if (snap.exists()) {
      set({ profile: snap.data() as any });
    }
  }
}));
