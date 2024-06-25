<template>
<div>
  <MenuItemCard/>
</div>
</template>

<script>
import MenuItemCard from '../components/MenuItemCard'
export default {
  components: {
    MenuItemCard
  },
  head() {
    return {
      title: 'Menus',
      meta: [
        { hid: 'description', name: 'description', content: 'Découvrez tous les articles de notre menu chez NF-EAT.' }
      ]
    }
  }
}
</script>

<style scoped>
/* Styles... */
</style>
