<template>
<div>
<Home/>
</div>
</template>

<script>
import Home from '../components/Home'
export default {
components : {
Home
},
head() {
  return {
    title: 'Accueil',
    meta: [
      { hid: 'description', name: 'description', content: 'Bienvenue chez NF-EAT, découvrez notre menu et nos services.' },
      { name: 'keywords', content: 'restaurant, NF-EAT, accueil, menu, services, Rouen, restau, Elbeuf, 76, kebab, syrien, syrie, français, libanais, turc, helal' }
    ]
  }
}
};
</script>
