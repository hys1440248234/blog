<template>
  <div>
    <el-table :data="tableData" border stripe class="table">
      <el-table-column prop="id" fixed="left" label="序号" align="center" width="60" />
      <el-table-column prop="createTime" label="发布日期" align="center" />
      <el-table-column prop="title" label="文章标题" align="center" />
      <el-table-column prop="like" label="喜欢" align="center" />
      <el-table-column prop="view" label="查看数量" align="center" width="100" />
      <el-table-column prop="tag" label="文章标签" align="center">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.tag }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" width="180" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="currentPage4"
      :page-size="limit"
      :total="count"
      background
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { deleteArticle, getArticleList, articleCount } from '@/api/article'
export default {
  name: 'ArticleList',
  data() {
    return {
      tableData: [],
      limit: 8,
      count: 0
    }
  },
  mounted() {
    this.getData(0)
    articleCount().then(res => {
      this.count = res.data
    })
  },
  methods: {
    getData(offset) {
      getArticleList({
        limit: this.limit,
        offset
      }).then(res => {
        this.tableData = this.formatDate(res.data)
      })
    },
    formatDate(value) {
      return value.filter(function(item) {
        item.createTime = new Date(item.createTime).toLocaleDateString()
        return item
      })
    },
    // 点击修改按钮跳转至对应的链接
    handleEdit(index, row) {
      this.$router.push({ name: 'updateArticle', params: { id: row.id }})
    },
    // 点击删除按钮跳删除对应的文章
    handleDelete(index, row) {
      deleteArticle({ id: row.id }).then(res => {
        if (res.code === 20000) {
          this.tableData.splice(index, 1)
        }
      })
    },
    handleCurrentChange(val) {
      this.getData((val - 1) * this.limit)
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
}
</style>
