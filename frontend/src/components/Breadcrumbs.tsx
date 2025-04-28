import '../styles/components/breadCrumbs.css';
const Breadcrumbs = () => {
  return (
    <div className="breadcrumbs__container">
      < span>
        <span>
          <img src="./home.svg" alt="Home Icon" />
        </span>
        Home Page
      </span>{' '}
      &gt; <span>Projects</span> &gt; <span>New Project</span>
    </div>
  );
};

export default Breadcrumbs;
