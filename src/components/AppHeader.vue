<template>
  <header>
    <div class="nav-wrapper">
      <router-link class="logo" to="/"><span>HeroStories</span></router-link>
      <el-menu router :default-active="$route.path" mode="horizontal" class="app-nav">
        <el-menu-item class="nav-item" index="/stories">英雄事迹</el-menu-item>
      </el-menu>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
};
</script>

<style scoped lang="scss">
  @import "../common/styles/colors";
  @import "../common/styles/variables";

  header {
    text-align: left;
    padding: 0 250px;
    background-color: white;
    width: 100%;
    height: $header-height;
    position: fixed;
    top: 0;
    z-index: 999;
    box-shadow: 0 0 1px 1px #00000019;
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

</style>
