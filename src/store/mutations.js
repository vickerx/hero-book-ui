import { UPDATE_STORIES } from './mutation-types';

export default {
  [UPDATE_STORIES](state, stories) {
    state.stories = stories;
  },
};
