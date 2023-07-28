<template>
  <Frame
    :logo="record"
    title="积分记录"
    :frame-list="frameList"
  />
  1123
</template>

<script setup lang="ts">
import Frame from "../../components/Frame.vue";
import record from "../../assets/img/record.png"
import { reactive } from "vue";

const frameList = reactive([
  {
    title: "最小化",
    icon: "<svg class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" p-id=\"2058\"><path d=\"M929.8 528.1H93.5c-15.5 0-28-12.5-28-28s12.5-28 28-28h836.3c15.5 0 28 12.5 28 28s-12.5 28-28 28z\" fill=\"\" p-id=\"2059\"/></svg>",
    isShow: true,
    class: "minimize",
    call () {
      window.ipcRenderer.send("win-operate",{win: "ChildWin", operate: "minimize"})},
  },
  {
    title: "关闭",
    icon: "<svg class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" p-id=\"2520\"><path d=\"M96.6 915c-10.9-10.9-10.9-28.7 0-39.6L887 85c10.9-10.9 28.7-10.9 39.6 0 10.9 10.9 10.9 28.7 0 39.6L136.2 915c-10.9 10.9-28.6 10.9-39.6 0z\" fill=\"\" p-id=\"2521\"/><path d=\"M887 915L96.6 124.6c-10.9-10.9-10.9-28.7 0-39.6 10.9-10.9 28.7-10.9 39.6 0l790.4 790.4c10.9 10.9 10.9 28.7 0 39.6-10.9 10.9-28.6 10.9-39.6 0z\" fill=\"\" p-id=\"2522\"/></svg>",
    isShow: true,
    class: "close",
    call () {
      window.ipcRenderer.send("win-operate",{win: "ChildWin", operate: "quit"})
    },
  },
]) ;
</script>

<style scoped lang="less">
</style>
