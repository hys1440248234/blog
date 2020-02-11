<template>
  <el-container>
    <el-header>
      <my-nav />
    </el-header>
    <el-main>
      <router-view />
    </el-main>
    <my-footer />
  </el-container>
</template>

<script>
import MyNav from '@/components/MyNav.vue'
import MyFooter from '@/components/MyFooter.vue'

export default {
  name: 'Layout',
  components: {
    MyNav,
    MyFooter
  }
}
</script>
