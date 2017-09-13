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
      upload(this.$route.query.path, file).then(res => {
        console.log(res)
      })
      return false
    }
  }
}
</script>

<style>

</style>
