import { defineStore } from "pinia";
import axios from "axios";
import { apiUrl } from "../constant";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    loading: true,
  }),
  actions: {
    async fetchCurrentUser() {
      const token = localStorage.getItem("token");
      if (!token) {
        this.loading = false;
        return;
      }
      try {
        const { data } = await axios.get(`${apiUrl}/api/v1/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.user = data.user;
      } catch {
        localStorage.removeItem("token");
        this.user = null;
      } finally {
        this.loading = false;
      }
    },
    setUser(user) {
      this.user = user;
    },
    logout() {
      localStorage.removeItem("token");
      this.user = null;
    },
  },
});
