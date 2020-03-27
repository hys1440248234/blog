<template>
  <article class="article">
    <div class="title">
      <h1>{{ article.title }}</h1>
    </div>
    <div class="info">
      <!-- <el-tag size="mini">
        {{ article.tag }}
      </el-tag> -->
      <time title="时间" class="time">
        <i class="el-icon-time" />&nbsp;{{ time(article.createTime) }}
      </time>
      <span class="view">{{ article.view }} PV</span>
      <span class="share">
        分享到：
        <a title="分享到微博" :href="shareWeibo()" target="_blank">
          <img src="../assets/weibo.svg" alt="weibo">
        </a>
        <a title="分享到推特" :href="shareTwitter()" target="_blank">
          <img src="../assets/twitter.svg" alt="twitter">
        </a>
        <a title="分享到QQ空间" :href="shareKJ()" target="_blank">
          <img src="../assets/kj.svg" alt="QQ空间">
        </a>
      </span>
    </div>

    <main v-hljs class="markdown-body" v-html="article.content" />

    <div class="gx">
      <a
        title="署名-非商业性使用-相同方式共享 4.0 国际 (CC BY-NC-SA 4.0)"
        target="_blank"
        href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh"
      >
        Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
      </a>
      <div>
        <span title="点赞" :class="{'toLike':toLike}" class="like" @click="like">
          ❤ {{ article.like }}
        </span>
        <span title="作者" class="author"><img src="../assets/author.svg" alt="author">Main、侯</span>
      </div>
    </div>
  </article>
</template>

<script>
import { articleLike } from '@/api/article'

export default {
  name: 'MyArticle',
  data() {
    return {
      article: {},
      toLike: 0
    }
  },
  mounted() {
    this.toTop()
  },
  created() {
    this.getDate()
  },
  methods: {
    // 获得文章信息
    getDate() {
      axios.get(`/api/article/${this.$route.params.id}`).then((response) => {
        if (response.data.code === 20000 && response.data.data) {
          this.article = response.data.data
          // 文章浏览量加一
          this.addView()
          // 是否喜欢过这篇文章
          this.isLike()
        } else {
          this.$message({
            type: 'error',
            message: '没有找到你要的内容'
          })
          this.$router.push('/404')
        }
      }).catch((e) => {
        this.$message({
          type: 'error',
          message: e.data.message ? e.data.message : '服务器错误'
        })
      })
    },
    // 时间戳转为本地时间
    time(createTime) {
      return new Date(createTime).toLocaleString()
    },
    // 分享到微博
    shareWeibo() {
      return `http://service.weibo.com/share/share.php?appkey=&title=${this.article.title}&url=https://mainhou.com${this.$route.path}&searchPic=false&style=simple`
    },
    // 分享到推特
    shareTwitter() {
      return `https://twitter.com/share?text=${this.article.title}&url=https://mainhou.com${this.$route.path}`
    },
    // 分享到空间
    shareKJ() {
      return `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=https://mainhou.com${this.$route.path}&title=${this.article.title}`
    },
    isLike() {
      const key = `${this.$route.params.id}like`.toString()
      if (localStorage.getItem(key)) {
        this.toLike += 1
      }
    },
    // 喜欢加一
    like() {
      // 将喜欢文章的 id 存储到 localStorage 中
      const key = `${this.$route.params.id}like`.toString()
      const isLike = localStorage.getItem(key)
      if (!isLike) {
        articleLike
        localStorage.setItem(key, this.$route.params.id)
        axios.get('/api/like', {
          params: {
            id: this.$route.params.id,
            like: this.article.like + 1
          }
        }).then((response) => {
          if (response.data.code !== 20000) {
            this.$message({
              type: 'error',
              message: '不能点赞'
            })
          } else {
            this.toLike = 1
            this.article.like += 1
          }
        }).catch((e) => {
          this.$message({
            type: 'error',
            message: e.data.message ? e.data.message : '服务器错误'
          })
        })
      }
    },
    // 到顶部
    toTop() {
      document.body.scrollTop = document.documentElement.scrollTop = 0
    },
    // 浏览量加一
    addView() {
      axios.get('/api/view', {
        params: {
          id: this.$route.params.id,
          view: this.article.view + 1
        }
      }).then((response) => {
        if (response.data.code === 20000) {
          this.article.view += 1
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .article {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 650px;
    min-height: 800px;
    margin: 0 auto;

    section, main {
      width: 100%;
    }

    #lv-container {
      width: 100%;
    }

    .title h1 {
      font-size: 40px;
    }

    .info {
      margin: 10px 0;
      font-size: 14px;
      color: #8c8c8c;

      span,
      time {
        margin-right: 30px;
      }
    }

    .share a {
      padding: 10px;
    }

    .gx {
      margin: 16px 0;
      width: 100%;
      border-top: 1px dashed #ddd;
      border-bottom: 1px dashed #ddd;
      text-align: center;
      color: #b3b3b3;
      font-size: 12px;

      a {
        display: block;
        color: #b3b3b3;
        transition: color 100ms linear;
        padding: 20px;
        margin-bottom: 8px;

        &:hover {
          color: #304156;
        }
      }

      span {
        margin: 10px;
      }

      .like {
        font-size: 16px;
        cursor: pointer;
      }
    }

    .toLike {
      font-size: 16px;
      color: red;
    }
  }
</style>
