import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import { db, storage } from '@/firebaseInit'

Vue.use(Vuex)

export default new Vuex.Store({
  // strict: true,
  state: {
    documents: [],
    document: {
      name: null,
      url: null,
      fields: {}
    },
    error: null,
    status: null,
    links: [
      { id: 0, text: 'Home', page: '/' },
      { id: 1, text: 'About', page: '/about' },
      { id: 2, text: 'Login', page: '/login' }
    ],
    isAuthenticated: true
  },
  getters: {
    documents(state) {
      return state.documents
    },
    documentFields(state) {
      return state.document.fields
    },
    documentType(state) {
      return state.document.name
    },
    documentURL(state) {
      return state.document.url
    },
    isAuthenticated(state) {
      return state.isAuthenticated
    }
  },
  mutations: {
    setDocuments(state, payload) {
      state.documents = payload
    },
    setDocument(state, payload) {
      state.document = { ...state.document, ...payload }
    },
    setDocumentType(state, payload) {
      state.document.name = payload
    },
    setDocumentFields(state, payload) {
      state.document.fields = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    setStatus(state, payload) {
      state.status = payload
    }
  },
  actions: {
    loadDocuments({ commit }) {
      db.collection('documentTypes')
        .get()
        .then((q: firebase.firestore.QuerySnapshot) => {
          commit(
            'setDocuments',
            q.docs.map(doc => {
              return { ...{ id: doc.id }, ...doc.data() }
            })
          )
        })
    },
    setDocuments({ commit }, payload) {
      commit('setDocuments', payload)
    },
    setDocument({ commit }, payload) {
      commit('setDocument', payload)
    },
    setDocumentFields({ commit }, payload) {
      commit('setDocumentFields', payload)
    }
  },
  modules: {}
})
