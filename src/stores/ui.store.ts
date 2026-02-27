import { defineStore } from 'pinia';

interface UIState {
  buttonLoading: boolean,
  pageLoading: boolean,
  modalOpen: boolean,
}

export const useUIStore = defineStore('ui', {
  state: (): UIState => ({
    buttonLoading: false,
    pageLoading: false,
    modalOpen: false,
  }),

  getters: {
    getButtonLoader: (state) => state.buttonLoading
  },

  actions: {
    setButtonLoader(payload: boolean) {
      this.buttonLoading = payload;
    }
  },
})
