<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-center bg-cover h-screen" :style="{ backgroundImage: `url(${heroImage})` }">
      <div class="absolute inset-0 bg-black opacity-60"></div>
      <div class="relative flex items-center justify-center h-full">
        <div class="text-center text-white animate-fade-in">
          <h1 class="text-5xl font-bold mb-4">About Us</h1>
          <p class="text-lg mb-6">Discover the story behind THE CHEF</p>
        </div>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="py-16 bg-gray-100">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-4xl font-bold mb-8">Our Mission</h2>
        <p class="text-lg max-w-3xl mx-auto">At THE CHEF, our mission is to provide an exceptional dining experience by offering delicious and innovative dishes crafted from the finest ingredients. We are dedicated to creating a welcoming atmosphere where guests can enjoy great food and make lasting memories.</p>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-4xl font-bold mb-12">Meet Our Team</h2>
        <div class="flex flex-wrap justify-center gap-8">
          <div v-for="member in team" :key="member.id" class="max-w-xs">
            <img :src="member.image" alt="Team member" class="w-full h-64 object-cover rounded-t-lg">
            <div class="bg-gray-200 p-4 rounded-b-lg">
              <h3 class="text-xl font-semibold mb-2">{{ member.name }}</h3>
              <p class="text-gray-700">{{ member.position }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="py-16 bg-gray-100">
      <div class="container mx-auto px-6">
        <h2 class="text-4xl font-bold mb-12 text-center">Our Values</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
          <div class="p-8 bg-white rounded-lg shadow-lg">
            <img src="/path/to/icon1.png" alt="Value icon" class="w-16 h-16 mx-auto mb-4">
            <h3 class="text-xl font-semibold mb-2">Quality</h3>
            <p>We are committed to using the highest quality ingredients in all our dishes.</p>
          </div>
          <div class="p-8 bg-white rounded-lg shadow-lg">
            <img src="/path/to/icon2.png" alt="Value icon" class="w-16 h-16 mx-auto mb-4">
            <h3 class="text-xl font-semibold mb-2">Creativity</h3>
            <p>Our chefs are dedicated to creating innovative and delicious dishes.</p>
          </div>
          <div class="p-8 bg-white rounded-lg shadow-lg">
            <img src="/path/to/icon3.png" alt="Value icon" class="w-16 h-16 mx-auto mb-4">
            <h3 class="text-xl font-semibold mb-2">Service</h3>
            <p>We strive to provide exceptional service to every guest.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-4xl font-bold mb-8">Get in Touch</h2>
        <p class="text-lg max-w-2xl mx-auto mb-8">We'd love to hear from you! Whether you have a question about our menu, need assistance with a reservation, or just want to share your feedback, feel free to reach out.</p>
        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Contact Us
        </button>
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
          position: 'Head Chef',
          image: '/path/to/team-member1.jpg'
        },
        {
          id: 2,
          name: 'Jane Smith',
          position: 'Sous Chef',
          image: '/path/to/team-member2.jpg'
        },
        {
          id: 3,
          name: 'Sarah Brown',
          position: 'Pastry Chef',
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
