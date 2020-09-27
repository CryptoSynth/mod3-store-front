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
  companyInfo: null,
  fileUploaded: null,
  loadingValue: -1,
  status: null
});

const mutations = {
  SET_COMPANY: (state, existingCompanyInfo) => {
    state.companyInfo = existingCompanyInfo;
  },

  UPDATE_COMPANY: (state, updateCompanyInfo) => {
    state.companyInfo = updateCompanyInfo;
  },

  SET_STATUS: (state, status) => {
    state.status = status;
  }
};

const actions = {
  //====================================================
  //Get companyInfo from firebase collection home
  //====================================================
  async fetchCompanyInfo({ commit }) {
    try {
      const home = await db.collection('home').get();

      home.forEach(companyInfo => {
        commit('SET_COMPANY', companyInfo.data());
        console.log('Company Set.');
      });
    } catch (err) {
      console.log(err);
    }
  },

  //====================================================
  //Update companyInfo from firebase collection home
  //====================================================
  updateCompanyInfo({ commit }, updateCompanyInfo) {
    db.collection('home')
      .doc(updateCompanyInfo.id)
      .update(updateCompanyInfo)
      .then(() => {
        commit('UPDATE_COMPANY', updateCompanyInfo); //update success status
        commit('SET_STATUS', STATUS.SUCCESS('Company Info Updated!')); // Not showing up (R)
      })
      .catch(err => {
        commit('SET_STATUS', STATUS.ERROR(err));
      });
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
