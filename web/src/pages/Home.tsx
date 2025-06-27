import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="p-4 space-y-2">
      <Link className="block" to="/pet">Pet</Link>
      <Link className="block" to="/friends">Friends</Link>
    </div>
  );
}
