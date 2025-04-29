import { Diamond } from '../assets/Diamond';
import Layer from '../assets/Layer';
import Logo from '../assets/Logo';
import { Pen } from '../assets/Pen';
import { Plus } from '../assets/Plus';
import '../styles/components/sideBar.css';
import useAuthStore from '../stores/useAuthStore';
import useNavigationStore from '../stores/useNavigationStore';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="sidebar__container">
      <div className="sidebar__content">
        <span>
          <Logo height='40' width='250' />
        </span>
        <SideBarItem />
      </div>
      <div className="sidebar__footer">
        <button>Help</button>
        <hr />
        <div>
          <img src="" alt="" />
          <div>
            <span>{user?.name || 'User'}</span>
            <span>{user?.email || 'email@example.com'}</span>
          </div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

const SideBarItem = () => {
  const { activeSidebarItem, setActiveSidebarItem, setBreadcrumbs } = useNavigationStore();
  const navigate = useNavigate();
  
  const handleItemClick = (item: typeof sideBarData[0]) => {
    setActiveSidebarItem(item.id);
    
    // Update breadcrumbs based on the clicked item
    const newBreadcrumbs = [
      { path: '/', label: 'Home Page' },
      { path: item.path, label: item.name }
    ];
    
    setBreadcrumbs(newBreadcrumbs);
    navigate(item.path);
  };
  
  return (
    <>
      {sideBarData.map((item) => {
        const isActive = activeSidebarItem === item.id;
        return (
          <div 
            className={`sidebar__item ${isActive ? 'sidebar__item--active' : ''}`} 
            key={item.id}
            onClick={() => handleItemClick(item)}
          >
            <div className="sidebar__icon">{item.icon}</div>
            <div className="sidebar__name">{item.name}</div>
          </div>
        );
      })}
    </>
  );
};

const sideBarData = [
  {
    id: 1,
    name: 'Add your Podcasts(s)',
    icon: <Plus />,
    path: '/upload',
  },
  {
    id: 2,
    name: 'Create and Repurpose',
    icon: <Pen />,
    path: '/create',
  },
  {
    id: 3,
    name: 'Podcast Widget',
    icon: <Layer />,
    path: '/widget',
  },
  {
    id: 4,
    name: 'Upgrade',
    icon: <Diamond />,
    path: '/upgrade',
  },
];
