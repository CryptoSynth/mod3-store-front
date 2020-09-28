import { storage } from '../../../services/firebase';

const state = () => ({
  fileUploaded: null
});

const mutations = {
  SET_UPLOADED_FILE: (state, file) => {
    state.fileUploaded = file;
  },

  CLEAR_UPLOADED_FILE: state => {
    state.fileUploaded = null;
  }
};

const actions = {
  //====================================================
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

    try {
      console.log(fileRef);
      const fileTask = fileRef.child(`${file.name}`).put(file, {
        contentType: file.type
      });

      fileTask.on(
        'state_changed',
        snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          //if the image is done processing resolve the process with a message
          dispatch('services/uploads/setProgress', parseInt(progress));
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
          dispatch('services/uploads/setProgress', -1);

          //get image downloadURL
          const downloadURL = await fileTask.snapshot.ref.getDownloadURL();
          commit('SET_UPLOADED_FILE', {
            name: file.name,
            type: file.type,
            url: downloadURL
          });
        }
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
  //Delete file from firebase storage path
  //====================================================
  deleteFile({ commit, dispatch }, file) {
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
    fileTask
      .delete()
      .then(() => {
        dispatch('services/uploads/setProgress', -1);
        commit('CLEAR_UPLOADED_FILE');
      })
      .catch(err => {
        dispatch(
          'services/notifications/setStatus',
          { type: 'error', message: err },
          { root: true }
        );
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
