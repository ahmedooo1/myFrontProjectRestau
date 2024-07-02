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
        { hid: 'description', name: 'description', content: 'Découvrez tous les articles de notre menu chez NF-EAT.' },
        { name: 'keywords', content: 'restaurant, NF-EAT, menus, food, Rouen, 76, ahmedooo, aa, ahmad, menu, shwerma, tacos, elbeuf' }
      ]
    }
  }
}
</script>

<style scoped>
/* Styles... */
</style>
