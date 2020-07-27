import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import { db, storage, auth } from '@/firebaseInit'

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
    user: null,
    schema: {
      type: 'object',
      required: [],
      properties: {}
    },
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
      return !(state.user === null)
    },
    schema(state) {
      return state.schema
    },
    fields(state) {
      return state.schema.properties
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
    },
    setSchema(state, payload) {
      state.schema = payload
    },
    setFieldType(state, payload) {
      state.schema.properties = payload
    },
    setUser(state, payload) {
      state.user = payload
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
    },
    setSchema({ commit }, payload) {
      commit('setSchema', payload)
    },
    loginUser({ commit }, payload) {
      commit('setUser', payload)
    }
  },
  modules: {}
})
