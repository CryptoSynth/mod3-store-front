import { db, storage } from '../../services/firebase';

//ENUM status
const STATUS = {
  //ERROR status
  ERROR: err => {
    return {
      msg: `${err.message ||
        err.code} || 'There seems to be an error, please try again.' `,
      color: 'error',
      active: true
    };
  },

  //SUCCESS status
  SUCCESS: msg => {
    return {
      msg: `${msg}`,
      color: 'success',
      active: true
    };
  }
};

const state = () => ({
  products: [],
  imageUploaded: null,
  progress: 0,
  status: null
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

  SET_UPLOADED_IMAGE: (state, image) => {
    state.imageUploaded = image;
  },

  SET_PROGESS: (state, progress) => {
    state.progress = progress;
  },

  SET_STATUS: (state, status) => {
    state.status = status;
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
    let { new_product } = payload;

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
        commit('SET_STATUS', STATUS.SUCCESS('Product Created!'));
      })
      .catch(err => {
        commit('SET_STATUS', STATUS.ERROR(err.msg || err.code));
      });
  },

  //====================================================
  //Update products from firebase collection products
  //====================================================
  updateProduct({ commit }, payload) {
    const { update_product } = payload;

    db.collection('products')
      .doc(update_product.id)
      .update(update_product)
      .then(() => {
        commit('UPDATE_PRODUCT'); //update success status
        commit('SET_STATUS', STATUS.SUCCESS('Product Updated!'));
      })
      .catch(err => {
        commit('SET_STATUS', STATUS.ERROR(err.msg || err.code));
      });
  },

  //====================================================
  //Delete products from firebase collection products
  //====================================================
  deleteProduct({ commit }, payload) {
    const { product_id } = payload;

    db.collection('products')
      .doc(product_id)
      .delete()
      .then(() => {
        commit('DELETE_PRODUCT', product_id); //delete success status
        commit('SET_STATUS', STATUS.SUCCESS('Product Deleted!'));
      })
      .catch(err => {
        commit('SET_STATUS', STATUS.ERROR(err.msg || err.code));
      });
  },

  //====================================================
  //Upload image to firebase storage path -> /assets/images/
  //====================================================
  uploadImage({ commit }, image) {
    const image_path = storage.ref().child('assets/images/');

    //upload image to path -> '/assets/images/'
    const image_task = image_path.put(image);

    //during upload state capture snapshot, error, & upload completion
    image_task.on(
      'state_changed',
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      err => {
        console.log(`
        code: ${err.code}
        message: ${err.message}
        `);
      },
      () => {
        image_task.snapshot.ref.getDownloadURL().then(imageURL => {
          commit('SET_UPLOADED_IMAGE', imageURL);
        });
      }
    );
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
