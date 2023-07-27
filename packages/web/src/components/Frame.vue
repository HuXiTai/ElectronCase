<template>
  <div
    ref="oFrame"
    class="frame-box"
  >
    <div class="title">
      <img :width="20" :src="props.logo" v-if="props.logo"/>
      <span class="text">{{ props.title }}</span>
    </div>
    
    <template
      v-for="item of props.frameList"
      :key="item.title"
    >
      <div
        v-if="item.isShow"
        :class="item.class"
        class="icon-box"
        :title="item.title"
        @click="item.call()"
      >
        <el-icon v-html="item.icon" />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
interface frameItemType {
  title: string,
  icon: string,
  isShow: boolean,
  class: string,
  call: ()=> void,
}

const props = defineProps<{
  title: string
  frameList: frameItemType[]
  logo: string
}>();
</script>

<style scoped lang="less">
.frame-box {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 30px;
  -webkit-app-region: drag;
  background-color: #dedfe0;

  .title {
    position: absolute;
    left: 20px;
    font-weight: bold;
    display: flex;
    align-items: center;

    img {
      margin-right: 5px;
    }
  }
}

.icon-box:hover {
  background-color: rgba(144 147 153 / 0.5);
}

.icon-box:active {
  background-color: #909399;
}

.close:hover {
  background-color: rgba(245 108 108/ 0.5);
}

.close:active {
  background-color: #f56c6c;
}

.icon-box {
  display: inline-block;
  align-items: center;
  width: 50px;
  height: 30px;
  font-size: 14px;
  color: #333;
  text-align: center;
  cursor: pointer;
  -webkit-app-region: no-drag;

  .el-icon {
    width: 100%;
    height: 100%;
  }
}
</style>
