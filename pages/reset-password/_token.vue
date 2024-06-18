<template>
  <div class="container mx-auto mt-8 p-4 max-w-md">
    <h2 class="text-2xl font-bold mb-4">Réinitialiser le mot de passe</h2>
    <form @submit.prevent="resetPassword">
      <div class="mb-4">
        <label for="password" class="block text-gray-700">Nouveau mot de passe</label>
        <input type="password" v-model="password" id="password" required class="w-full px-3 py-2 border rounded">
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
        Réinitialiser
      </button>
    </form>
    <p v-if="message" class="mt-4">{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: '',
      message: '',
    };
  },
  async asyncData({ params }) {
    return {
      token: params.token,
    };
  },
  methods: {
    async resetPassword() {
      try {
        const response = await this.$axios.post(`/reset-password/${this.token}`, {
          password: this.password,
        });
        this.message = response.data.message;
      } catch (error) {
        this.message = error.response.data.message || 'Une erreur est survenue';
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
