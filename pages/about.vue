<template>
  <div>
    <!-- Section Héroïque -->
    <section class="relative bg-center bg-cover h-screen" :style="{ backgroundImage: `url(${heroImage})` }">
      <div class="absolute inset-0 bg-black opacity-60"></div>
      <div class="relative flex items-center justify-center h-full">
        <div class="text-center text-white animate-fade-in">
          <h1 class="text-5xl font-bold mb-4">À Propos de NF-EAT</h1>
          <p class="text-lg mb-6">Découvrez l'histoire derrière NF-EAT</p>
        </div>
      </div>
    </section>

    <!-- Section Mission -->
    <section class="py-16 bg-gray-100">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-4xl font-bold mb-8">Notre Mission</h2>
        <p class="text-lg max-w-3xl mx-auto">Chez NF-EAT, notre mission est de fournir une expérience culinaire exceptionnelle en proposant des plats délicieux et innovants, élaborés à partir des meilleurs ingrédients. Nous nous engageons à créer une atmosphère accueillante où les clients peuvent savourer de délicieux repas et créer des souvenirs durables.</p>
      </div>
    </section>

    <!-- Section Équipe -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-4xl font-bold mb-12">Rencontrez Notre Équipe</h2>
        <div class="flex flex-wrap justify-center gap-8">
          <div v-for="member in team" :key="member.id" class="max-w-xs">
            <img :src="member.image" alt="Membre de l'équipe" class="w-full h-64 object-cover rounded-t-lg">
            <div class="bg-gray-200 p-4 rounded-b-lg">
              <h3 class="text-xl font-semibold mb-2">{{ member.name }}</h3>
              <p class="text-gray-700">{{ member.position }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Valeurs -->
    <section class="py-16 bg-gray-100">
      <div class="container mx-auto px-6">
        <h2 class="text-4xl font-bold mb-12 text-center">Nos Valeurs</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
          <div class="p-8 bg-white rounded-lg shadow-lg">
            <img src="/path/to/icon1.png" alt="Icône de valeur" class="w-16 h-16 mx-auto mb-4">
            <h3 class="text-xl font-semibold mb-2">Qualité</h3>
            <p>Nous nous engageons à utiliser les ingrédients de la plus haute qualité dans tous nos plats.</p>
          </div>
          <div class="p-8 bg-white rounded-lg shadow-lg">
            <img src="/path/to/icon2.png" alt="Icône de valeur" class="w-16 h-16 mx-auto mb-4">
            <h3 class="text-xl font-semibold mb-2">Créativité</h3>
            <p>Nos chefs sont dédiés à la création de plats innovants et délicieux.</p>
          </div>
          <div class="p-8 bg-white rounded-lg shadow-lg">
            <img src="/path/to/icon3.png" alt="Icône de valeur" class="w-16 h-16 mx-auto mb-4">
            <h3 class="text-xl font-semibold mb-2">Service</h3>
            <p>Nous nous efforçons de fournir un service exceptionnel à chaque client.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Contact -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-4xl font-bold mb-8">Prenez Contact</h2>
        <p class="text-lg max-w-2xl mx-auto mb-8">Nous aimerions avoir de vos nouvelles! Que vous ayez une question sur notre menu, besoin d'aide pour une réservation, ou simplement envie de partager vos commentaires, n'hésitez pas à nous contacter.</p>
        <router-link to="/contact" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Contactez-nous
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      heroImage: '/path/to/your/hero-image.jpg',
      team: [
        {
          id: 1,
          name: 'John Doe',
          position: 'Chef Principal',
          image: '/path/to/team-member1.jpg'
        },
        {
          id: 2,
          name: 'Jane Smith',
          position: 'Sous-Chef',
          image: '/path/to/team-member2.jpg'
        },
        {
          id: 3,
          name: 'Sarah Brown',
          position: 'Chef Pâtissier',
          image: '/path/to/team-member3.jpg'
        }
      ]
    };
  }
}
</script>

<style scoped>
.hero-section {
  position: relative;
}

.hero-section img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
