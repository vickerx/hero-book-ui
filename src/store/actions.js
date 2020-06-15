import { getStories } from '../common/network/api';
import {
  UPDATE_STORIES,
  CLEAR_STORIES,
} from './mutation-types';
import { ERROR_MESSAGE } from '../common/network/errors';

export default {
  getStories({ commit }, page = 1, size = 5) {
    return getStories(page - 1, size)
      .then(({ data }) => {
        const { totalPages, totalElements, number, content } = data;
        commit(UPDATE_STORIES, { totalPages, totalElements, currentPage: number + 1, content });
      }).catch(() => {
        commit(CLEAR_STORIES);
        throw ERROR_MESSAGE.SYSTEM_ERROR;
      });
  },
  updateUserInfo({ commit }, userInfo) {
    commit('updateUserInfo', userInfo);
  },
};
