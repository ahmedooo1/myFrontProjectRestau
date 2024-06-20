<template>
  <div class="container mx-auto px-6 py-16">
    <h2 class="text-4xl font-bold text-center mb-12">Articles du Menu</h2>
    <div class="mb-6">
      <select v-model="selectedCategory" @change="fetchMenuItems">
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.title }}
        </option>
      </select>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <div v-for="item in menuItems" :key="item.id" class="bg-white rounded-lg shadow-lg overflow-hidden transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer" @click="goToDetails(item.id)">
        <img :src="getImageUrl(item.image_url)" alt="Image de l'article du menu" class="w-full h-48 object-cover rounded-t-lg">
        <div class="p-4">
          <h3 class="text-xl font-semibold mb-2">{{ item.name }}</h3>
          <p>{{ item.description }}</p>
          <p class="text-lg font-bold mt-2">{{ item.price }} €</p>
          <button v-if="$auth.loggedIn" @click.stop="addToCart(item)" class="bg-green-500 text-white px-4 py-2 rounded mt-2 transition duration-300 ease-in-out transform hover:scale-105">
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
      categories: [],
      menuItems: [],
      selectedCategory: null
    }
  },
  async fetch() {
    await this.fetchCategories();
    await this.fetchMenuItems();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await this.$axios.get('/categories');
        this.categories = response.data;
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    },
    async fetchMenuItems() {
      try {
        const response = await this.$axios.get('/menu', {
          params: { categoryId: this.selectedCategory }
        });
        this.menuItems = response.data;
      } catch (error) {
        console.error('Failed to fetch menu items', error);
      }
    },
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
        this.$toast.success('Article ajouté au panier');
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

<style scoped>
/* Ajoutez vos styles ici */
</style>
