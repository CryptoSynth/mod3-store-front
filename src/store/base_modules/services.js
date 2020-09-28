import notifications from './service_modules/notifications';
import uploads from './service_modules/uploads';
import progress from './service_modules/progress';

const modules = {
  notifications,
  uploads,
  progress
};

export default {
  namespaced: true,
  modules
};
