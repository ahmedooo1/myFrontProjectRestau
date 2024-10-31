<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-800">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-yellow-500 mb-4">
        {{ error ? error.statusCode : '404' }}
      </h1>
      <h2 class="text-2xl text-white mb-8">
        {{ error ? error.message : "Oops! La page que vous recherchez n'existe pas." }}
      </h2>
      <NuxtLink 
        to="/" 
        class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
      >
        Retour à l'accueil
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  layout: 'default',
  props: {
    error: {
      type: Object,
      default: () => ({
        statusCode: 404,
        message: "Oops! La page que vous recherchez n'existe pas."
      })
    }
  }
}
</script> 