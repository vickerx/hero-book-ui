import { getStories } from '../common/network/api';
import { UPDATE_STORIES } from './mutation-types';

export default {
  getStories({ commit }, page, size = 20) {
    return getStories(page - 1, size)
      .then(
        ({ data }) => {
          const { totalPages, totalElements, number, content } = data;
          commit(UPDATE_STORIES, { totalPages, totalElements, currentPage: number + 1, content });
        },
      ).catch(() => commit(UPDATE_STORIES, {}));
  },
};
