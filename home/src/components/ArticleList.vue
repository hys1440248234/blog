<template>
  <div>
    <el-row
      v-for="(item, index) in articles"
      :key="index"
      type="flex"
      justify="center"
    >
      <el-col :xs="22" :sm="20" :md="17" :lg="15">
        <el-card class="card" shadow="hover" body-style="padding:0;">
          <el-col :span="12" :xs="24" :class="index%2==0? 'fl':'fr'">
            <router-link :to="toString(item.id)">
              <figure class="img-box">
                <img v-lazy="item.image_url" class="image">
              </figure>
            </router-link>
          </el-col>
          <el-col :span="12" :xs="24" class="article-message">
            <div>
              <time class="time">{{ dateToLocal(item.create_time) }}</time>
            </div>
            <h1>
              <router-link :to="toString(item.id)">
                {{ item.title }}
              </router-link>
            </h1>
            <div class="summary">
              {{ item.summary }}
            </div>
            <div class="info">
              <span><i class="el-icon-star-off">{{ item.view }} pv</i></span>
              <span><i class="el-icon-star-off">{{ item.like }} like</i></span>
              <span><i class="el-icon-star-off">{{ item.tag }}</i></span>
            </div>
          </el-col>
          <div class="clearfix" :class="index%2==0?'article-all-l':'article-all-r'">
            <router-link :to="toString(item.id)">
              <i class="el-icon-more" />
            </router-link>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-pagination
        :current-page="currentPage4"
        :page-size="limit"
        :total="count"
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
      />
    </el-row>
  </div>
</template>

<script>

import { getArticleList, articleCount } from '@/api/article'
export default {
  name: 'List',
  data() {
    return {
      articles: [],
      limit: 5,
      count: 0
    }
  },
  created() {
    this.getData(0)
  },
  methods: {
    getData(offset) {
      getArticleList({
        limit: this.limit,
        offset
      }).then(res => {
        this.articles = this.formatDate(res.data)
      })
      articleCount().then(res => {
        this.count = res.data
      })
    },
    formatDate(value) {
      return value.filter(function(item) {
        item.create_time = new Date(item.create_time).toLocaleDateString()
        return item
      })
    },
    toString(id) {
      return `/article/${id}`
    },
    dateToLocal(time) {
      return new Date(time).toLocaleString()
    },
    handleCurrentChange(val) {
      this.getData((val - 1) * this.limit)
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../styles/index.scss';
  .card {
    position: relative;
    margin-top: 36px;

    .img-box {
      width: 100%;
      height: 220px;
      overflow: hidden;
      margin: 0;

      .image {
        width: 100%;
        display: block;
        height: 220px;
        transition: all 500ms linear;

        &:hover {
          transform: scale(1.1);
          transition: all 500ms linear;
        }
      }
    }

    .article-message {
      font-size: 32px;
      padding: 6px 0  0 15px;

      h1 {
        font-size: 18px;
        line-height: 1.3;
        margin-bottom: 10px;

        a {
          color: #222222;
          text-decoration: none;

          &:active,
          &:hover {
            color: #337ab7 !important;
          }
        }
      }

      .time {
        font-size: 13px;
        color: #999;
      }

      .summary {
        height: 48px;
        padding-top: 5px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 24px;
        font-size: 14px;
        font-weight: 400;
      }

      .info span {
        padding-right: 5px;
        font-size: 10px;
        color: #A3A5A8;
      }
    }

    .article-all-r {
      position: absolute;
      right: 10px;
      bottom: 10px;
    }

    .article-all-l {
      position: absolute;
      left: 10px;
      bottom: 10px;
    }

    .article-all a {
      padding: 30px;
    }
  }

  .skeleton {
    background-color: #fff;
  }
</style>
