import useAuthStore from '../stores/useAuthStore';
import '../styles/components/breadCrumbs.css';
const Breadcrumbs = () => {
  const {logout} = useAuthStore();
  const handleLogout = async () => {
    await logout();
  };
  return (
    <div className="breadcrumbs__container">
      <span>
        <span>
          <img src="./home.svg" alt="Home Icon" />
        </span>
        Home Page
      </span>{' '}
      &gt; <span>Projects</span> &gt; <span>New Project</span>
      <span className="breadcrumbs__container--right">
        <span className='breadcrumbs__notification'>
          <img
            src="./notification.svg"
            alt="notification"
            height={30}
            width={30}
          />
        </span>{' '}
        <button className='breadcrumbs__logout' onClick={handleLogout}>
          <img src="./logout.svg" alt="Logout" height={25} width={25} />
        </button>
      </span>
    </div>
  );
};

export default Breadcrumbs;
