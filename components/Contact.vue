<template>
  <div class="contact-page container mx-auto p-4">
    <h1 class="text-4xl font-bold mb-6 text-center text-white">Contactez-nous</h1>
    <form @submit.prevent="submitForm" class="sm:w-1/2 w-full mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Nom</label>
        <input
          v-model="name"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Votre nom"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
        <input
          v-model="email"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Votre email"
        />
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="message">Message</label>
        <textarea
          v-model="message"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="message"
          placeholder="Votre message"
          rows="5"
        ></textarea>
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Envoyer le message
        </button>
      </div>
    </form>
    <div v-if="statusMessage" class="text-center mt-4">
      <p :class="statusClass">{{ statusMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      message: '',
      statusMessage: '',
      statusClass: ''
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await this.$axios.post('/contact/submit', {
          name: this.name,
          email: this.email,
          message: this.message
        });
        this.statusMessage = 'Message envoyé avec succès !';
        this.statusClass = 'text-green-500';
        this.$toast.success('Message envoyé avec succès !');
        this.name = '';
        this.email = '';
        this.message = '';
      } catch (error) {
        this.statusMessage = 'Échec de l\'envoi du message. Veuillez réessayer.';
        this.statusClass = 'text-red-500';
        this.$toast.error('Échec de l\'envoi du message. Veuillez réessayer.');
      }
    }
  }
};
</script>

<style scoped>
.contact-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
