import '../../styles/pages/newProjectLayout.css';

const NewProjectLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <nav className="nav__layout">
        <div>
          <img src="./quesLogo1.svg" alt="Ques Ai logo" />
        </div>
        <div>
          <button><img src="./setting.svg" alt="Setting" /></button>
          <button><img src="./notification.svg" alt="notification" /></button>
        </div>
      </nav>
      <div className="container">{children}</div>
    </>
  );
};

export default NewProjectLayout;
