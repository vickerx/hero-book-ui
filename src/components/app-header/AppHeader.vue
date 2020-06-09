<template>
  <header>
    <div id="app-header">
      <div class="content">
        <router-link class="logo vertical-center" to="/">
          <img src="../../assets/logo.png">
          <span>HeroStories</span>
        </router-link>
        <el-menu class="app-nav vertical-center"
                 router :default-active="$route.path" mode="horizontal">
          <el-menu-item class="nav-item" index="/stories/page/1">英雄事迹</el-menu-item>
        </el-menu>
        <div class="btn-wrapper vertical-center" v-if="true">
          <sign-in-modal title="登录">登录</sign-in-modal>
          <SignUpModal class="sign-up-form"/>
        </div>
      </div>
    </div>
    <div class="header-placeholder"></div>
  </header>
</template>

<script>
import SignUpModal from './SignUpModal';
import SignInModal from './SignInModal';

export default {
  name: 'AppHeader',
  components: { SignUpModal, SignInModal },
};
</script>

<style scoped lang="scss">
  @import "../../common/styles/colors";
  @import "../../common/styles/dimens";

  $header-height: 70px;

  header {
    width: 100%;
    text-align: left;
  }

  #app-header {
    height: $header-height;
    position: fixed;
    top: 0;
    right: 0;
    z-index: $header-z-index;
    box-shadow: 0 0 1px 1px $shadow;
    width: 100%;
    background-color: white;
  }

  .content {
    height: 100%;
    margin: 0 8%;

    .logo {
      color: $theme;
      margin-right: $basic-margin * 2;
      font-size: 36px;
      font-weight: bold;
      text-decoration-line: none;
      float: left;

      img {
        height: $header-height - 5px;
        margin-right: $basic-margin / 2;
      }
    }

    .app-nav {
      border-bottom: none;
      margin-right: $basic-margin * 2;

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

  .sign-up-form {
    margin-left: $basic-margin;
  }

</style>
