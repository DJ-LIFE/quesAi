import UploadLayout from './newProject/UploadLayout';
import '../styles/pages/upload.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
  const [popup, setPopup] = useState(false);
  const [podcast, setPodcast] = useState<
    { name: string; transcript: string }[]
  >([
    {
      name: '',
      transcript: '',
    },
  ]);
  const navigate = useNavigate();
  return (
    <UploadLayout>
      <div className="upload__container">
        <h1>Add Podcast</h1>
        <div className="uploadData__container">
          {uploadData.map((data, index) => (
            <div key={index} className="uploadData__card">
              <div className="uploadData__card--text">
                <h5>{data.title}</h5>
                <p>{data.description}</p>
              </div>
              <img src={data.icon} alt="upload icon" height={50} width={50} />
            </div>
          ))}
        </div>
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
        <div className="data__table">
          <h5 className="data__title">Uploaded Data</h5>
          <table className="uploaded-table">
            <thead className="table__head">
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Date & Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {uploadedData.map((data) => (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td>{data.dateTime}</td>
                  <td className="table__action">
                    <button className="table__view--button" onClick={() => navigate(`/podcast/${data.id}`)}>View</button>
                    <button className="table__delete--button">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {popup && (
          <div className="popup__container">
            <div className="popup__content">
              <div>
                <p>Upload From Youtube</p>{' '}
                <button onClick={() => setPopup(false)}>X</button>
              </div>
              <div>
                <label htmlFor="name">Name</label>
                <input type="text" placeholder="Type Here" />
              </div>
              <div>
                <label htmlFor="transcript">Transcript</label>
                <input type="text" placeholder="Type Here" />
              </div>
              <button>Upload</button>
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

const uploadedData = [
  {
    id: 1,
    name: 'Podcast Name',
    dateTime: '2023-10-01 12:00 PM',
  },
  {
    id: 2,
    name: 'Another Podcast',
    dateTime: '2023-10-02 1:00 PM',
  },
  {
    id: 3,
    name: 'Sample Podcast',
    dateTime: '2023-10-03 2:00 PM',
  },
  {
    id: 4,
    name: 'Test Podcast',
    dateTime: '2023-10-04 3:00 PM',
  },
];
