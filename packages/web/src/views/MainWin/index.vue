<template>
  <div class="main-win-box">
    <Frame
      :logo="icon"
      title="Hello World"
      :frame-list="frameList"
    />

    <el-row class="tac">
      <el-col :span="5">
        <Menu :menu-list="menuList"/>
      </el-col>

      <el-col :span="19">
        <router-view />
      </el-col>
    </el-row>
  </div>

</template>

<script setup lang="ts">
import Menu from "../../components/Menu.vue";
import Frame from "../../components/Frame.vue";
import icon from "../../assets/img/icon.png"
import { DefineComponent, markRaw, reactive } from "vue";
import router from "../../router";
import { Eleme, Calendar, Discount} from '@element-plus/icons-vue'

const frameList = reactive([
  {
    title: "最小化",
    icon: "<svg class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" p-id=\"2058\"><path d=\"M929.8 528.1H93.5c-15.5 0-28-12.5-28-28s12.5-28 28-28h836.3c15.5 0 28 12.5 28 28s-12.5 28-28 28z\" fill=\"\" p-id=\"2059\"/></svg>",
    isShow: true,
    class: "minimize",
    call () {
      window.ipcRenderer.send("win-operate",{win: "MainWin", operate: "minimize"})},
  },
  {
    title: "最大化",
    icon: "<svg class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" p-id=\"2212\"><path d=\"M812.3 959.4H213.7c-81.6 0-148-66.4-148-148V212.9c0-81.6 66.4-148 148-148h598.5c81.6 0 148 66.4 148 148v598.5C960.3 893 893.9 959.4 812.3 959.4zM213.7 120.9c-50.7 0-92 41.3-92 92v598.5c0 50.7 41.3 92 92 92h598.5c50.7 0 92-41.3 92-92V212.9c0-50.7-41.3-92-92-92H213.7z\" fill=\"\" p-id=\"2213\"/></svg>",
    isShow: true,
    class: "maximize",
    call () {
      window.ipcRenderer.send("win-operate",{win: "MainWin", operate: "maximize"})
    },
  },
  {
    title: "缩小",
    icon: "<svg class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" p-id=\"2366\"><path d=\"M812.2 65H351.6c-78.3 0-142.5 61.1-147.7 138.1-77 5.1-138.1 69.4-138.1 147.7v460.6c0 81.6 66.4 148 148 148h460.6c78.3 0 142.5-61.1 147.7-138.1 77-5.1 138.1-69.4 138.1-147.7V213c0-81.6-66.4-148-148-148z m-45.8 746.3c0 50.7-41.3 92-92 92H213.8c-50.7 0-92-41.3-92-92V350.7c0-50.7 41.3-92 92-92h460.6c50.7 0 92 41.3 92 92v460.6z m137.8-137.7c0 47.3-35.8 86.3-81.8 91.4V350.7c0-81.6-66.4-148-148-148H260.2c5.1-45.9 44.2-81.8 91.4-81.8h460.6c50.7 0 92 41.3 92 92v460.7z\" fill=\"\" p-id=\"2367\"/></svg>",
    isShow: false,
    class: "",
    call () {
      window.ipcRenderer.send("win-operate",{win: "MainWin", operate: "maximize"})
    },
  },
  {
    title: "关闭",
    icon: "<svg class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" p-id=\"2520\"><path d=\"M96.6 915c-10.9-10.9-10.9-28.7 0-39.6L887 85c10.9-10.9 28.7-10.9 39.6 0 10.9 10.9 10.9 28.7 0 39.6L136.2 915c-10.9 10.9-28.6 10.9-39.6 0z\" fill=\"\" p-id=\"2521\"/><path d=\"M887 915L96.6 124.6c-10.9-10.9-10.9-28.7 0-39.6 10.9-10.9 28.7-10.9 39.6 0l790.4 790.4c10.9 10.9 10.9 28.7 0 39.6-10.9 10.9-28.6 10.9-39.6 0z\" fill=\"\" p-id=\"2522\"/></svg>",
    isShow: true,
    class: "close",
    call () {
      window.ipcRenderer.send("win-operate",{win: "MainWin", operate: "quit"})
    },
  },
]) ;

interface MenuListType {
  title: string,
  icon: DefineComponent,
  isShow: boolean,
  route: string,
  children?: MenuListType[],
  call: (route: string) => void
}

const menuList = reactive<MenuListType[]>([
  {
    title: "打开子窗口",
    icon: markRaw(Eleme),
    isShow: true,
    route: "/main-win/open-main-win",
    call(route) {
      router.push(route)
    }
  },
  {
    title: "用户管理",
    icon: markRaw(Calendar),
    isShow: true,
    route: "/main-win/user-manage",
    call(route) {
      router.push(route)
    }
  },
  {
    title: "标题3",
    icon: markRaw(Discount),
    isShow: true,
    route: "",
    call(route) {
      router.push(route)
    }
  }
])

// 主窗口放大缩小
window.on.maximize(() => {
  frameList[1].isShow = false
  frameList[2].isShow = true
});

// 主窗口最小化
window.on.unmaximize(() => {
  frameList[1].isShow = true
  frameList[2].isShow = false
});
</script>

<style scoped lang="less">
.main-win-box{
  height: 100%;
  display: flex;
  flex-direction: column;
    .tac{
      flex: 1;
    }
}
</style>
