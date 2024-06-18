<template>
  <div class="container mx-auto mt-8 p-4 max-w-md">
    <h2 class="text-2xl font-bold mb-4">Demande de réinitialisation de mot de passe</h2>
    <form @submit.prevent="requestResetPassword">
      <div class="mb-4">
        <label for="email" class="block text-gray-700">Email</label>
        <input type="email" v-model="email" id="email" required class="w-full px-3 py-2 border rounded">
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
        Envoyer
      </button>
    </form>
    <p v-if="message" class="mt-4">{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      message: '',
    };
  },
  methods: {
    async requestResetPassword() {
      try {
        const response = await this.$axios.post('/request-reset-password', {
          email: this.email,
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
