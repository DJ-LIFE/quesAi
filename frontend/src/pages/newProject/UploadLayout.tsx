import Breadcrumbs from '../../components/Breadcrumbs';
import SideBar from '../../components/SideBar';
import '../../styles/pages/uploadLayout.css';

const UploadLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="uploadLayout__container">
      <SideBar />
      <div className="uploadLayout__content--container">
        <div>
          <Breadcrumbs />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default UploadLayout;
