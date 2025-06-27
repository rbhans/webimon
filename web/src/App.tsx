import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import PetPage from './pages/PetPage';
import FriendsPage from './pages/FriendsPage';
import BattlePage from './pages/BattlePage';
import { useAuthStore } from './store/auth';

export default function App() {
  const { user } = useAuthStore();
  if (!user) return <Login />;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pet" element={<PetPage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/battle/:id" element={<BattlePage />} />
      </Routes>
    </BrowserRouter>
  );
}
