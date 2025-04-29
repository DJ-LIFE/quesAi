import React from 'react';
import useAuthStore from '../stores/useAuthStore';
import useNavigationStore from '../stores/useNavigationStore';
import { Link } from 'react-router-dom';
import '../styles/components/breadCrumbs.css';

const Breadcrumbs = () => {
  const { logout } = useAuthStore();
  const { breadcrumbs } = useNavigationStore();
  
  const handleLogout = async () => {
    await logout();
  };
  
  return (
    <div className="breadcrumbs__container">
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={crumb.path}>
          <span>
            {index === 0 && (
              <span>
                <img src="/home.svg" alt="Home Icon" />
              </span>
            )}
            <Link to={crumb.path}>{crumb.label}</Link>
          </span>
          {index < breadcrumbs.length - 1 && <span> &gt; </span>}
        </React.Fragment>
      ))}
      <span className="breadcrumbs__container--right">
        <span className="breadcrumbs__notification">
          <img
            src="/notification.svg"
            alt="notification"
            height={30}
            width={30}
          />
        </span>{' '}
        <button className="breadcrumbs__logout" onClick={handleLogout}>
          <img src="/logout.svg" alt="Logout" height={25} width={25} />
        </button>
      </span>
    </div>
  );
};

export default Breadcrumbs;
