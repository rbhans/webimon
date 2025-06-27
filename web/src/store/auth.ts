import { create } from 'zustand';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase';

interface AuthState {
  user: User | null;
}

export const useAuthStore = create<AuthState>(() => ({ user: null }));

onAuthStateChanged(auth, user => useAuthStore.setState({ user }));
