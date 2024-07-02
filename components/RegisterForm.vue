<template>
  <div>
    <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Inscription</h3>
    <div class="text-gray-900">
      <input v-model="name" type="text" placeholder="Nom" class="border p-2 w-full mb-2"/>
      <span v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</span>
      <input v-model="email" type="email" placeholder="E-mail" class="border p-2 w-full mb-2"/>
      <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
      <input v-model="password" type="password" placeholder="Mot de passe" class="border p-2 w-full mb-2"/>
      <span v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</span>
      <div class="flex items-center mb-4">
        <input v-model="agreeTerms" type="checkbox" class="mr-2"/>
        <label for="agreeTerms" class="text-sm">J'accepte les conditions générales</label>
      </div>
      <span v-if="errors.agreeTerms" class="text-red-500 text-sm">{{ errors.agreeTerms }}</span>
      <button @click="register" class="bg-blue-500 text-white p-2 w-full">S'inscrire</button>
      <p class="mt-4 text-sm text-gray-500">
        Vous avez déjà un compte ?
        <a @click.prevent="$emit('switch-tab', 'login')" href="#" class="text-blue-500">Connectez-vous ici</a>.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      agreeTerms: false,
      errors: {}
    }
  },
  methods: {
    validate() {
      this.errors = {}
      if (!this.name) this.errors.name = 'Le nom est requis.'
      if (!this.email) this.errors.email = 'L\'e-mail est requis.'
      if (!this.password) this.errors.password = 'Le mot de passe est requis.'
      if (!this.agreeTerms) this.errors.agreeTerms = 'Vous devez accepter les conditions générales.'
      return Object.keys(this.errors).length === 0
    },
    async register() {
      if (!this.validate()) return
      try {
        const payload = {
          name: this.name,
          email: this.email,
          plainPassword: this.password,
          agreeTerms: this.agreeTerms
        }
        console.log('Payload:', payload)
        const response = await this.$axios.post('/user/register', payload)
        console.log('Registration successful:', response.data)
        this.$emit('close')
      } catch (error) {
        console.error('Registration failed:', error.response ? error.response.data : error)
      }
    }
  }
}
</script>
