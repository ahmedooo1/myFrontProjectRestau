<template>
  <div class="container mx-auto p-4" v-if="$auth.loggedIn && $auth.user.roles.includes('ROLE_ADMIN')">
    <h2 class="text-3xl font-bold mb-6 text-gray-800">Notifications de Commandes</h2>
    <div v-if="loading" class="text-center text-gray-600">Chargement...</div>
    <div v-if="!loading && notifications.length === 0" class="text-center text-gray-600">Aucune notification trouvée.</div>
    <div v-if="!loading && notifications.length > 0">
      <div class="overflow-x-auto bg-white shadow-md rounded-lg">
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nom de l'Utilisateur</th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email de l'Utilisateur</th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nom de Commande</th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Quantité Totale</th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Prix Total</th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="notification in notifications" :key="notification.id" class="hover:bg-gray-100 transition duration-200 ease-in-out">
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">{{ notification.user.name }}</td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">{{ notification.user.email }}</td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">{{ notification.commandNames }}</td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">{{ notification.totalQuantity }}</td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">{{ notification.totalPrice }} €</td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">{{ notification.createdAt }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex justify-between items-center mt-6">
        <button @click="prevPage" :disabled="page === 1" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l disabled:opacity-50">
          Précédent
        </button>
        <span class="text-gray-600">Page {{ page }} sur {{ totalPages }}</span>
        <button @click="nextPage" :disabled="page === totalPages" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r disabled:opacity-50">
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
    this.listenForNotifications();
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
        this.notifications = response.data.data.map(notification => {
          const details = this.parseDetails(notification.details);
          return {
            ...notification,
            commandNames: details.commandNames.join(', '),
            totalQuantity: details.totalQuantity,
            totalPrice: details.totalPrice
          };
        });
        this.total = response.data.total;
      } catch (error) {
        console.error('Failed to load notifications', error);
      } finally {
        this.loading = false;
      }
    },
    listenForNotifications() {
      this.$socket.on('new-order', (data) => {
        const details = this.parseDetails(data.commandNames);
        const notification = {
          ...data,
          commandNames: details.commandNames.join(', '),
          totalQuantity: details.totalQuantity,
          totalPrice: details.totalPrice
        };
        this.notifications.unshift(notification);
        if (this.notifications.length > this.limit) {
          this.notifications.pop();
        }
      });
    },
    parseDetails(details) {
      const items = details.split(', ');
      let commandNames = [];
      let totalQuantity = 0;
      let totalPrice = 0;

      items.forEach(item => {
        const matches = item.match(/(.+?) \(Quantité: (\d+)\) - (\d+\.\d{2}) €/);
        if (matches) {
          commandNames.push(`${matches[1]} (Quantité: ${matches[2]})`);
          totalQuantity += parseInt(matches[2], 10);
          totalPrice += parseFloat(matches[3]);
        }
      });

      return { commandNames, totalQuantity, totalPrice };
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
.container {
  max-width: 1200px;
  margin: auto;
}
</style>
