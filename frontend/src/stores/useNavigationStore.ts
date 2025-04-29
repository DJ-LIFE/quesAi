import { create } from 'zustand';

type BreadcrumbItem = {
  path: string;
  label: string;
};

type NavigationStore = {
  breadcrumbs: BreadcrumbItem[];
  setBreadcrumbs: (breadcrumbs: BreadcrumbItem[]) => void;
  updateBreadcrumbs: (updater: (prev: BreadcrumbItem[]) => BreadcrumbItem[]) => void;
  activeSidebarItem: number | null;
  setActiveSidebarItem: (id: number | null) => void;
};

const useNavigationStore = create<NavigationStore>((set) => ({
  breadcrumbs: [{ path: '/', label: 'Home Page' }],
  setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),
  updateBreadcrumbs: (updater) => set((state) => ({ breadcrumbs: updater(state.breadcrumbs) })),
  activeSidebarItem: null,
  setActiveSidebarItem: (id) => set({ activeSidebarItem: id }),
}));

export default useNavigationStore;