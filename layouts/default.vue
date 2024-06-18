<template>
  <div >
    <Header />

          <Nuxt  class=" min-h-screen"/>
          <CookieConsent />


    <Footer/>
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import CookieConsent from '~/components/CookieConsent.vue';

export default {
  components: {
    Header,
    Footer,
    CookieConsent
  }
}
</script>

<style>
/* Add any global styles here */
</style>
