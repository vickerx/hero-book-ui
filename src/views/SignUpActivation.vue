<template>
  <div id="sign-up-activation">
    <h2>激活成功！</h2>
    <h3>{{time}}s 后跳转至<router-link :to="homePath">网站主页</router-link>...</h3>
  </div>
</template>

<script>
export default {
  name: 'SignUpActivation',
  data() {
    return {
      time: 5,
      interval: null,
      homePath: '/',
    };
  },
  methods: {
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
  mounted() {
    this.countDown();
  },
  destroyed() {
    clearInterval(this.interval);
  },
};
</script>

<style scoped>

</style>
