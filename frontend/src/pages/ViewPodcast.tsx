import { useState } from 'react';
import '../styles/pages/viewPodcast.css';
import UploadLayout from './newProject/UploadLayout';
const ViewPodcast = () => {
  const [editPodcast, setEditPodcast] = useState(false);
  return (
    <UploadLayout>
      <div className="podcast__container">
        <div className="podcast__header">
          <h5>Edit Transcript</h5>
          <div>
            <button onClick={() => setEditPodcast(true)} className="podcast__header--edit">
              {editPodcast ? 'Save' : 'Edit'}
            </button>
            <button
              onClick={() => setEditPodcast(false)}
              style={{ display: editPodcast ? 'block' : 'none' }}
              className='podcast__header--discard'
            >
              Discard
            </button>
          </div>
        </div>
        {editPodcast ? (
          <div className="podcast__content">
            <h5 className="podcast__content--speaker">speaker</h5>
            <textarea name="" id=""></textarea>
          </div>
        ) : (
          <div className="podcast__content">
            <h5 className="podcast__content--speaker">speaker</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam nam
              molestias, alias quisquam unde tempora numquam temporibus
              provident laborum vero, iure vitae facere qui nulla maiores et
              iste beatae distinctio.
            </p>
          </div>
        )}
      </div>
    </UploadLayout>
  );
};

export default ViewPodcast;
