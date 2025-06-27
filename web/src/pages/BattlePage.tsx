import { useEffect, useState } from 'react';
import { httpsCallable, getFunctions } from 'firebase/functions';
import { useParams } from 'react-router-dom';
import { app } from '../firebase';

export default function BattlePage() {
  const { id } = useParams();
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    const fn = httpsCallable(getFunctions(app), 'resolveBattle');
    fn({ battleId: id }).then(res => setWinner((res.data as any).winner));
  }, [id]);

  return <div className="p-4">Battle result: {winner ?? 'resolving...'}</div>;
}
