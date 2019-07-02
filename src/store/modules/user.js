import axios from '../axios'

const state = {}

const getters = {}

const mutations = {
  SET_USER (state, data) {
    Object.assign(state, data)
  }
}

const actions = {
  async getUser (context, id) {
    try {
      const result = await axios(`/users/${id}`, {
        method: 'get'
      })
      context.commit('SET_USER', result.data)
    } catch (error) {
      throw error
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
