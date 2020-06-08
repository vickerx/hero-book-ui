import * as _ from 'lodash';
import { getStories, registerUser, activeUser } from '../common/network/api';
import {
  UPDATE_STORIES,
  CLEAR_STORIES,
  UPDATE_SIGN_UP_NETWORK,
} from './mutation-types';
import { ERROR_CODE, ERROR_MASSAGE } from '../common/network/errors';

const getErrorCode = (networkError) => _.get(networkError.response, 'data.error_code');

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
        const errorCode = getErrorCode(error);
        const { DUPLICATE_EMAIL } = ERROR_CODE;
        const isDuplicateEmail = errorCode === DUPLICATE_EMAIL.code;
        const message = isDuplicateEmail ? DUPLICATE_EMAIL.massage : ERROR_MASSAGE.SYSTEM_ERROR;
        commit(UPDATE_SIGN_UP_NETWORK, { isSuccess: false, message, isDuplicateEmail });
        throw new Error();
      });
  },
  activeUser(context, code) {
    return activeUser(code)
      .catch((error) => {
        const errorCode = getErrorCode(error);
        const pickedError = _.find(_.values(ERROR_CODE), (value) => value.code === errorCode);
        throw new Error(_.get(pickedError, 'message', ERROR_MASSAGE.SYSTEM_ERROR));
      });
  },
};
