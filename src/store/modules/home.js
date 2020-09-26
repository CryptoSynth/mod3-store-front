import { storage } from '../../services/firebase';

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
  companyInfo: {
    title: 'Brownie Inc.',
    subtitle: 'Welcome!',
    description:
      "ELorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  },
  fileUploaded: null,
  loadingValue: -1
});

const mutations = {
  SET_COMPANY: (state, company) => {
    state.company = company;
  }
};

const actions = {
  fetchCompany({ commit }, company) {
    commit('SET_COMPANY', company);
  },

  setCompany({ commit }, company) {
    commit('SET_COMPANY', company);
  },

  updateCompany({ commit }, company) {
    commit('SET_COMPANY', company);
  },

  //====================================================
  //Upload file to firebase storage path
  //====================================================
  async uploadFile({ commit }, file) {
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
          commit('SET_LOADING_STATUS', parseInt(progress)); //image loading
        },
        err => {
          //reject any errors
          console.log(err);
        },
        async () => {
          commit('SET_LOADING_STATUS', -1);
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
      console.log(err);
      commit('SET_STATUS', STATUS.ERROR(err));
    }
  },

  //====================================================
  //Delete file from firebase storage path
  //====================================================
  deleteFile({ commit }, file) {
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
        commit('SET_LOADING_STATUS', -1);
        commit('CLEAR_UPLOADED_FILE');
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
