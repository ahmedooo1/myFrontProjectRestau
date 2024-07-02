<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4 text-white">Gestion du Menu Admin</h1>
    <button @click="showAddModal = true" class="bg-blue-500 text-white px-4 py-2 rounded mb-4">Ajouter un Élément de Menu</button>
    <div v-if="menuItems.length === 0">Aucun élément de menu disponible.</div>
    <div v-for="item in menuItems" :key="item.id" class="bg-white shadow-md rounded-lg p-4 mb-4">
      <div class="flex justify-between items-center sm:flex-row flex-col">
        <div class="">
          <img :src="getImageUrl(item.image_url)" alt="Image de l'élément de menu" class="w-32 h-32 object-cover rounded">
        </div>
        <div class="flex-grow ml-4">
          <h2 class="text-2xl font-semibold">{{ item.name }}</h2>
          <p>{{ item.description }}</p>
          <p class="text-lg font-bold">{{ item.price }} €</p>
          <p class="text-md">{{ item.category.title }}</p>
        </div>
        <div class="w-64 flex items-center justify-center">
          <button @click="editItem(item)" class="bg-yellow-500 text-white px-4 py-2 rounded mr-2">Modifier</button>
          <button @click="deleteItem(item.id)" class="bg-red-500 text-white px-4 py-2 rounded">Supprimer</button>
        </div>
      </div>
    </div>

    <!-- Modal Ajouter/Modifier -->
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded shadow-lg w-96">
        <h2 class="text-2xl font-bold mb-4">{{ showEditModal ? 'Modifier l\'Élément de Menu' : 'Ajouter un Élément de Menu' }}</h2>
        <form @submit.prevent="showEditModal ? updateMenuItem() : createMenuItem()">
          <div class="mb-4">
            <label class="block text-gray-700">Nom</label>
            <input v-model="currentItem.name" type="text" class="w-full px-4 py-2 border rounded" />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Description</label>
            <input v-model="currentItem.description" type="text" class="w-full px-4 py-2 border rounded" />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Prix</label>
            <input v-model="currentItem.price" type="number" class="w-full px-4 py-2 border rounded" />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Image</label>
            <input @change="onFileChange" type="file" class="w-full px-4 py-2 border rounded" />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Catégorie</label>
            <select v-model="currentItem.category_id" class="w-full px-4 py-2 border rounded">
              <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.title }}</option>
            </select>
          </div>
          <div v-if="error" class="mb-4 text-red-500">{{ error }}</div>
          <div class="flex justify-end">
            <button type="button" @click="closeModal" class="bg-gray-500 text-white px-4 py-2 rounded mr-2">Annuler</button>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">{{ showEditModal ? 'Mettre à Jour' : 'Ajouter' }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuItems: [],
      categories: [],
      showAddModal: false,
      showEditModal: false,
      currentItem: {
        id: null,
        name: '',
        description: '',
        price: '',
        image_url: '',
        category_id: null
      },
      selectedFile: null,
      error: ''
    }
  },
  async mounted() {
    await this.fetchMenuItems();
    await this.fetchCategories();
  },
  methods: {
    async fetchMenuItems() {
      try {
        const response = await this.$axios.get('/menu');
        this.menuItems = response.data.map(item => {
          // Flatten the response to remove the extra layer
          return {
            ...item[0],
            commentCount: item.commentCount
          };
        });
      } catch (error) {
        console.error('Failed to fetch menu items', error);
      }
    },
    async fetchCategories() {
      try {
        const response = await this.$axios.get('/categories');
        this.categories = response.data;
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    },
    async createMenuItem() {
      if (!this.selectedFile) {
        this.error = 'Veuillez sélectionner une image.';
        return;
      }

      const formData = {
        name: this.currentItem.name,
        description: this.currentItem.description,
        price: this.currentItem.price,
        image_url: '',
        category_id: this.currentItem.category_id
      };

      const reader = new FileReader();
      reader.onloadend = () => {
        formData.image_url = reader.result;
        this.submitFormData(formData);
      };
      reader.readAsDataURL(this.selectedFile);
    },
    async submitFormData(formData) {
      try {
        await this.$axios.post('/menu', formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        this.closeModal();
        await this.fetchMenuItems();
      } catch (error) {
        console.error(error);
      }
    },
    async updateMenuItem() {
      if (!this.selectedFile && !this.currentItem.image_url) {
        this.error = 'Veuillez sélectionner une image.';
        return;
      }

      const formData = {
        name: this.currentItem.name,
        description: this.currentItem.description,
        price: this.currentItem.price,
        image_url: this.currentItem.image_url, // Conserver l'URL de l'image existante
        category_id: this.currentItem.category_id
      };

      if (this.selectedFile) {
        const reader = new FileReader();
        reader.onloadend = () => {
          formData.image_url = reader.result;
          this.submitUpdateFormData(formData);
        };
        reader.readAsDataURL(this.selectedFile);
      } else {
        this.submitUpdateFormData(formData);
      }
    },
    async submitUpdateFormData(formData) {
      try {
        await this.$axios.put(`/menu/${this.currentItem.id}`, formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        this.closeModal();
        await this.fetchMenuItems();
      } catch (error) {
        console.error(error);
      }
    },
    async deleteItem(id) {
      try {
        await this.$axios.delete(`/menu/${id}`);
        await this.fetchMenuItems();
      } catch (error) {
        console.error('Failed to delete item', error);
      }
    },
    editItem(item) {
      this.currentItem = { ...item, category_id: item.category.id };
      this.showEditModal = true;
      this.error = ''; // Réinitialiser le message d'erreur
    },
    closeModal() {
      this.showAddModal = false;
      this.showEditModal = false;
      this.currentItem = {
        id: null,
        name: '',
        description: '',
        price: '',
        image_url: '',
        category_id: null
      };
      this.selectedFile = null;
      this.error = ''; // Réinitialiser le message d'erreur
    },
    onFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    getImageUrl(imagePath) {
      return `http://api.aa-world.store${imagePath}`;
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
