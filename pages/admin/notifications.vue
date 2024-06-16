<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4">Notifications de Commandes</h2>
    <div v-if="loading" class="text-center">Chargement...</div>
    <div v-if="!loading && notifications.length === 0" class="text-center">Aucune notification trouvée.</div>
    <div v-if="!loading && notifications.length > 0">
      <table class="min-w-full leading-normal">
        <thead>
          <tr>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nom de l'Utilisateur</th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email de l'Utilisateur</th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Détails</th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="notification in notifications" :key="notification.id">
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">{{ notification.user.name }}</td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">{{ notification.user.email }}</td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">{{ notification.details }}</td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">{{ notification.createdAt }}</td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-between items-center mt-4">
        <button @click="prevPage" :disabled="page === 1" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
          Précédent
        </button>
        <span>Page {{ page }} sur {{ totalPages }}</span>
        <button @click="nextPage" :disabled="page === totalPages" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
          Suivant
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notifications: [],
      loading: true,
      page: 1,
      limit: 10,
      total: 0,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.limit);
    }
  },
  async mounted() {
    await this.fetchNotifications();
  },
  methods: {
    async fetchNotifications() {
      this.loading = true;
      try {
        const response = await this.$axios.get('/admin/notifications', {
          params: {
            page: this.page,
            limit: this.limit
          }
        });
        this.notifications = response.data.data;
        this.total = response.data.total;
      } catch (error) {
        console.error('Failed to load notifications', error);
      } finally {
        this.loading = false;
      }
    },
    async prevPage() {
      if (this.page > 1) {
        this.page--;
        await this.fetchNotifications();
      }
    },
    async nextPage() {
      if (this.page < this.totalPages) {
        this.page++;
        await this.fetchNotifications();
      }
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
