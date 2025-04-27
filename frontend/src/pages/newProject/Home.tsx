import { useState } from 'react';
import NewProjectLayout from './NewProjectLayout';
import '../../styles/pages/home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [popup, setPopup] = useState(false);
  return (
    <NewProjectLayout>
      <div className="content__container">
        <h2>Create new Project</h2>
        <img src="./newproject.svg" alt="" />
        <p>
          Turn your passion into a professional podcast. <br />
          Let our AI assistant help you reach a global audience effortlessly!
        </p>
        <button onClick={() => setPopup(true)}>
          <span className="button__plus">+</span>Create new project
        </button>
      </div>
      {popup && (
        <div className="popup__container">
          <div className="popup__content">
            <h4>Create project</h4>
            <div className="project__input">
              <label htmlFor="">Enter Project Name</label>
              <input type="text" placeholder="Type Here" />
            </div>
            <div className='popup__button'>
              <button onClick={() => setPopup(false)}>Cancel</button>
              <button onClick={() => navigate('/projects')}>Create</button>
            </div>
          </div>
        </div>
      )}
    </NewProjectLayout>
  );
};

export default Home;
