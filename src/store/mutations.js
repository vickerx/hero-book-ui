import {
  UPDATE_STORIES,
  CLEAR_STORIES,
} from './mutation-types';

export default {
  [UPDATE_STORIES](state, stories) {
    state.stories = { ...state.stories, ...stories };
  },
  [CLEAR_STORIES](state) {
    state.stories = {};
  },
};
