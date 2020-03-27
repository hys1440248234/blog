<template>
  <el-row class="components-container">
    <el-row :gutter="10">
      <el-form
        :model="form"
        :rules="rules"
        name="form"
        class="article-form"
        size="mini"
        label-width="90px"
      >
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="form.title" name="title" placeholder="文章标题" />
        </el-form-item>

        <el-form-item label="文章内容" class="hidden">
          <el-input v-model="form.contentText" name="content" type="textarea" placeholder="文章内容" />
        </el-form-item>

        <el-form-item label="文章概述" prop="summary">
          <el-input v-model="form.summary" name="summary" type="textarea" placeholder="文章概述" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submit">
            更新文章
          </el-button>
        </el-form-item>
      </el-form>
    </el-row>

    <mavon-editor ref="md" v-model="contentText" class="editor" @change="getHtml" @imgAdd="imgAdd" @imgDel="imgDel" />
  </el-row>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { getOneArticle, createArticle, updateArticle, upload } from '@/api/article'

export default {
  name: 'Article',
  components: {
    'mavon-editor': mavonEditor
  },
  props: {
    isCreateOrUpdate: { // 为ture是创建页面，false是更新页面
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      img_file: {}, // 图片文件
      contentText: '', // 文章内容临时存储
      inputVisible: false, // input 是否可见
      inputValue: '',
      form: {
        content: '', // 文章内容
        summary: '', // 文章概述
        title: '', // 文章标题
        contentText: '', // 文章内容 纯文本
        imageUrl: ''
      },
      rules: {
        title: {
          type: 'string',
          required: true,
          message: '文章标题是必须的',
          trigger: 'blur'
        },
        summary: {
          required: true,
          message: '文章概述是必须的',
          trigger: 'blur'
        }
      }
    }
  },
  mounted() {
    if (this.isCreateOrUpdate === false) {
      getOneArticle(this.$route.params.id).then(res => {
        this.form = res.data
        this.content_text = this.form.contentText
      })
    }
  },
  methods: {
    // 获得编辑器里的内容
    getHtml(val, render) {
      this.form.content = render
      this.form.contentText = val
    },
    // 添加图片
    imgAdd(pos, $file) {
      // 缓存图片信息
      this.img_file[pos] = $file
    },
    // 删除图片
    imgDel(pos) {
      delete this.img_file[pos]
    },
    // 提交文章
    submit() {
      // 如果是更新页面则更新否则创建
      if (this.isCreateOrUpdate === true) {
        createArticle(this.form).then(res => {
          this.$message({
            message: res.message ? res.message : '发布文章成功',
            type: res.code === 20000 ? 'success' : 'error'
          })
        })
      } else {
        updateArticle(this.form).then(res => {
          this.$message({
            message: res.message ? res.message : '更新文章成功',
            type: res.code === 20000 ? 'success' : 'error'
          })
        })
      }
    },
    // 首图删除
    handleRemove(file, fileList) {
      this.img_file[0] = null
    },
    // 改变
    handleChange(file) {
      this.img_file[0] = file.raw
      console.log(this.img_file)
      this.form.image_url = file.url

      // 第一步.将图片上传到服务器.
      var formdata = new FormData()
      for (var _img in this.img_file) {
        formdata.append(_img, this.img_file[_img])
      }
      upload({
        url: '/upload',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(res => {
        /**
         * 例如：返回数据为 res = [[pos, url], [pos, url]...]
         * pos 为原图片标志（0）
         * url 为上传后图片的url地址
         */
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)files
        res.files.forEach((item, index) => {
          this.$refs.md.$img2Url(index + 1, item)
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.editor {
  margin: auto;
  height: 600px;
}
.hidden {
  display: none;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
