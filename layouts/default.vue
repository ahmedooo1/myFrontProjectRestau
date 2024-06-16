<template>
  <div >
    <Header />

          <Nuxt  class=" min-h-screen"/>


    <Footer/>
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Header
  }
}
</script>

<style>
/* Add any global styles here */
</style>
