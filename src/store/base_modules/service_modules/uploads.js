import { storage } from '../../../services/firebase';

const state = () => ({
  file: null,
  filePreview: null,
  fileUploaded: null
});

const mutations = {
  SET_PREVIEW_FILE: (state, file) => {
    state.filePreview = file;
  },

  CLEAR_PREVIEW_FILE: state => {
    state.filePreview = null;
  },

  SET_UPLOADED_FILE: (state, file) => {
    console.log(file);
    state.fileUploaded = file;
  },

  TEMP_FILE: (state, file) => {
    state.file = file;
  }
};

const actions = {
  //====================================================
  //Preview Image using a FileReader API
  //====================================================
  previewFile({ commit, dispatch }, file) {
    //save temp file
    commit('TEMP_FILE', file);

    let progress = 0;

    //create reader instance from FileReader object
    let reader = new FileReader();

    //Set reader to read file as a url
    reader.readAsDataURL(file);

    //during progress track file uploaded status
    reader.onprogress = e => {
      progress = (e.loaded / e.total) * 100; //progress as a %
    };

    //on completion set uploaded file
    reader.onload = () => {
      //if the file has finished loading then set fileUploaded
      if (progress === 100) {
        dispatch('services/progress/setProgress', false, { root: true }); //finished loading
        commit('SET_PREVIEW_FILE', reader.result);
      }
    };

    //catch any error during uploading file
    reader.onerror = () => {
      console.log(reader.error);
      dispatch(
        'services/notifications/setStatus',
        { type: 'error', message: reader.error },
        { root: true }
      );
    };
  },

  //====================================================
  //Clear Image Preview using a FileReader API
  //====================================================
  clearPreviewFile({ commit }) {
    commit('CLEAR_PREVIEW_FILE');
  },

  // ====================================================
  //Upload file to firebase storage path
  //====================================================
  async uploadFile({ commit, dispatch }, file) {
    const type = file.type.split('/')[0];

    //base on type choose file reference
    let fileRef;

    switch (type) {
      case 'image':
        fileRef = storage.ref().child(`assets/images/store`);
        break;
      case 'video':
        fileRef = storage.ref().child(`assets/videos/store`);
        break;
      default:
        console.log('Default actions here');
    }

    const fileTask = fileRef.child(`${file.name}`).put(file, {
      contentType: file.type
    });

    fileTask.on(
      'state_changed',
      () => {
        //start loading event
        dispatch('services/progress/setProgress', true, {
          root: true
        });
      },
      err => {
        //reject any errors
        dispatch(
          'services/notifications/setStatus',
          { type: 'error', message: err },
          { root: true }
        );
      },
      async () => {
        try {
          //get image downloadURL
          const downloadURL = await fileTask.snapshot.ref.getDownloadURL();

          commit('SET_UPLOADED_FILE', {
            name: file.name,
            type: file.type,
            url: downloadURL
          });

          //stop loading event
          dispatch('services/progress/setProgress', false, { root: true });
        } catch (err) {
          dispatch(
            'services/notifications/setStatus',
            { type: 'error', message: err },
            { root: true }
          );
        }
      }
    );
  },

  //====================================================
  //Delete file from firebase storage path
  //====================================================
  async deleteFile({ commit, dispatch }, payload) {
    const { file, product } = payload;

    const type = file.type.split('/')[0];

    //base on type choose file reference
    let fileRef;

    switch (type) {
      case 'image':
        fileRef = storage.ref().child(`assets/images/store`);
        break;
      case 'video':
        fileRef = storage.ref().child(`assets/videos/store`);
        break;
      default:
        console.log('Default actions here');
    }

    const fileTask = fileRef.child(`${file.name}`);

    // delete image from storage
    try {
      await fileTask.delete();

      //delete product image in firebase database
      const updateProduct = {
        id: product.id,
        name: product.name,
        image: {
          name: null,
          type: null,
          url: null
        },
        description: product.description,
        price: product.price,
        quantity: product.quantity
      };

      dispatch('products/updateProduct', updateProduct, {
        root: true
      });

      commit('CLEAR_UPLOADED_FILE');
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
