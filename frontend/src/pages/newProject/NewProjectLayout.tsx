import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useNavigationStore from '../../stores/useNavigationStore';
import '../../styles/pages/newProjectLayout.css';

const NewProjectLayout = ({ children }: { children: React.ReactNode }) => {
  const { setBreadcrumbs, setActiveSidebarItem } = useNavigationStore();
  const location = useLocation();

  useEffect(() => {
    // Set default breadcrumbs based on the current path
    const path = location.pathname;
    
    if (path.includes('/projects')) {
      setBreadcrumbs([
        { path: '/', label: 'Home Page' },
        { path: '/projects', label: 'Projects' }
      ]);
      setActiveSidebarItem(null);
    } else if (path === '/') {
      setBreadcrumbs([{ path: '/', label: 'Home Page' }]);
      setActiveSidebarItem(null);
    }
  }, [location, setBreadcrumbs, setActiveSidebarItem]);

  return (
    <>
      <nav className="nav__layout">
        <div>
          <img src="/quesLogo1.svg" alt="Ques Ai logo" />
        </div>
        <div>
          <button><img src="/setting.svg" alt="Setting" /></button>
          <button><img src="/notification.svg" alt="notification" /></button>
        </div>
      </nav>
      <div className="container">{children}</div>
    </>
  );
};

export default NewProjectLayout;
