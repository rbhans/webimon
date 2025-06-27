import { usePetStore } from '../store/pet';

export default function PetPage() {
  const { pet, feed, train } = usePetStore();
  if (!pet) return <p>Loading...</p>;
  return (
    <div className="p-4 space-y-4">
      <div>Hunger: {pet.hunger}</div>
      <div>Strength: {pet.strength}</div>
      <button className="px-3 py-1 bg-yellow-500" onClick={feed}>Feed</button>
      <button className="px-3 py-1 bg-purple-500" onClick={train}>Train</button>
    </div>
  );
}
