import { Route, Routes } from 'react-router-dom';
import Home from './Views/Home';
import VideoPage from './Views/Video-Page';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/video" element={<VideoPage />} />
    </Routes>
  );
}

export default App;
