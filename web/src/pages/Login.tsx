import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signInEmail = () => signInWithEmailAndPassword(auth, email, password);
  const signUpEmail = () => createUserWithEmailAndPassword(auth, email, password);
  const signInGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());

  return (
    <div className="p-4 space-y-2">
      <input className="border p-2" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input className="border p-2" placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <div className="space-x-2">
        <button className="px-3 py-1 bg-blue-500 text-white" onClick={signInEmail}>Login</button>
        <button className="px-3 py-1 bg-green-500 text-white" onClick={signUpEmail}>Register</button>
        <button className="px-3 py-1 bg-red-500 text-white" onClick={signInGoogle}>Google</button>
      </div>
    </div>
  );
}
