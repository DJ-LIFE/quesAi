import { useState, useEffect } from 'react';
import '../styles/pages/viewPodcast.css';
import UploadLayout from './newProject/UploadLayout';
import { useParams, useNavigate } from 'react-router-dom';
import usePodcastStore from '../stores/usepodcastStore';

const ViewPodcast = () => {
  const { podcastId, episodeId } = useParams();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');
  const [transcript, setTranscript] = useState('');
  
  const { 
    episodes, 
    fetchEpisodes, 
    updateEpisode,
    isLoading, 
    error 
  } = usePodcastStore();

  useEffect(() => {
    if (!podcastId || !episodeId) {
      navigate('/projects');
      return;
    }
    
    fetchEpisodes(podcastId);
  }, [podcastId, episodeId, fetchEpisodes, navigate]);

  useEffect(() => {
    if (episodes.length > 0 && episodeId) {
      const currentEpisode = episodes.find(ep => ep._id === episodeId);
      if (currentEpisode) {
        setTitle(currentEpisode.title);
        setTranscript(currentEpisode.transcript);
      }
    }
  }, [episodes, episodeId]);

  const handleSave = async () => {
    if (!podcastId || !episodeId || !title.trim() || !transcript.trim()) return;
    
    try {
      await updateEpisode(podcastId, episodeId, {
        title,
        transcript
      });
      
      setEditMode(false);
    } catch (error) {
      console.error('Error updating episode:', error);
    }
  };

  const handleDiscard = () => {
    // Reset to original values
    const currentEpisode = episodes.find(ep => ep._id === episodeId);
    if (currentEpisode) {
      setTitle(currentEpisode.title);
      setTranscript(currentEpisode.transcript);
    }
    setEditMode(false);
  };

  if (isLoading) {
    return (
      <UploadLayout>
        <div className="podcast__container">
          <p>Loading episode...</p>
        </div>
      </UploadLayout>
    );
  }

  if (error) {
    return (
      <UploadLayout>
        <div className="podcast__container">
          <p>Error loading episode: {error}</p>
        </div>
      </UploadLayout>
    );
  }

  return (
    <UploadLayout>
      <div className="podcast__container">
        <div className="podcast__header">
          <h5>{editMode ? 'Edit Episode' : 'View Episode'}</h5>
          <div>
            {editMode ? (
              <>
                <button onClick={handleSave} className="podcast__header--edit">
                  Save
                </button>
                <button onClick={handleDiscard} className="podcast__header--discard">
                  Discard
                </button>
              </>
            ) : (
              <button onClick={() => setEditMode(true)} className="podcast__header--edit">
                Edit
              </button>
            )}
          </div>
        </div>
        
        <div className="podcast__title">
          <h4>Title:</h4>
          {editMode ? (
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className="podcast__title--edit"
            />
          ) : (
            <h5>{title}</h5>
          )}
        </div>
        
        <div className="podcast__content">
          <h5 className="podcast__content--speaker">Transcript</h5>
          {editMode ? (
            <textarea 
              value={transcript} 
              onChange={(e) => setTranscript(e.target.value)}
              className="podcast__content--edit"
              rows={10}
            />
          ) : (
            <div className="podcast__content--text">
              {transcript}
            </div>
          )}
        </div>
      </div>
    </UploadLayout>
  );
};

export default ViewPodcast;
