<template>
  <Profile />
</template>

<script>
import Profile from '../components/Profile'

export default {
  components: {
    Profile
  },
  middleware: 'auth'
}
</script>

<style scoped>

</style>
