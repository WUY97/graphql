import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SongPage from './pages/SongPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="song/new" element={<SongPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
