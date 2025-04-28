import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth';
import Home from './pages/newProject/Home';
import { Projects } from './pages/newProject/Projects';
import Upload from './pages/Upload';
import ViewPodcast from './pages/ViewPodcast';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/podcast/:id" element={<ViewPodcast />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
