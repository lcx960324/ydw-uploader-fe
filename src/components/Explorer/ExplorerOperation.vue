<template>
  <ButtonGroup>
    <Button type="ghost" class="download-link-btn" :disabled="data.type !== 'file'" :data-clipboard-text="`http://httppost.cn:8080${data.linked}`">复制链接</Button>
    <Button type="ghost" @click="del">删除</Button>
  </ButtonGroup>
</template>

<script>
export default {
  props: ['data'],
  methods: {
    del () {
      this.$emit('delete', this.data.name)
    }
  }
}
</script>

<style>

</style>
