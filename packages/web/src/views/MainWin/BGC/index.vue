<template>
  <div class="main-win-bgc">
    <img :width="50" :src="icon"/>
  </div>
</template>

<script setup lang="ts">
import icon from "../../../assets/img/icon.png"
</script>

<style scoped lang="less">
.main-win-bgc{
  width: 100%;
  height: 100%;
}
</style>
