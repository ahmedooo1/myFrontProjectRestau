<template>
  <div class="container mx-auto px-4">
    <MenuList :items="menuItems" />
  </div>
</template>

<script>
import MenuList from '~/components/MenuItemCard.vue'

export default {
  components: {
    MenuList
  },
  data() {
    return {
      menuItems: []
    }
  },
  async fetch() {
    const response = await this.$axios.get('/menu')
    this.menuItems = response.data
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
