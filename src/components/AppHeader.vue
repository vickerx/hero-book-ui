<template>
  <header>
    <div id="app-header">
      <div class="nav-wrapper">
        <router-link class="logo" to="/"><span>HeroStories</span></router-link>
        <el-menu router :default-active="$route.path" mode="horizontal" class="app-nav">
          <el-menu-item class="nav-item" index="/stories">英雄事迹</el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="header-placeholder"></div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
};
</script>

<style scoped lang="scss">
  @import "../common/styles/colors";

  $header-height: 70px;

  header {
    width: 100%;
    text-align: left;
    background-color: white;
  }

  #app-header {
    height: $header-height;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 999;
    padding: 0 40px;
    box-shadow: 0 0 1px 1px #00000019;
    width: 100%;
    box-sizing: border-box;
  }

  .nav-wrapper {
    display: flex;
    align-items: center;
    height: 100%;

    .logo {
      color: $theme;
      display: inline-block;
      margin-right: 32px;
      font-size: 36px;
      font-weight: bold;
      text-decoration-line: none;
    }

    .app-nav {
      display: inline-block;
      border-bottom: none;

      .nav-item {
        height: 50px;
      }
    }
  }

  .header-placeholder {
    width: 100%;
    position: relative;
    height: $header-height;
  }

</style>
