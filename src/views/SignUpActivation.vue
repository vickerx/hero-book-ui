<template>
  <div id="sign-up-activation">
    <div v-if="isSuccess">
      <h2>激活成功！</h2>
      <h3>{{time}}s 后跳转至<router-link :to="homePath">网站主页</router-link>...</h3>
    </div>
    <div v-if="!isSuccess">
      <h2>{{error}}</h2>
    </div>
  </div>
</template>

<script>
import * as _ from 'lodash';
import { activeUser } from '../common/network/api';
import { ERROR_CODE, ERROR_MESSAGE } from '../common/network/errors';

export default {
  name: 'SignUpActivation',
  data() {
    return {
      time: 5,
      interval: null,
      homePath: '/',
      isLoading: true,
      isSuccess: false,
      error: '',
    };
  },
  methods: {
    activeUser() {
      activeUser(this.$route.params.token)
        .then(() => {
          this.isSuccess = true;
          this.countDown();
        })
        .catch(({ response }) => {
          const errorCode = _.get(response, 'data.error_code');
          this.error = _.find(_.values(ERROR_CODE), (value) => value.code === errorCode).message
            || ERROR_MESSAGE.SYSTEM_ERROR;
          this.isSuccess = false;
        });
    },
    countDown() {
      this.interval = setInterval(() => {
        this.time -= 1;
        if (this.time === 0) {
          this.$router.push({ path: this.homePath });
          clearInterval(this.interval);
        }
      }, 1000);
    },
  },
  created() {
    this.activeUser();
  },
  destroyed() {
    clearInterval(this.interval);
  },
};
</script>

<style scoped>

</style>
