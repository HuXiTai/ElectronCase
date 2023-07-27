<template>
  <el-menu
    active-text-color="#337ecc"
    background-color="#dedfe0"
    text-color="#000"
    @select="select"
  >
    <el-menu-item v-for="(menuItem, index) of props.menuList" :key="menuItem.title" :index="index + ''">
        <el-icon v-if="menuItem.icon">
          <component :is="menuItem.icon" />
        </el-icon>
        <span v-if="menuItem.title">{{ menuItem.title }}</span>
    </el-menu-item>
  </el-menu>
 
</template>

<script lang="ts" setup>
import { DefineComponent } from 'vue';

interface MenuListType {
  title: string,
  icon: DefineComponent,
  isShow: boolean,
  route: string,
  children?: MenuListType[],
  call: (route: string) => void
}

const props = defineProps<{
  menuList: MenuListType[]
}>();

function select(index: number){
  console.log(index);
  
  props.menuList[index].call(props.menuList[index].route)
}
</script>

<style>
.el-menu{
  border-right: 0;
  height: 100%;
}
</style>
