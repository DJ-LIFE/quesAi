import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth';
import Home from './pages/newProject/Home';
import { Projects } from './pages/newProject/Projects';
import Upload from './pages/Upload';
import ViewPodcast from './pages/ViewPodcast';
import ProtectedRoute from './components/ProtectedRoute';
import RouteObserver from './components/RouteObserver';

function App() {
  return (
    <>
      <BrowserRouter>
        <RouteObserver />
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/projects" element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          } />
          <Route path="/upload" element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          } />
          <Route path="/podcast/:id" element={
            <ProtectedRoute>
              <ViewPodcast />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
