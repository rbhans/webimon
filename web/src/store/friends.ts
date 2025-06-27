import { create } from 'zustand';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuthStore } from './auth';

interface FriendState {
  friends: string[];
  load: () => Promise<void>;
  add: (email: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

export const useFriendStore = create<FriendState>((set, get) => ({
  friends: [],
  load: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;
    const query = await getDocs(collection(db, 'users', user.uid, 'friends'));
    set({ friends: query.docs.map(d => d.id) });
  },
  add: async (email: string) => {
    const user = useAuthStore.getState().user;
    if (!user) return;
    await addDoc(collection(db, 'users', user.uid, 'friends'), { email });
    get().load();
  },
  remove: async (id: string) => {
    const user = useAuthStore.getState().user;
    if (!user) return;
    await deleteDoc(doc(db, 'users', user.uid, 'friends', id));
    get().load();
  },
}));
