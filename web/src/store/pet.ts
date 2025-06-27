import { create } from 'zustand';
import { rtdb } from '../firebase';
import { onValue, ref, set } from 'firebase/database';
import { useAuthStore } from './auth';

export interface Pet {
  hunger: number;
  strength: number;
}

interface PetState {
  pet: Pet | null;
  feed: () => void;
  train: () => void;
}

export const usePetStore = create<PetState>((set, get) => ({
  pet: null,
  feed: () => {
    const user = useAuthStore.getState().user;
    if (!user) return;
    const pet = get().pet;
    if (!pet) return;
    const updated = { ...pet, hunger: Math.max(0, pet.hunger - 1) };
    set({ pet: updated });
    set(ref(rtdb, `pets/${user.uid}`), updated);
  },
  train: () => {
    const user = useAuthStore.getState().user;
    if (!user) return;
    const pet = get().pet;
    if (!pet) return;
    const updated = { ...pet, strength: pet.strength + 1 };
    set({ pet: updated });
    set(ref(rtdb, `pets/${user.uid}`), updated);
  },
}));

const user = useAuthStore.getState().user;
if (user) {
  const petRef = ref(rtdb, `pets/${user.uid}`);
  onValue(petRef, snap => usePetStore.setState({ pet: snap.val() }));
}
useAuthStore.subscribe(s => {
  if (!s.user) return;
  const petRef = ref(rtdb, `pets/${s.user.uid}`);
  onValue(petRef, snap => usePetStore.setState({ pet: snap.val() }));
});
