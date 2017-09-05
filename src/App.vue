<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@bg-start: #0066FF;
@bg-end: #6699CC;
html {
  min-height: 100%;
}
body {
  min-height: 100%;
  background: linear-gradient(to bottom, @bg-start, @bg-end);
  padding-top: 1px;
}
</style>
