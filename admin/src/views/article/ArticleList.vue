<template>
  <el-table
    :data="tableData"
    border
    stripe
    class="table"
  >
    <el-table-column
      :index="1"
      fixed="left"
      type="index"
      label="序号"
      align="center"
      width="60"
    />
    <el-table-column
      prop="create_time"
      label="发布日期"
      align="center"
    />
    <el-table-column
      prop="title"
      label="文章标题"
      align="center"
    />
    <el-table-column
      prop="like"
      label="喜欢"
      align="center"
    />
    <el-table-column
      prop="view"
      label="查看数量"
      align="center"
      width="100"
    />
    <el-table-column
      prop="tag"
      label="文章标签"
      align="center"
    >
      <template slot-scope="scope">
        <div slot="reference" class="name-wrapper">
          <el-tag size="medium">
            {{ scope.row.tag }}
          </el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      width="180"
      label="操作"
    >
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)"
        >
          Edit
        </el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
        >
          Delete
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { deleteArticle, getArticleList } from '@/api/article'
export default {

  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    getArticleList({
      limit: 10,
      offset: 0
    }).then(res => {
      this.tableData = this.formatDate(res.data)
    })
  },
  methods: {
    formatDate(value) {
      return value.filter(function(item) {
        item.create_time = new Date(item.create_time).toLocaleDateString()
        return item
      })
    },
    // 点击修改按钮跳转至对应的链接
    handleEdit(index, row) {
      this.$router.push({ name: 'updateArticle', params: { id: row.id }})
    },
    // 点击删除按钮跳删除对应的文章
    handleDelete(index, row) {
      deleteArticle({ 'id': row.id }).then(res => {
        this.$message({
          message: res.message ? res.message : '删除成功',
          type: res.code === 20000 ? 'success' : 'error'
        })
        if (res.data) { this.tableData.splice(index, 1) }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .table {
    width: 100%;
  }
</style>
