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

const usePodcastStore = create<PodcastState>((set, get) => ({
  podcasts: [],
  episodes: [],
  currentPodcast: null,
  isLoading: false,
  error: null,
  createPodcast: async (title: string) => {
    // Implementation here
    try {
      set({ isLoading: true, error: null });
      const response = await podcastService.createPodcast({ title });
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
    }
  },
  fetchPodcasts: async () => {
    // Implementation here
  },
  createEpisode: async (
    podcastId: string,
    episodeData: { title: string; transcript: string }
  ) => {
    // Implementation here
  },
  updateEpisode: async (
    podcastId: string,
    episodeId: string,
    episodeData: { title?: string; transcript?: string }
  ) => {
    // Implementation here
  },
  fetchEpisodes: async (podcastId: string) => {
    // Implementation here
  },
  fetchAllEpisodes: async () => {
    // Implementation here
  },
  setCurrentPodcast: (podcast: Podcast | null) => {
    set({ currentPodcast: podcast });
  },
  clearError: () => {
    set({ error: null });
  },
}));

export default usePodcastStore;
