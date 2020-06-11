import {
  UPDATE_STORIES,
  CLEAR_STORIES,
} from './mutation-types';


export class User {
  id;

  email;

  username;

  constructor(id, email, username) {
    Object.assign(this, { id, email, username });
  }

  static from(obj) {
    const cUser = new User();
    return Object.keys(cUser).reduce((u, key) => {
      u[key] = obj[key];
      return u;
    }, cUser);
  }
}

export default {
  [UPDATE_STORIES](state, stories) {
    state.stories = { ...state.stories, ...stories };
  },
  [CLEAR_STORIES](state) {
    state.stories = {};
  },
  updateUserInfo(state, userInfo) {
    if (userInfo != null) {
      state.userInfo = User.from(userInfo);
    } else {
      state.userInfo = null;
    }
  },
};
