import NewProjectLayout from './NewProjectLayout';
import '../../styles/pages/projects.css';
import { useNavigate } from 'react-router-dom';

export const Projects = () => {
    const navigate = useNavigate();
  return (
    <NewProjectLayout>
      <div>
        <div className='project__container'>
          <h5>Projects</h5>
          <button className="project__button">
            <span className="button__plus">+</span>Create new project
          </button>
        </div>
        <div className="project__card" onClick={() => navigate('/upload')}>
            <div>PT</div>
            <div>
                <p>Project Title</p>
                <p>project Number</p>
                <p>last Edited</p>
            </div>
        </div>
      </div>
    </NewProjectLayout>
  );
};
