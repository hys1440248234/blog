<template>
  <el-footer class="footer">
    <el-row type="flex" class="row-bg" justify="center">
      <div class="copyright">
        Copyright &copy; 2019 Main、侯
        <a href="http://www.hustwenhua.net/" target="_blank">WenHua College</a> Student All rights reserved.
        皖ICP备19003601号
      </div>
    </el-row>
  </el-footer>
</template>

<script>
export default {
  name: 'MyFooter'
}
</script>

<style lang="scss" scoped>
  .footer {
    width: 100%;
    text-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
    font-size: 12px;
    line-height: 2;
    color: #6c7378;

    a {
      color: #6c7378;

      &:hover {
        color: #304156;
      }
    }
  }
</style>
