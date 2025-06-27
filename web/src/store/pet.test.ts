import { describe, it, expect } from 'vitest';
import { usePetStore } from './pet';

describe('usePetStore', () => {
  it('feed lowers hunger', () => {
    usePetStore.setState({ pet: { hunger: 5, strength: 1 } });
    usePetStore.getState().feed();
    expect(usePetStore.getState().pet?.hunger).toBe(4);
  });
});
