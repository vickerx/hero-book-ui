import { getStories, registerUser } from '../common/network/api';
import {
  UPDATE_STORIES,
  CLEAR_STORIES,
  UPDATE_SIGN_UP_NETWORK,
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
  registerUser({ commit }, userInfo) {
    return registerUser(userInfo)
      .then(() => commit(UPDATE_SIGN_UP_NETWORK, { isSuccess: true, message: '注册成功，请前往注册邮箱激活帐户' }))
      .catch(() => commit(UPDATE_SIGN_UP_NETWORK, { isSuccess: false, message: '' }));
  },
};
