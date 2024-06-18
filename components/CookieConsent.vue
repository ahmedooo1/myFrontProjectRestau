<template>
  <div v-if="showPopup" class="fixed bottom-0 inset-x-0 pb-5 px-5">
    <div class="max-w-3xl mx-auto bg-gray-800 text-white rounded-lg p-4 shadow-lg">
      <div class="flex flex-col sm:flex-row items-center justify-between">
        <p class="text-center sm:text-left mb-4 sm:mb-0 flex-1">
          Ce site utilise des cookies pour améliorer votre expérience. En continuant, vous acceptez notre
          <a href="/politique-confidentialite" class="underline text-gray-200">politique de gestion des cookies</a>.
        </p>
        <div class="flex justify-center sm:justify-end space-x-4">
          <button @click="acceptCookies" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Accepter
          </button>
          <button @click="rejectCookies" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Refuser
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      showPopup: false,
    };
  },
  mounted() {
    const cookieConsent = Cookies.get('cookieConsent');
    if (!cookieConsent) {
      this.showPopup = true;
    }
  },
  methods: {
    acceptCookies() {
      Cookies.set('cookieConsent', 'accepted', { expires: 365 });
      this.showPopup = false;
    },
    rejectCookies() {
      Cookies.set('cookieConsent', 'rejected', { expires: 365 });
      this.showPopup = false;
    }
  }
};
</script>

<style scoped>
/* Add your styles here if needed */
</style>
