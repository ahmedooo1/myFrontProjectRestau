<template>
  <div>
    <!-- Hero Section with Custom Slider -->
    <section class="relative bg-center bg-cover h-screen bg-gray-800">
      <div class="relative inset-0 bg-black opacity-50"></div>
      <div class="absolute inset-0">
        <div v-for="(image, index) in images" :key="index" class="bg-image" :style="{ backgroundImage: `url(${image})` }" :class="{ 'active': index === currentIndex }"></div>
      </div>
      <div class="relative flex items-center justify-center h-full">
        <div class="text-center text-white animate-slide-up">
          <h1 class="text-5xl font-bold mb-4">Bienvenue chez THE CHEF</h1>
          <p class="text-lg mb-6">Découvrez une expérience culinaire unique</p>
          <button @click="scrollToMenu" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-b-500 transition duration-300 ease-in-out transform hover:scale-105">Voir le Menu</button>
        </div>
      </div>
    </section>

    <!-- Menu Section -->
    <section ref="menuSection" class="py-16 bg-gray-100">
      <div class="container mx-auto px-6">
        <h2 class="text-4xl font-bold text-center mb-12">Nos Menus</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div v-for="(menu, index) in limitedMenus" :key="index" class="bg-white rounded-lg shadow-lg overflow-hidden animate-slide-in transition duration-300 ease-in-out transform hover:scale-105">
            <img :src="getImageUrl(menu.image_url)" alt="Menu Image" class="w-full h-48 object-cover">
            <div class="p-4">
              <h3 class="text-xl font-semibold mb-2">{{ menu.name }}</h3>
              <p>{{ menu.description }}</p>
              <p class="text-lg font-bold mt-2">{{ menu.price }} €</p>


            </div>
          </div>
        </div>
        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 transition duration-300 ease-in-out transform hover:scale-105" @click="$router.push('/menus')">Voir plus</button>
      </div>
    </section>

    <!-- Presentation Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-6">
        <h2 class="text-4xl font-bold text-center mb-12">À propos de THE CHEF</h2>
        <div class="flex flex-col md:flex-row items-center">
          <div class="md:w-1/2 md:pr-8">
            <img src="/path/to/your/about-image.jpg" alt="About Image" class="rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
          </div>
          <div class="md:w-1/2 md:pl-8 mt-8 md:mt-0">
            <p class="text-lg mb-4">
              THE CHEF est un restaurant de renommée offrant une expérience culinaire exceptionnelle. Notre équipe de chefs talentueux utilise les meilleurs ingrédients pour créer des plats délicieux et innovants. Venez découvrir notre menu varié et savourez chaque bouchée.
            </p>
            <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 transition duration-300 ease-in-out transform hover:scale-105" @click="$router.push('/about')">En savoir plus</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="py-16 bg-gray-100">
      <div class="container mx-auto px-6">
        <h2 class="text-4xl font-bold text-center mb-12">Nos Services</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div class="text-center p-8 bg-white rounded-lg shadow-lg animate-fade-in transition duration-300 ease-in-out transform hover:scale-105">
            <i class="fas fa-utensils w-16 h-16 mx-auto mb-4 text-green-500"></i>
            <h3 class="text-xl font-semibold mb-2">Service de Traiteur</h3>
            <p>Nous offrons un service de traiteur pour vos événements spéciaux avec des plats délicieux et un service professionnel.</p>
          </div>
          <div class="text-center p-8 bg-white rounded-lg shadow-lg animate-fade-in transition duration-300 ease-in-out transform hover:scale-105">
            <i class="fas fa-truck w-16 h-16 mx-auto mb-4 text-green-500"></i>
            <h3 class="text-xl font-semibold mb-2">Livraison à Domicile</h3>
            <p>Profitez de nos plats savoureux dans le confort de votre maison avec notre service de livraison rapide et fiable.</p>
          </div>
          <div class="text-center p-8 bg-white rounded-lg shadow-lg animate-fade-in transition duration-300 ease-in-out transform hover:scale-105">
            <i class="fas fa-concierge-bell w-16 h-16 mx-auto mb-4 text-green-500"></i>
            <h3 class="text-xl font-semibold mb-2">Réservations</h3>
            <p>Réservez une table chez THE CHEF pour une expérience culinaire inoubliable dans un cadre élégant et confortable.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [],
      images: [],
      currentIndex: 0
    };
  },
  async mounted() {
    await this.fetchMenus();
    this.startSlider();
  },
  methods: {
    async fetchMenus() {
      try {
        const response = await this.$axios.get('/menu');
        this.menus = response.data;
        this.images = this.menus.map(menu => this.getImageUrl(menu.image_url));
      } catch (error) {
        console.error('Failed to load menus', error);
      }
    },
    getImageUrl(imagePath) {
      return `http://127.0.0.1:8000${imagePath}`;
    },
    startSlider() {
      setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
      }, 5000);
    },
    scrollToMenu() {
      const menuSection = this.$refs.menuSection;
      window.scrollTo({
        top: menuSection.offsetTop,
        behavior: 'smooth'
      });
    },
    addToCart(menu) {
      // Add the menu item to the cart
      // Implement your cart logic here
    }
  },
  computed: {
    limitedMenus() {
      return this.menus.slice(0, 4);
    }
  }
};
</script>

<style scoped>
/* Animations */
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slide-horizontal {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-up {
  animation: slide-up 1s ease-out;
}

.animate-slide-in {
  animation: slide-in 1s ease-out;
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}

.bg-image {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 1s ease-in-out, transform 1s ease-in-out;
  overflow: hidden; /* Prevent overflow */
}

.bg-image.active {
  opacity: 1;
  transform: translateX(0);
  animation: slide-horizontal 1s ease-in-out;
}

section.relative {
  overflow: hidden; /* Prevent overflow */
}
</style>
