import UploadLayout from './newProject/UploadLayout';
import '../styles/pages/upload.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import usePodcastStore from '../stores/usePodcastStore';

const Upload = () => {
  const [popup, setPopup] = useState(false);
  const [title, setTitle] = useState('');
  const [transcript, setTranscript] = useState('');
  const [popupTitle, setPopupTitle] = useState('Upload Episode');
  const navigate = useNavigate();
  
  const { 
    currentPodcast, 
    episodes, 
    fetchEpisodes, 
    createEpisode,
    isLoading, 
    error 
  } = usePodcastStore();

  useEffect(() => {
    if (!currentPodcast) {
      navigate('/projects');
      return;
    }
    
    fetchEpisodes(currentPodcast._id);
  }, [currentPodcast, fetchEpisodes, navigate]);

  const handleSubmit = async () => {
    if (!currentPodcast || !title.trim() || !transcript.trim()) return;
    
    try {
      await createEpisode(currentPodcast._id, {
        title,
        transcript
      });
      
      // Reset form and close popup
      setTitle('');
      setTranscript('');
      setPopup(false);
    } catch (error) {
      console.error('Error creating episode:', error);
    }
  };

  const handleCardClick = (cardTitle: string) => {
    setPopupTitle(`Upload from ${cardTitle}`);
    setPopup(true);
  };

  return (
    <UploadLayout>
      <div className="upload__container">
        <h1>Add Podcast Episode for {currentPodcast?.title}</h1>
        <div className="uploadData__container">
          {uploadData.map((data, index) => (
            <div 
              key={index} 
              className="uploadData__card" 
              onClick={() => handleCardClick(data.title)}
              style={{ cursor: 'pointer' }}
            >
              <div className="uploadData__card--text">
                <h5>{data.title}</h5>
                <p>{data.description}</p>
              </div>
              <img src={data.icon} alt="upload icon" height={50} width={50} />
            </div>
          ))}
        </div>
        
        {/* Show file uploader only when there are no episodes */}
        {(!episodes || episodes.length === 0) && !isLoading && !error && (
          <div className="upload__card">
            <div className="upload__innerCard">
              <img src="./exportCloud.svg" alt="upload icon" />
              <p>
                Select a file or drag and drop here (Podcast Media or
                Transcription Text)
              </p>
              <p>MP4, MOV, MP3, WAV, PDF, DOCX or TXT file</p>
              <button onClick={() => setPopup(true)}>Select File</button>
            </div>
          </div>
        )}
        
        {/* Show episodes table only when there are episodes */}
        {(episodes && episodes.length > 0 || isLoading || error) && (
          <div className="data__table">
            <h5 className="data__title">Uploaded Episodes</h5>
            {isLoading ? (
              <div className="loading">Loading episodes...</div>
            ) : error ? (
              <div className="error">Error loading episodes: {error}</div>
            ) : (
              <table className="uploaded-table">
                <thead className="table__head">
                  <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {episodes.map((episode: any, index: number) => (
                    <tr key={episode._id}>
                      <td>{index + 1}</td>
                      <td>{episode.title}</td>
                      <td className="table__action">
                        <button 
                          className="table__view--button" 
                          onClick={() => navigate(`/podcast/${currentPodcast?._id}/episode/${episode._id}`)}
                        >
                          View
                        </button>
                        <button className="table__delete--button">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {popup && (
          <div className="popup__container">
            <div className="popup__content">
              <div className='popup__header'>
                <p>{popupTitle}</p>{' '}
                <button onClick={() => setPopup(false)} style={{backgroundColor: 'transparent', color: 'black', fontSize: '1.2rem'}}>X</button>
              </div>
              <div className="popup__input--container">
                <label htmlFor="title">Name</label>
                <input 
                  type="text" 
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter video name" 
                />
              </div>
              <div className="popup__input--container">
                <label htmlFor="transcript">Transcript</label>
                <textarea 
                  id="transcript"
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  placeholder="Enter transcript"
                  rows={5}
                />
              </div>
              <div className="popup__footer">
                <button 
                  className="upload-btn"
                  onClick={handleSubmit}
                  disabled={isLoading || !title.trim() || !transcript.trim()}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </UploadLayout>
  );
};

export default Upload;

const uploadData = [
  {
    title: 'RSS Feed',
    description: 'Upload your RSS feed URL',
    icon: './rss.svg',
  },
  {
    title: 'Youtube Video',
    description: 'Upload your Youtube video URL',
    icon: './youtube.svg',
  },
  {
    title: 'Upload Files',
    description: 'Upload your podcast media or transcription text',
    icon: './upload.svg',
  },
];
