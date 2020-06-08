<template>
  <div id="sign-up-activation">
    <div v-if="isSuccess">
      <h2>激活成功！</h2>
      <h3>{{time}}s 后跳转至<router-link :to="homePath">网站主页</router-link>...</h3>
    </div>
    <div v-if="!isLoading && !isSuccess">
      <h2>{{error}}</h2>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

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
    ...mapActions(['activeUser']),
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
    this.activeUser(this.$route.params.token)
      .then(() => {
        this.isLoading = false;
        this.isSuccess = true;
        this.countDown();
      })
      .catch((error) => {
        this.isLoading = false;
        this.isSuccess = false;
        this.error = error.message;
      });
  },
  destroyed() {
    clearInterval(this.interval);
  },
};
</script>

<style scoped>

</style>
