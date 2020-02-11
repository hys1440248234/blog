<template>
  <blog-article :is-create-or-update="true"/>
</template>
<script>
import BlogArticle from '@/components/BlogArticle/index.vue'
export default {
  name: 'AddArticle',
  components: {
    BlogArticle
  }
}
</script>
