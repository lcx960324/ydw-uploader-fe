<template>
  <div class="uploader">
    <Upload multiple type="drag" action="http://httppost.cn:8080/user/upload.do"
    :before-upload="handleUpload"
    name="file"
    with-credentials>
      <div style="padding: 20px 0">
        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
        <p>点击或将文件拖拽到这里上传</p>
      </div>
    </Upload>
  </div>
</template>

<script>
import { upload } from '@/APIs/explorer'
export default {
  created () {
    this.$route.query.path
  },
  methods: {
    handleUpload (file) {
      const loading = this.$Message.loading({
        content: '上传中，请稍候',
        duration: 0
      })
      this.$emit('uploading')
      upload(this.$route.query.path, file).then(res => {
        if (res.data.error === 1) throw new Error()
        else {
          this.$emit('uploaded', 'success')
          loading()
        }
      }).catch(err => {
        loading()
        this.$emit('uploaded', 'fail')
        console.log(err)
        this.$Message.error('上传失败')
      })
      return false
    }
  }
}
</script>

<style>

</style>
