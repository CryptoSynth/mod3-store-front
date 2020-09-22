import { db, storage } from '../../services/firebase';

//ENUM status
const STATUS = {
  //ERROR status
  ERROR: err => {
    console.log(err);
    return {
      msg:
        `
         Code: ${err.code || '0'}
         Message: ${err.message ||
           err.msg ||
           'There seems to be an error, please try again.'} 
        
        ` || 'Server Error Please try refreshing your browser',
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
  isLoading: null,
  status: {}
});

const mutations = {
  SET_PRODUCTS: (state, product) => {
    state.products.push(product);
  },

  SET_NEW_PRODUCT: (state, new_product) => {
    state.products.push(new_product);

    //sort products array in acending order
    const sortedProducts = state.products.sort((a, b) => {
      return a.price - b.price;
    });

    state.products = sortedProducts;
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

  CLEAR_UPLOADED_IMAGE: state => {
    state.imageUploaded = null;
  },

  SET_LOADING_STATUS: (state, isLoading) => {
    state.isLoading = isLoading;
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
        commit('SET_STATUS', STATUS.ERROR(err));
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
        commit('UPDATE_PRODUCT', update_product); //update success status
        commit('SET_STATUS', STATUS.SUCCESS('Product Updated!'));
      })
      .catch(err => {
        commit('SET_STATUS', STATUS.ERROR(err));
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
        commit('SET_STATUS', STATUS.ERROR(err));
      });
  },

  //====================================================
  //Upload image to firebase storage path -> /assets/images/
  //====================================================
  uploadImage({ commit }, image) {
    const image_path = storage.ref().child('assets/images/');

    //upload image to path -> '/assets/images/'
    const image_task = image_path.put(image);

    //create promise to wait for image processing during image upload
    const processing_image = new Promise((resolve, reject) => {
      image_task.on(
        'state_changed',
        snapshot => {
          commit('SET_LOADING_STATUS', true); //start image loading

          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          //if the image is done processing resolve the process with a message
          if (progress >= 100) {
            resolve('Done Processing Image!');
          }
        },
        err => {
          //reject any errors
          reject(err);
        }
      );
    });

    //after
    processing_image
      .then(res => {
        console.log(res);

        image_task.snapshot.ref.getDownloadURL().then(downloadURL => {
          commit('SET_LOADING_STATUS', false); //image is done loading
          commit('SET_UPLOADED_IMAGE', downloadURL);
        });
      })
      .catch(err => {
        commit('SET_STATUS', STATUS.ERROR(err));
      });
  },

  //====================================================
  //Delete image from firebase storage path -> /assets/images/
  //====================================================
  deleteImage({ commit }, image) {
    const image_path = storage.ref().child(`assets/images/${image}`);

    //if the image exists in the ref path then delete if not set imageUpload = null
    image_path
      .delete()
      .then(() => {
        commit('CLEAR_UPLOADED_IMAGE');
      })
      .catch(err => {
        commit('SET_STATUS', STATUS.ERROR(err));
      });
  },

  clearImage({ commit }) {
    commit('CLEAR_UPLOADED_IMAGE');
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
