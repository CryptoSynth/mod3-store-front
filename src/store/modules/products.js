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
  loadingValue: 0,
  status: {}
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
  },

  SET_UPLOADED_IMAGE: (state, image) => {
    state.imageUploaded = image;
  },

  CLEAR_UPLOADED_IMAGE: state => {
    state.imageUploaded = null;
  },

  SET_LOADING_STATUS: (state, loadingValue) => {
    state.loadingValue = loadingValue;
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
    let { newProduct } = payload;

    //generate doc ref
    const docRef = db.collection('products').doc();

    //new product w/ docRef id
    newProduct = {
      id: docRef.id, // set docRef id to the new product created
      ...newProduct
    };

    //add docRef to firebase store w/ new prouct
    docRef
      .set(newProduct)
      .then(() => {
        commit('SET_NEW_PRODUCT', newProduct);
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
    const { updateProduct } = payload;

    db.collection('products')
      .doc(updateProduct.id)
      .update(updateProduct)
      .then(() => {
        commit('UPDATE_PRODUCT', updateProduct); //update success status
        commit('SET_STATUS', STATUS.SUCCESS('Product Updated!'));
      })
      .catch(err => {
        commit('SET_STATUS', STATUS.ERROR(err));
      });
  },

  //====================================================
  //Delete products from firebase collection products
  //====================================================
  deleteProduct({ commit }, productID) {
    db.collection('products')
      .doc(productID)
      .delete()
      .then(() => {
        commit('DELETE_PRODUCT', productID); //delete success status
        commit('SET_STATUS', STATUS.SUCCESS('Product Deleted!'));
      })
      .catch(err => {
        commit('SET_STATUS', STATUS.ERROR(err));
      });
  },

  //====================================================
  //Upload image to firebase storage path -> /assets/images/
  //====================================================
  async uploadImage({ commit }, image) {
    //image path reference
    const imageRef = storage.ref().child(`assets/images/`);

    try {
      const imageTask = imageRef.child(`${image.name}`).put(image, {
        contentType: image.type
      });

      imageTask.on(
        'state_changed',
        snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          //if the image is done processing resolve the process with a message
          console.log(progress);
          commit('SET_LOADING_STATUS', parseInt(progress)); //image loading

          if (progress >= 100) {
            console.log('Done processing image!');
          }
        },
        err => {
          //reject any errors
          console.log(err);
        },
        async () => {
          //get image downloadURL
          const downloadURL = await imageTask.snapshot.ref.getDownloadURL();
          commit('SET_UPLOADED_IMAGE', {
            name: image.name,
            url: downloadURL
          });
        }
      );
    } catch (err) {
      console.log(err);
      commit('SET_STATUS', STATUS.ERROR(err));
    }
  },

  //====================================================
  //Delete image from firebase storage path -> /assets/images/
  //====================================================
  deleteImage({ commit }, image) {
    const imageRef = storage.ref().child(`assets/images/`);

    const imageTask = imageRef.child(`${image.name}`);

    // delete image from storage
    imageTask
      .delete()
      .then(() => {
        commit('SET_LOADING_STATUS', 0);
        commit('CLEAR_UPLOADED_IMAGE');
      })
      .catch(err => {
        commit('SET_STATUS', STATUS.ERROR(err));
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
