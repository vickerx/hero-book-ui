import * as _ from 'lodash';
import { getStories, registerUser } from '../common/network/api';
import {
  UPDATE_STORIES,
  CLEAR_STORIES,
  UPDATE_SIGN_UP_NETWORK,
} from './mutation-types';
import { ERROR_CODE, ERROR_MASSAGE } from '../common/network/errors';

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
        commit(UPDATE_STORIES, { error: ERROR_MASSAGE.SYSTEM_ERROR, loading: false });
      });
  },
  registerUser({ commit }, userInfo) {
    const { username, password, email } = userInfo;
    return registerUser({ username: username.trim(), password, email })
      .then(() => commit(UPDATE_SIGN_UP_NETWORK, { isSuccess: true, message: '注册成功，请前往注册邮箱激活帐户' }))
      .catch((error) => {
        const errorCode = _.get(error.response, 'data.error_code');
        const message = errorCode === ERROR_CODE.DUPLICATE_EMAIL.code
          ? ERROR_CODE.DUPLICATE_EMAIL.massage
          : ERROR_MASSAGE.SYSTEM_ERROR;
        commit(UPDATE_SIGN_UP_NETWORK, { isSuccess: false, message });
        throw new Error();
      });
  },
};
