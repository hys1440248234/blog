<template>
  <nav>
    <el-menu
      class="el-menu-demo"
      :default-active="activeIndex"
      mode="horizontal"
      router
    >
      <el-menu-item class="logo">
        <img src="@/assets/logo.png" alt="log">
        Main丶hou blog
      </el-menu-item>
      <el-menu-item index="1" route="/">
        home
      </el-menu-item>
      <el-menu-item index="2" route="/about">
        about
      </el-menu-item>
    </el-menu>
  </nav>
</template>

<script>
export default {
  name: 'MyNav',
  data() {
    return {
      activeIndex: ''
    }
  },
  mounted() {
    this.isRouter()
  },
  methods: {
    // 路由判断
    isRouter() {
      if (this.$route.path === '/') {
        this.activeIndex = '1'
      }
      if (this.$route.path === '/about') {
        this.activeIndex = '2'
      }
    }
  }
}
</script>

<style lang="scss" scoped>

  .el-menu {
    &.el-menu--horizontal {
      border-bottom: none;
    }
    background-color: transparent;
  }

  .el-menu-item:focus,
  .el-menu-item:hover {
    background-color: transparent!important;
  }

  @media all and (max-width: 460px){
    .el-menu li {
      display: block;
      width: 100%;
    }
  }
</style>
