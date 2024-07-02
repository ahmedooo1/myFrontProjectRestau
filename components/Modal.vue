<template>
  <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <component :is="currentTabComponent" @login-success="handleLoginSuccess" @switch-tab="currentTab = $event" @close="closeModal" />
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button @click="closeModal" type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
            Close
          </button>
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
