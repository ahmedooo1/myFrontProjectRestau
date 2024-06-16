<template>
  <div class="p-4 h_full">
    <h1 class="text-2xl font-bold mb-4">Tableau de Bord Administrateur</h1>
    <div v-if="stats" class="mb-8">
      <donut-chart :data="[stats.userCount, stats.orderCount, stats.paidOrdersCount]"></donut-chart>
    </div>
    <div>
      <h2 class="text-xl font-bold mb-4">Liste des Utilisateurs</h2>
      <input v-model="searchQuery" placeholder="Rechercher des utilisateurs..." class="border p-2 mb-4 w-full" />
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white">
          <thead>
            <tr>
              <th class="py-2 px-4 border-b">ID</th>
              <th class="py-2 px-4 border-b">Email</th>
              <th class="py-2 px-4 border-b">Nom</th>
              <th class="py-2 px-4 border-b">Rôles</th>
              <th class="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.id">
              <td class="py-2 px-4 border-b">{{ user.id }}</td>
              <td class="py-2 px-4 border-b">{{ user.email }}</td>
              <td class="py-2 px-4 border-b">{{ user.name }}</td>
              <td class="py-2 px-4 border-b">{{ user.roles.join(', ') }}</td>
              <td class="py-2 px-4 border-b">
                <button
                  @click="toggleAdmin(user)"
                  :class="{'bg-green-500': !user.roles.includes('ROLE_ADMIN'), 'bg-red-500': user.roles.includes('ROLE_ADMIN')}"
                  class="text-white p-2 rounded"
                >
                  {{ user.roles.includes('ROLE_ADMIN') ? 'Révoquer Admin' : 'Rendre Admin' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-4 flex justify-between items-center">
        <button @click="prevPage" :disabled="page === 1" class="px-4 py-2 bg-gray-300 rounded">Précédent</button>
        <span>Page {{ page }} sur {{ totalPages }}</span>
        <button @click="nextPage" :disabled="page >= totalPages" class="px-4 py-2 bg-gray-300 rounded ml-2">Suivant</button>
      </div>
    </div>
  </div>
</template>

<script>
import DonutChart from '~/components/DonutChart.vue'

export default {
  components: {
    DonutChart
  },
  data() {
    return {
      stats: null,
      users: [],
      totalUsers: 0,
      page: 1,
      limit: 6,
      searchQuery: ''
    }
  },
  computed: {
    filteredUsers() {
      return this.users.filter(user =>
        (user.email ? user.email.toLowerCase().includes(this.searchQuery.toLowerCase()) : false) ||
        (user.name ? user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) : false) ||
        (user.roles.join(', ') ? user.roles.join(', ').toLowerCase().includes(this.searchQuery.toLowerCase()) : false)
      )
    },
    totalPages() {
      return Math.ceil(this.totalUsers / this.limit)
    }
  },
  async mounted() {
    await this.fetchStats()
    await this.fetchUsers()
  },
  methods: {
    async fetchStats() {
      try {
        const response = await this.$axios.get('/admin/stats')
        this.stats = response.data
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    },
    async fetchUsers() {
      try {
        const response = await this.$axios.get(`/admin/users?page=${this.page}&limit=${this.limit}`)
        this.users = response.data.data
        this.totalUsers = response.data.total
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    },
    async toggleAdmin(user) {
      try {
        if (user.roles.includes('ROLE_ADMIN')) {
          user.roles = user.roles.filter(role => role !== 'ROLE_ADMIN')
        } else {
          user.roles.push('ROLE_ADMIN')
        }
        await this.$axios.post(`/admin/users/${user.id}/update`, { roles: user.roles })
        this.$set(this.users, this.users.findIndex(u => u.id === user.id), user)
      } catch (error) {
        console.error('Error updating user role:', error)
      }
    },
    async nextPage() {
      if (this.page < this.totalPages) {
        this.page++
        await this.fetchUsers()
      }
    },
    async prevPage() {
      if (this.page > 1) {
        this.page--
        await this.fetchUsers()
      }
    }
  }
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  text-align: left;
  padding: 8px;
}
th {
  background-color: #f2f2f2;
}
</style>
