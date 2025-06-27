import { useEffect, useState } from 'react';
import { useFriendStore } from '../store/friends';

export default function FriendsPage() {
  const { friends, load, add, remove } = useFriendStore();
  const [email, setEmail] = useState('');
  useEffect(() => {
    load();
  }, [load]);
  return (
    <div className="p-4 space-y-2">
      <div className="space-x-2">
        <input className="border p-2" value={email} onChange={e => setEmail(e.target.value)} />
        <button className="px-3 py-1 bg-blue-500 text-white" onClick={() => add(email)}>Add Friend</button>
      </div>
      <ul className="list-disc pl-4">
        {friends.map(id => (
          <li key={id} className="flex justify-between">
            {id}
            <button className="text-sm text-red-500" onClick={() => remove(id)}>remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
