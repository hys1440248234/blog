<template>
  <router-view />
</template>

<script>

export default {
  name: 'App',
  created() {
    console.log(performance.getEntriesByType('navigation'))
    // 存入 mongo
  }
}
</script>

<style>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  body {
    font-size: 16px;
    background-color: #eee;
  }

  header {
    height: auto!important;
  }

  a {
    text-decoration: none !important;
  }
</style>
