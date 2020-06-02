import { getStories } from '../common/network/api';
import {
  UPDATE_STORIES,
  CLEAR_STORIES,
} from './mutation-types';

export default {
  getStories({ commit }, page = 1, size = 5) {
    commit(UPDATE_STORIES, { loading: true, error: '' });

    return getStories(page - 1, size)
      .then(
        ({ data }) => {
          const { totalPages, totalElements, number, content } = data;
          commit(UPDATE_STORIES,
            { totalPages, totalElements, currentPage: number + 1, content, loading: false });
        },
      ).catch(() => {
        commit(CLEAR_STORIES);
        commit(UPDATE_STORIES, { error: '获取数据失败，请稍后重试！', loading: false });
      });
  },
};
