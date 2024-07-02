export const state = () => ({
  auth: {
    loggedIn: false,
    user: null,
  },
})

export const mutations = {
  SET_USER(state, user) {
    state.auth.user = user
    state.auth.loggedIn = !!user
  },
}

export const actions = {
  async login({ commit }, credentials) {
    try {
      const response = await this.$axios.post('/login_check', credentials)
      const token = response.data.token
      this.$axios.setToken(token, 'Bearer')
      const userResponse = await this.$axios.post('/user/getcurrent')
      commit('SET_USER', userResponse.data)
    } catch (error) {
      throw new Error('Invalid credentials')
    }
  },
  async logout({ commit }) {
    this.$axios.setToken(false)
    commit('SET_USER', null)
  },
}
