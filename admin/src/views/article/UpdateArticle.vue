<template>
  <blog-article :is-create-or-update="false"/>
</template>
<script>
import BlogArticle from '@/components/BlogArticle/index.vue'
export default {
  name: 'UpdateArticle',
  components: {
    BlogArticle
  }
}
</script>
