<template>
  <el-table :data="filterTableData" style="width: 100%">
    <el-table-column label="创建日期" sortable  width="110">
      <template #default="scope">
        {{ getDate(scope.row.date) }}
      </template>
    </el-table-column>


    <el-table-column label="昵称" prop="name" />

    <el-table-column label="邀请码" prop="inviter"  width="100"/>

    <el-table-column label="剩余天数">
      <template #default="scope">
        {{ scope.row.residueDays + "天" }}
      </template>
    </el-table-column>

    <el-table-column label="今日状态">
      <template #default="scope">
        <el-tag class="ml-2" type="success" v-if="scope.row.nowState">已完成</el-tag>
        <el-tag class="ml-2" type="danger" v-else>未完成</el-tag>
      </template>
    </el-table-column>

    <el-table-column align="right" fixed="right"  width="220">
      <template #header>
        <el-input v-model="search" placeholder="搜索用户" />
      </template>
      <template #default="scope">
        <el-button size="small" type="primary" @click="showRecord">查看记录</el-button>

        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

        <el-popconfirm :title="`你确定要移除${scope.row.name}？`" confirm-button-text="确定" cancel-button-text="取消">
          <template #reference>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >移除</el-button
            >
          </template>
        </el-popconfirm>
        
      </template>
    </el-table-column>
  </el-table>

  <!-- 编辑用户和添加用户的dialog -->
  <el-dialog
    v-model="isShowDialog"
    title="编辑用户"
    width="350px"
    class="change-group-set"
    draggable
    :modal="false"
    append-to-body
  >
    <EditUser :user-item="userItem"/>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import EditUser from "./components/editUser.vue"

interface User {
  date: number
  name: string
  address: string
  nowState: boolean
  inviter: number
  residueDays: number
}

const search = ref('')
const isShowDialog = ref(false)
const userItem = ref<User>({
  date:0,
  name:"",
  address:"",
  nowState:false,
  inviter:0,
  residueDays: 0
})
const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
)
const handleEdit = (index: number, row: User) => {
  userItem.value = JSON.parse(JSON.stringify(row))
  isShowDialog.value = true
}
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
}

const dateEnum = {
  "0": 86400000,
  "1": 2592000000,
  "2": 31104000000
}

function getDate(date: number) {
  const _date = new Date(date)
  return _date.toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, "-");
}

const tableData: User[] = [
  {
    date: 1690417388002,
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    nowState: true,
    inviter: 28876320,
    residueDays: 0
  },
  {
    date: 1685427288002,
    name: 'John',
    address: 'No. 189, Grove St, Los Angeles',
    nowState: false,
    inviter: 28876321,
    residueDays: 1
  },
  {
    date: 1688437188002,
    name: 'Morgan',
    address: 'No. 189, Grove St, Los Angeles',
    nowState: false,
    inviter: 28876322,
    residueDays: 3
  },
  {
    date: 1680447088002,
    name: 'Jessy',
    address: 'No. 189, Grove St, Los Angeles',
    nowState: true,
    inviter: 28876323,
    residueDays: 10
  },
]

function showRecord() {
  window.ipcRenderer.send("win-operate",{ win: "ChildWin", operate: "start", argu: {
    width: 600,
    height: 400,
    modal: true,
    movable: true,
    resizable: false,
    title: "积分记录",
    url: "http://localhost:5173/#/", 
    route: "show-record"
  }})
}

</script>

<style lang="less">
.my-table {
  background-color: transparent;
}
</style>
