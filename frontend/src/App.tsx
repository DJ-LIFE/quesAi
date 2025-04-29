import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth';
import Upload from './pages/Upload';
import ViewPodcast from './pages/ViewPodcast';
import ProtectedRoute from './components/ProtectedRoute';
import RouteObserver from './components/RouteObserver';
import Dashboard from './pages/newProject/Dashboard';

function App() {
  return (
    <>
      <BrowserRouter>
        <RouteObserver />
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
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
