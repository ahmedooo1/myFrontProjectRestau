<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Articles du Menu</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="item in menuItems" :key="item.id" class="bg-white rounded-lg shadow-md p-4 mb-4 cursor-pointer hover:bg-gray-100" @click="goToDetails(item.id)">
        <img :src="getImageUrl(item.image_url)" alt="Image de l'article du menu" class="w-full h-48 object-cover rounded-t-lg">
        <div class="p-4">
          <h2 class="text-2xl font-semibold">{{ item.name }}</h2>
          <p>{{ item.description }}</p>
          <p class="text-lg font-bold">{{ item.price }} €</p>
          <button v-if="$auth.loggedIn" @click.stop="addToCart(item)" class="bg-green-500 text-white px-4 py-2 rounded mt-2">
            <img width="25" height="25" src="https://img.icons8.com/windows/32/FFFFFF/add-to-shopping-basket.png" alt="add-to-shopping-basket"/>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuItems: []
    }
  },
  async fetch() {
    if (!this.menuItems.length) {
      const response = await this.$axios.get('/menu')
      this.menuItems = response.data
    }
  },
  methods: {
    getImageUrl(imagePath) {
      return `http://127.0.0.1:8000${imagePath}`;
    },
    async addToCart(item) {
      try {
        const payload = {
          userId: this.$auth.user.id,
          menuItemId: item.id,
          quantity: 1
        };
        await this.$axios.post('/carts', payload);
        alert('Item added to cart');
      } catch (error) {
        console.error('Failed to add item to cart', error);
      }
    },
    goToDetails(id) {
      this.$router.push({ path: `/menu/${id}` });
    }
  }
}
</script>
