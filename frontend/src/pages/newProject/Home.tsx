import { useState } from 'react';
import NewProjectLayout from './NewProjectLayout';
import '../../styles/pages/home.css';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { useForm } from 'react-hook-form';
import usePodcastStore from '../../stores/usePodcastStore';
import { podcastService } from '../../services/api';

const Home = () => {
  const navigate = useNavigate();
  const [popup, setPopup] = useState(false);
  const { createPodcast } = usePodcastStore();
  const projectSchema = z.object({
    title: z.string().min(1, { message: 'Project name is required' }),
  });
  type Project = z.infer<typeof projectSchema>;
  const { register, handleSubmit } = useForm<Project>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
    },
  });
  const onSubmit = async (data: Project) => {
    try {
      console.log(data);
      await podcastService.createPodcast(data);
      navigate('/projects');
      setPopup(false);
      console.log('Project created successfully!');
    } catch (error) {
      console.error('Error creating podcast:', error);
    }
  };

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
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="popup__container">
            <div className="popup__content">
              <h4>Create project</h4>
              <div className="project__input">
                <label htmlFor="">Enter Project Name</label>
                <input
                  type="text"
                  placeholder="Type Here"
                  {...register('title')}
                />
              </div>
              <div className="popup__button">
                <button type="button" onClick={() => setPopup(false)}>
                  Cancel
                </button>
                <button type="submit">Create</button>
              </div>
            </div>
          </div>
        </form>
      )}
    </NewProjectLayout>
  );
};

export default Home;
