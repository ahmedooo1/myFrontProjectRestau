<template>
  <div class="container mx-auto mt-8 p-4 max-w-2xl">
    <h2 class="text-2xl font-bold mb-4">Paiement Réussi</h2>
    <p>Merci pour votre réservation !</p>
    <p>Votre commande est en cours de préparation...</p>
    <p>On vous attend, à bientôt !</p>
    <nuxt-link to="/" class="text-blue-500 flex items-center">
      <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"></path></svg>
      Retour à l'accueil
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: "OrderSuccess"
}
</script>

<style scoped>
/* Add your styles here */
</style>
