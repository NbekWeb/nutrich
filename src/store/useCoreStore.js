import { create } from 'zustand'


const useCoreStore = create((set, get) => ({
  loadingUrl: new Set(),

  addLoadingUrl: url => {
    const updated = new Set(get().loadingUrl)
    updated.add(url)
    set({ loadingUrl: updated })
  },

  removeLoadingUrl: url => {
    const updated = new Set(get().loadingUrl)
    updated.delete(url)
    set({ loadingUrl: updated })
  },

  clearLoadingUrls: () => {
    set({ loadingUrl: new Set() })
  }
}))

export default useCoreStore
