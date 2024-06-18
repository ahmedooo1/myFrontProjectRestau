<template>
  <div class="container mx-auto mt-8 p-4 max-w-md bg-white shadow-lg rounded-lg">
    <h2 class="text-2xl font-bold mb-6 text-center">Réinitialiser le mot de passe</h2>
    <form @submit.prevent="resetPassword">
      <div class="mb-4">
        <label for="password" class="block text-gray-700 font-semibold">Nouveau mot de passe</label>
        <input
          type="password"
          v-model="password"
          id="password"
          required
          class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
      </div>
      <div class="mb-4">
        <label for="confirmPassword" class="block text-gray-700 font-semibold">Confirmer le mot de passe</label>
        <input
          type="password"
          v-model="confirmPassword"
          id="confirmPassword"
          required
          class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
      </div>
      <button
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition duration-300"
      >
        Réinitialiser
      </button>
    </form>
    <transition name="fade">
      <p v-if="message" :class="messageType" class="mt-4 p-2 text-center rounded">{{ message }}</p>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: '',
      confirmPassword: '',
      message: '',
      messageType: '',
    };
  },
  async asyncData({ params }) {
    return {
      token: params.token,
    };
  },
  methods: {
    async resetPassword() {
      if (this.password !== this.confirmPassword) {
        this.message = 'Les mots de passe ne correspondent pas';
        this.messageType = 'bg-red-500 text-white';
        return;
      }
      try {
        const response = await this.$axios.post(`/reset-password/${this.token}`, {
          password: this.password,
        });
        this.message = response.data.message;
        this.messageType = 'bg-green-500 text-white';
      } catch (error) {
        this.message = error.response.data.message || 'Une erreur est survenue';
        this.messageType = 'bg-red-500 text-white';
      }
    },
  },
};
</script>

<style scoped>
/* Add custom styles here */
.container {
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
