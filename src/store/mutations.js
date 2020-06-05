import {
  UPDATE_STORIES,
  CLEAR_STORIES,
  UPDATE_SIGN_UP_NETWORK,
  RESET_SIGN_UP_NETWORK,
} from './mutation-types';

export default {
  [UPDATE_STORIES](state, stories) {
    state.stories = { ...state.stories, ...stories };
  },
  [CLEAR_STORIES](state) {
    state.stories = {};
  },
  [UPDATE_SIGN_UP_NETWORK](state, payload) {
    state.signUpNetwork = { ...state.signUpNetwork, ...payload };
  },
  [RESET_SIGN_UP_NETWORK](state) {
    state.signUpNetwork = { isSuccess: false, message: '' };
  },
};
