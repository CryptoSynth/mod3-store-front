import { db, storage } from '../../../services/firebase';

const state = () => ({
  file: null,
  filePreview: null,
  fileUploaded: null,
  isStored: false
});

const mutations = {
  SET_PREVIEW_FILE: (state, file) => {
    state.filePreview = file;
  },

  CLEAR_PREVIEW_FILE: state => {
    state.filePreview = null;
  },

  SET_UPLOADED_FILE: (state, file) => {
    state.fileUploaded = file;
  },

  CLEAR_UPLOADED_FILE: state => {
    state.fileUploaded = null;
  },

  TEMP_FILE: (state, file) => {
    state.file = file;
  },

  SET_STORED: (state, value) => {
    state.isStored = value;
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

  //====================================================
  //Clear File Uploaded using a FileReader API
  //====================================================
  clearUploadedFile({ commit }) {
    commit('CLEAR_UPLOADED_FILE');
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
  async deleteFile({ dispatch }, product) {
    const file = product.image;

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

      //delete image from product
      await db
        .collection('products')
        .doc(product.id)
        .update({
          image: {
            name: null,
            type: null,
            url: null
          }
        });

      dispatch(
        'services/notifications/setStatus',
        { type: 'success', message: 'Image deleted!' },
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
  //Check file is stored in firebase storage path
  //====================================================
  async checkFile({ commit, dispatch }, file) {
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

    try {
      //list all folder references from firebase
      const list = await fileRef.listAll();

      //check if file exists in firebase storage
      const isStored = list.items.some(item => {
        return item.name === file.name;
      });

      console.log(isStored);

      commit('SET_STORED', isStored); //commit if file is in storage
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
