<script setup lang="ts">
import { ref } from 'vue';

const menus = ref([
  {
    title: 'Liens Utils',
    items: [
      { text: 'Contact', link: '/contact' },
      { text: 'Accueil', link: '/' },
      { text: 'About', link: '/about' },
      { text: 'Mentions Légales', link: '/MentionLegales' }
    ]
  },
  {
    title: 'Utilisateurs',
    items: [
      { text: 'Menus', link: '/menus' },
      { text: 'Profile', link: '/profile' },
      { text: 'Politique de Confidentialité', link: '/politique-confidentialite' }
    ]
  }
]);
</script>

<template>
  <footer class="bg-gray-800 text-white dark:bg-dark pt-20 pb-10 lg:pt-[120px] lg:pb-20">
    <div class="container mx-auto">
      <div class="flex flex-wrap justify-center">
        <!-- Logo and Description -->
        <div class="w-full px-4 sm:w-2/3 lg:w-3/12 text-center">
          <div class="w-full mb-10">
            <a href="javascript:void(0)" class="mb-6 inline-block max-w-[160px]">
              <img src="../assets/images/NF-EAT-transparent.png" alt="NF-EAT Logo" class="w-28">
            </a>
            <p class="text-base text-body-color dark:text-dark-6 mb-7">
              Découvrez une expérience culinaire unique chez NF-EAT, où chaque plat est une œuvre d'art.
            </p>
            <p class="flex items-center text-sm font-medium text-dark dark:text-white">
              <span class="mr-3 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="20" height="20" viewBox="0 0 20 20" xml:space="preserve">
                  <defs></defs>
                  <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                    <path d="M 82.127 71.258 H 26.728 c -4.341 0 -7.873 -3.532 -7.873 -7.873 v -10.16 c 0 -0.828 0.671 -1.5 1.5 -1.5 s 1.5 0.672 1.5 1.5 v 10.16 c 0 2.687 2.186 4.873 4.873 4.873 h 55.399 c 2.687 0 4.873 -2.187 4.873 -4.873 v -36.77 c 0 -2.687 -2.187 -4.873 -4.873 -4.873 H 26.728 c -2.687 0 -4.873 2.186 -4.873 4.873 v 10.038 c 0 0.829 -0.671 1.5 -1.5 1.5 s -1.5 -0.671 -1.5 -1.5 V 26.615 c 0 -4.341 3.532 -7.873 7.873 -7.873 h 55.399 c 4.341 0 7.873 3.532 7.873 7.873 v 36.77 C 90 67.726 86.468 71.258 82.127 71.258 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                    <path d="M 63.732 45 l 16.726 -15.344 c 0.61 -0.56 0.651 -1.509 0.092 -2.12 c -0.56 -0.61 -1.508 -0.65 -2.119 -0.091 L 54.427 49.466 L 30.425 27.445 c -0.611 -0.559 -1.559 -0.519 -2.12 0.091 c -0.56 0.61 -0.519 1.56 0.091 2.12 L 45.122 45 L 28.396 60.345 c -0.61 0.561 -0.651 1.509 -0.091 2.119 c 0.296 0.323 0.7 0.486 1.106 0.486 c 0.362 0 0.726 -0.131 1.014 -0.395 l 16.916 -15.52 l 6.072 5.571 c 0.286 0.263 0.65 0.395 1.014 0.395 s 0.728 -0.132 1.014 -0.395 l 6.073 -5.571 l 16.917 15.52 c 0.288 0.264 0.651 0.395 1.014 0.395 c 0.405 0 0.81 -0.163 1.105 -0.486 c 0.56 -0.61 0.519 -1.559 -0.092 -2.119 L 63.732 45 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                    <path d="M 25.423 46.5 H 7.539 c -0.829 0 -1.5 -0.671 -1.5 -1.5 s 0.671 -1.5 1.5 -1.5 h 17.885 c 0.829 0 1.5 0.671 1.5 1.5 S 26.252 46.5 25.423 46.5 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                    <path d="M 12.497 36.016 H 1.5 c -0.829 0 -1.5 -0.671 -1.5 -1.5 s 0.671 -1.5 1.5 -1.5 h 10.997 c 0.829 0 1.5 0.671 1.5 1.5 S 13.326 36.016 12.497 36.016 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                    <path d="M 12.497 56.984 H 4.394 c -0.829 0 -1.5 -0.672 -1.5 -1.5 s 0.671 -1.5 1.5 -1.5 h 8.104 c 0.829 0 1.5 0.672 1.5 1.5 S 13.326 56.984 12.497 56.984 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                  </g>
                </svg>
              </span>
              NF-EAT
            </p>
          </div>
        </div>
        
        <!-- Links -->
        <div class="w-full px-4 sm:w-1/3 lg:w-3/12">
          <h3 class="text-base font-semibold mb-8">Liens Utiles</h3>
          <ul>
            <li v-for="menu in menus" :key="menu.title" class="mb-4">
              <h4 class="font-medium">{{ menu.title }}</h4>
              <ul>
                <li v-for="item in menu.items" :key="item.link" class="mb-2">
                  <nuxt-link :to="item.link" class="text-gray-400 hover:text-primary transition duration-200">
                    {{ item.text }}
                  </nuxt-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="py-4 text-center text-body-color dark:text-dark-6">
      <p class="text-sm">© 2023 NF-EAT. Tous droits réservés.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #1f2937; 
}

.footer h3 {
  color: #fff;
}

.footer a {
  color: #94a3b8;
  transition: color 0.2s;
}

.footer a:hover {
  color: #60a5fa;
}
</style>
