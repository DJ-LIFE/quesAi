import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useNavigationStore from '../stores/useNavigationStore';

/**
 * A component that syncs the current route with breadcrumbs and sidebar state
 */
const RouteObserver = () => {
  const location = useLocation();
  const { setBreadcrumbs, setActiveSidebarItem, updateBreadcrumbs } = useNavigationStore();

  useEffect(() => {
    const path = location.pathname;
    
    // Map routes to sidebar items and breadcrumbs
    if (path.startsWith('/upload')) {
      setActiveSidebarItem(1);
      setBreadcrumbs([
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/upload', label: 'Add your Podcasts(s)' }
      ]);
    } else if (path.startsWith('/create')) {
      setActiveSidebarItem(2);
      setBreadcrumbs([
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/upload', label: 'Create and Repurpose' }
      ]);
    } else if (path.startsWith('/widget')) {
      setActiveSidebarItem(3);
      setBreadcrumbs([
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/upload', label: 'Podcast Widget' }
      ]);
    } else if (path.startsWith('/upgrade')) {
      setActiveSidebarItem(4);
      setBreadcrumbs([
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/upload', label: 'Upgrade' }
      ]);
    } else if (path.startsWith('/dashboard')) {
      setActiveSidebarItem(null);
      setBreadcrumbs([
        { path: '/upload', label: 'Dashboard' },
        { path: '/upload', label: 'Dashboard' }
      ]);
    } else if (path === '/') {
      setActiveSidebarItem(null);
      setBreadcrumbs([{ path: '/', label: 'Home Page' }]);
    }
  }, [location, setBreadcrumbs, setActiveSidebarItem, updateBreadcrumbs]);

  return null; // This component doesn't render anything
};

export default RouteObserver;