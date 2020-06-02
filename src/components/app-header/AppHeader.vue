<template>
  <header>
    <div id="app-header">
      <div class="content">
        <router-link class="logo vertical-center" to="/"><span>HeroStories</span></router-link>
        <el-menu class="app-nav vertical-center"
                 router :default-active="$route.path" mode="horizontal">
          <el-menu-item class="nav-item" index="/stories">英雄事迹</el-menu-item>
        </el-menu>
        <div class="btn-wrapper vertical-center" v-if="true">
          <el-button class="login-btn" round type="primary">登陆</el-button>
          <SignUpModal class="sign-up-form"/>
        </div>
      </div>
    </div>
    <div class="header-placeholder"></div>
  </header>
</template>

<script>
import SignUpModal from './SignUpModal';

export default {
  name: 'AppHeader',
  components: { SignUpModal },
};
</script>

<style scoped lang="scss">
  @import "../../common/styles/colors";

  $header-height: 70px;
  $margin: 32px;

  header {
    width: 100%;
    text-align: left;
  }

  #app-header {
    height: $header-height;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 99999;
    box-shadow: 0 0 1px 1px $shadow;
    width: 100%;
    background-color: white;
  }

  .content {
    height: 100%;
    margin: 0 8%;

    .logo {
      color: $theme;
      margin-right: $margin;
      font-size: 36px;
      font-weight: bold;
      text-decoration-line: none;
      float: left;
    }

    .app-nav {
      border-bottom: none;
      margin-right: $margin;

      .nav-item {
        height: 50px;
      }
    }

    .btn-wrapper {
      float: right;
    }
  }

  .header-placeholder {
    width: 100%;
    position: relative;
    height: $header-height;
  }

  .vertical-center {
    height: 100%;
    display: inline-flex;
    align-items: center;
  }

  .login-btn {
    margin-right: 16px;
  }

</style>