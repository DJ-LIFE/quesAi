import { create } from 'zustand';
import { podcastService, episodeService } from '../services/api';

interface Podcast {
  _id: string;
  title: string;
  createdAt: string;
  episodes: string[];
}

interface Episode {
  _id: string;
  podcast: string | Podcast;
  title: string;
  transcript: string;
}

interface PodcastState {
  podcasts: Podcast[];
  episodes: Episode[];
  currentPodcast: Podcast | null;
  isLoading: boolean;
  error: string | null;

  createPodcast: (title: string) => Promise<void>;
  fetchPodcasts: () => Promise<void>;
  createEpisode: (
    podcastId: string,
    episodeData: { title: string; transcript: string }
  ) => Promise<void>;
  updateEpisode: (
    podcastId: string,
    episodeId: string,
    episodeData: { title?: string; transcript?: string }
  ) => Promise<void>;
  fetchEpisodes: (podcastId: string) => Promise<void>;
  fetchAllEpisodes: () => Promise<void>;
  setCurrentPodcast: (podcast: Podcast | null) => void;
  clearError: () => void;
}

const usePodcastStore = create<PodcastState>((set) => ({
  podcasts: [],
  episodes: [],
  currentPodcast: null,
  isLoading: false,
  error: null,
  
  createPodcast: async (title: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await podcastService.createPodcast(title);
      const newPodcast = response.newPodcast;
      set((state) => ({
        podcasts: [...state.podcasts, newPodcast],
        isLoading: false,
      }));
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error ? error.message : 'Failed to create podcast',
      });
      throw error;
    }
  },
  
  fetchPodcasts: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await podcastService.getPodcasts();
      const podcasts = response.podcasts;
      set({ podcasts, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch podcasts',
      });
      throw error;
    }
  },
  
  createEpisode: async (
    podcastId: string,
    episodeData: { title: string; transcript: string }
  ) => {
    try {
      set({ isLoading: true, error: null });
      const response = await episodeService.createEpisode(podcastId, episodeData);
      const newEpisode = response.newEpisode;
      
      set((state) => {
        // Update episodes array
        const updatedEpisodes = [...state.episodes, newEpisode];
        
        // Update current podcast if it matches
        let updatedCurrentPodcast = state.currentPodcast;
        if (updatedCurrentPodcast && updatedCurrentPodcast._id === podcastId) {
          updatedCurrentPodcast = {
            ...updatedCurrentPodcast,
            episodes: [...updatedCurrentPodcast.episodes, newEpisode._id]
          };
        }
        
        return {
          episodes: updatedEpisodes,
          currentPodcast: updatedCurrentPodcast,
          isLoading: false
        };
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to create episode',
      });
      throw error;
    }
  },
  
  updateEpisode: async (
    podcastId: string,
    episodeId: string,
    episodeData: { title?: string; transcript?: string }
  ) => {
    try {
      set({ isLoading: true, error: null });
      const response = await episodeService.updateEpisode(podcastId, episodeId, episodeData);
      const updatedEpisode = response.episode;
      
      set((state) => {
        // Update the episode in the episodes array
        const updatedEpisodes = state.episodes.map(episode => 
          episode._id === episodeId ? updatedEpisode : episode
        );
        
        return {
          episodes: updatedEpisodes,
          isLoading: false
        };
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to update episode',
      });
      throw error;
    }
  },
  
  fetchEpisodes: async (podcastId: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await podcastService.getEpisodes(podcastId);
      const episodes = response.episodes;
      
      set({ episodes, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch episodes',
      });
      throw error;
    }
  },
  
  fetchAllEpisodes: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await podcastService.getAllEpisodes();
      const episodes = response.episodes;
      
      set({ episodes, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch all episodes',
      });
      throw error;
    }
  },
  
  setCurrentPodcast: (podcast: Podcast | null) => {
    set({ currentPodcast: podcast });
  },
  
  clearError: () => {
    set({ error: null });
  },
}));

export default usePodcastStore;