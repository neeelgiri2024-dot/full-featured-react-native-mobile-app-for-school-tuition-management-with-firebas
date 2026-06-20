import { useAuthStore } from '../state/auth';

export function useRole() {
  return useAuthStore((s) => s.profile?.role ?? null);
}
