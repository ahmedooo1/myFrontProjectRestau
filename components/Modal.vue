<template>
  <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full pb-5">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 relative">
          <!-- Icon X for closing the modal -->
          <button @click="closeModal" type="button" class="absolute top-0 right-0 mt-4 mr-4 text-gray-400 hover:text-gray-600 focus:outline-none">
            <span class="sr-only">Close</span>
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <component :is="currentTabComponent" @login-success="handleLoginSuccess" @switch-tab="currentTab = $event" @close="closeModal" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '~/components/LoginForm.vue'
import RegisterForm from '~/components/RegisterForm.vue'
import ForgotPasswordForm from '~/components/ForgotPasswordForm.vue'

export default {
  components: {
    LoginForm,
    RegisterForm,
    ForgotPasswordForm
  },
  data() {
    return {
      currentTab: 'login'
    }
  },
  computed: {
    currentTabComponent() {
      return {
        login: LoginForm,
        register: RegisterForm,
        forgotPassword: ForgotPasswordForm
      }[this.currentTab]
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    handleLoginSuccess() {
      this.closeModal()
    }
  }
}
</script>
