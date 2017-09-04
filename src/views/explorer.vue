<template>
  <div class="explorer">
    <Explorer></Explorer>
  </div>
</template>

<script>
import Explorer from '@/components/Explorer/Explorer'
export default {
  components: { Explorer }
}
</script>

<style>
.explorer {
  width: 800px;
  margin: 10px auto;
  /* background: #fff; */
}
</style>
