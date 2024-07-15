<template>
  <div>
    <h3 class="text-lg leading-6 font-medium text-white mb-4">Connexion</h3>
    <div class="text-gray-900">
      <input v-model="email" type="email" placeholder="E-mail" class="border p-2 w-full mb-2" />
      <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
      <input v-model="password" type="password" placeholder="Mot de passe" class="border p-2 w-full mb-2" />
      <span v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</span>
      <p class="m-2 text-sm text-gray-300">
        Vous avez oublié votre mot de passe ?
        <a @click.prevent="$emit('switch-tab', 'forgotPassword')" href="#" class="text-blue-500">Réinitialiser le mot de passe</a>.
      </p>
      <button @click="login" class="bg-blue-400 hover:bg-blue-500 text-white p-2 w-full">Se connecter</button>
      <p class="mt-4 text-sm text-gray-300">
        Vous n'avez pas de compte ?
        <a @click.prevent="$emit('switch-tab', 'register')" href="#" class="text-blue-400">Créer un compte</a>.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      errors: {}
    }
  },
  methods: {
    validate() {
      this.errors = {}
      if (!this.email) this.errors.email = 'L\'e-mail est requis.'
      if (!this.password) this.errors.password = 'Le mot de passe est requis.'
      return Object.keys(this.errors).length === 0
    },
    async login() {
      if (!this.validate()) return
      try {
        const response = await this.$auth.loginWith('local', {
          data: {
            username: this.email,
            password: this.password
          }
        })
        console.log('Login successful:', response)
        this.$toast.success('Connexion réussie!')
        this.$emit('login-success')
        this.$router.push({ path: '/profile' }) // Redirect to home or desired page
      } catch (error) {
        console.error('Login failed:', error)
        this.$toast.error('Échec de la connexion. Veuillez vérifier vos informations.')

      }
    }
  }
}
</script>
<style scoped>
 input {
  border-radius: 5px;
}
button {
  border-radius: 5px;
}
</style>
