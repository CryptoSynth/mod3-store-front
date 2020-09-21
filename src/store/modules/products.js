import { db } from '../../services/firebase';

const state = () => ({
  products: [],
  product_status: {}
});

const mutations = {
  SET_PRODUCTS: (state, product) => {
    state.products.push(product);
  },

  SET_NEW_PRODUCT: (state, new_product) => {
    state.products.push(new_product);
  },

  UPDATE_PRODUCT: (state, update_product) => {
    const product_index = state.products.findIndex(product => {
      return product.id === update_product.id;
    });

    state.products.splice(product_index, 1, update_product);
  },

  DELETE_PRODUCT: (state, product_id) => {
    const product_index = state.products.findIndex(product => {
      return product.id === product_id;
    });

    state.products.splice(product_index, 1);
  },

  SET_STATUS: (state, status) => {
    return (state.product_status = status);
  }
};

const actions = {
  //====================================================
  //Get product from firebase collection products
  //====================================================
  fetchProducts({ commit, state }) {
    db.collection('products')
      .orderBy('price')
      .get()
      .then(res => {
        res.forEach(products => {
          let product = {
            id: products.id,
            ...products.data()
          };

          if (state.products.length < res.size) {
            commit('SET_PRODUCTS', product);
          }
        });
      });
  },

  //====================================================
  //Create new Products from firebase collection products
  //====================================================
  createProduct({ commit }, payload) {
    let { new_product, status } = payload;

    //generate doc ref
    const docRef = db.collection('products').doc();

    //new product w/ docRef id
    new_product = {
      id: docRef.id, // set docRef id to the new product created
      ...new_product
    };

    //add docRef to firebase store w/ new prouct
    docRef
      .set(new_product)
      .then(() => {
        commit('SET_NEW_PRODUCT', new_product);
        commit('SET_STATUS', status); //created succesful status
      })
      .catch(err => {
        if (err) {
          commit('SET_STATUS', status); //created error status
        }
      });
  },

  //====================================================
  //Update products from firebase collection products
  //====================================================
  updateProduct({ commit }, payload) {
    const { update_product, status } = payload;

    db.collection('products')
      .doc(update_product.id)
      .update(update_product)
      .then(() => {
        commit('UPDATE_PRODUCT'); //update success status
      })
      .catch(err => {
        if (err) {
          commit('SET_STATUS', status); //update error status
        }
      });
  },

  //====================================================
  //Delete products frp, firebase collection products
  //====================================================
  deleteProduct({ commit }, payload) {
    const { product_id, status } = payload;

    db.collection('products')
      .doc(product_id)
      .delete()
      .then(() => {
        commit('DELETE_PRODUCT', product_id); //delete success status
        commit('SET_STATUS', status);
      })
      .catch(err => {
        if (err) {
          commit('SET_STATUS', status); //delete error status
        }
      });
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
