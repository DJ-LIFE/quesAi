import { useState, useEffect } from 'react';
import NewProjectLayout from './NewProjectLayout';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/dashboard.css';
import { usePodcastStore } from '../../stores/usePodStore';

const Dashboard = () => {
  const navigate = useNavigate();
  const [popup, setPopup] = useState(false);
  const [title, setTitle] = useState('');
  const [searchQuery] = useState('');
  const {
    podcasts,
    fetchPodcasts,
    createPodcast,
    setCurrentPodcast,
    isLoading,
    error,
    clearError,
  } = usePodcastStore();

  useEffect(() => {
    fetchPodcasts();
  }, [fetchPodcasts]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (error) clearError();
  };

  const onSubmit = async () => {
    if (!title.trim()) return;

    try {
      await createPodcast(title);
      setTitle('');
      setPopup(false);
    } catch (error) {
      console.error('Error creating podcast:', error);
    }
  };

  const filteredPodcasts = searchQuery.trim() === '' 
    ? podcasts
    : podcasts.filter((podcast: { title: string }) => 
        podcast.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const createNewProject = () => {
    setPopup(true);
  };

  const handlePodcastClick = (podcast: { _id: string; title: string; createdAt: string; episodes: string[] }) => {
    setCurrentPodcast(podcast);
    navigate(`/upload`);
  };

  const renderHomeView = () => (
    <div className="content__container">
      <h2>Create new Project</h2>
      <img src="./newproject.svg" alt="" />
      <p>
        Turn your passion into a professional podcast. <br />
        Let our AI assistant help you reach a global audience effortlessly!
      </p>
      <button onClick={createNewProject}>
        <span className="button__plus">+</span>Create new project
      </button>
    </div>
  );

  const renderProjectsView = () => (
    <div className="projects__container">
      <div className="projects__header">
        <h1>Projects</h1>
        <button onClick={createNewProject} className="button__create">
          <span className="button__plus">+</span>Create new
        </button>
      </div>
      {isLoading ? (
        <div className="loading">Loading podcasts...</div>
      ) : error ? (
        <div className="error">Error loading podcasts: {error}</div>
      ) : (
        <div className="project__cards">
          {filteredPodcasts.map((podcast) => (
            <div
              key={podcast._id}
              className="project__card"
              onClick={() => handlePodcastClick(podcast)}
            >
              <div className="project__card-header">
                <div className="project__card-icon">
                  {podcast.title
                    .split(' ')
                    .map((word: string) => word[0])
                    .slice(0, 2)
                    .join('').toUpperCase()}
                </div>
                <div className="project__card-title">
                  <h2>{podcast.title}</h2>
                  <span className='project__fileCount'>{podcast.episodes.length} Files</span>
                  <div className="project__card-episodes">
                    <span className='project__card--date'>Last edited
                      {new Date(podcast.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <NewProjectLayout>
      {/* Conditionally render based on podcasts existence */}
      {!isLoading && !error && podcasts.length > 0
        ? renderProjectsView()
        : renderHomeView()}

      {/* Project creation popup - shared between both views */}
      {popup && (
        <div className="popup__container">
          <div className="popup__content">
            <h4>Create project</h4>
            <div className="project__input">
              <label htmlFor="title">Enter Project Name</label>
              <input
                type="text"
                id="title"
                placeholder="Type Here"
                value={title}
                onChange={handleOnChange}
              />
              {error && <p className="error-text">{error}</p>}
            </div>
            <div className="popup__button">
              <button
                type="button"
                onClick={() => {
                  setPopup(false);
                  clearError();
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={onSubmit}
                disabled={isLoading || !title.trim()}
                className="popup__create--button"
              >
                {isLoading ? 'Creating...' : 'Create Podcast'}
              </button>
            </div>
          </div>
        </div>
      )}
    </NewProjectLayout>
  );
};

export default Dashboard;
