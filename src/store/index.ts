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
    links: ['Document Generator', 'Matter Tracker'],
    isAuthenticated: true,
    schema: {}
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
    },
    schema(state) {
      return state.schema
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
    }
  },
  modules: {}
})
