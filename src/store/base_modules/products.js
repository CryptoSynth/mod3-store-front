import { db } from '../../services/firebase';

const state = () => ({
  products: [],
  loadingValue: -1
});

const mutations = {
  SET_PRODUCTS: (state, product) => {
    state.products.push(product);
  },

  SET_NEW_PRODUCT: (state, newProduct) => {
    state.products.push(newProduct);

    //sort products array in acending order
    const sortedProducts = state.products.sort((a, b) => {
      return a.price - b.price;
    });

    state.products = sortedProducts;
  },

  UPDATE_PRODUCT: (state, updateProduct) => {
    const productIndex = state.products.findIndex(product => {
      return product.id === updateProduct.id;
    });

    state.products.splice(productIndex, 1, updateProduct);
  },

  DELETE_PRODUCT: (state, productID) => {
    const productIndex = state.products.findIndex(product => {
      return product.id === productID;
    });

    state.products.splice(productIndex, 1);
  }
};

const actions = {
  //====================================================
  //Get product from firebase collection products
  //====================================================
  async fetchProducts({ commit, dispatch, state }) {
    try {
      const products = await db
        .collection('products')
        .orderBy('price')
        .get();

      products.forEach(product => {
        if (state.products.length < products.size) {
          commit('SET_PRODUCTS', {
            id: product.id,
            ...product.data()
          });
        }
      });
    } catch (err) {
      dispatch(
        'services/notifications/setStatus',
        { type: 'error', message: err },
        { root: true }
      );
    }
  },

  //====================================================
  //Create new Products from firebase collection products
  //====================================================
  async createProduct({ commit, dispatch }, newProduct) {
    //generate doc ref
    const docRef = db.collection('products').doc();

    //new product w/ docRef id
    newProduct = {
      id: docRef.id, // set docRef id to the new product created
      ...newProduct
    };

    try {
      //add docRef to firebase store w/ new prouct
      await docRef.set(newProduct);

      commit('SET_NEW_PRODUCT', newProduct);
      dispatch(
        'services/notifications/setStatus',
        { type: 'success', message: 'Product Created!' },
        { root: true }
      );
    } catch (err) {
      dispatch(
        'services/notifications/setStatus',
        { type: 'error', message: err },
        { root: true }
      );
    }
  },

  //====================================================
  //Update products from firebase collection products
  //====================================================
  async updateProduct({ commit, dispatch }, updateProduct) {
    try {
      await db
        .collection('products')
        .doc(updateProduct.id)
        .update(updateProduct);

      commit('UPDATE_PRODUCT', updateProduct); //update success status
      dispatch(
        'services/notifications/setStatus',
        { type: 'success', message: 'Product Updated!' },
        { root: true }
      );
    } catch (err) {
      dispatch(
        'services/notifications/setStatus',
        { type: 'error', message: err },
        { root: true }
      );
    }
  },

  //====================================================
  //Delete products from firebase collection products
  //====================================================
  async deleteProduct({ commit, dispatch }, product) {
    try {
      await this.dispatch('services/uploads/deleteFile', product);

      await db
        .collection('products')
        .doc(product.id)
        .delete();

      commit('DELETE_PRODUCT', product.id); //delete success status
      dispatch(
        'services/notifications/setStatus',
        { type: 'success', message: 'Product Deleted!' },
        { root: true }
      );
    } catch (err) {
      dispatch(
        'services/notifications/setStatus',
        { type: 'error', message: err },
        { root: true }
      );
    }
  }
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
