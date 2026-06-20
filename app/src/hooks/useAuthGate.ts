import { useAuthStore } from '../state/auth';

export function useAuthGate() {
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile);
  const role = profile?.role ?? null;
  return { signedIn: !!user, role };
}
