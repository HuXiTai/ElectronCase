<template>
  <el-form :model="props.userItem" label-width="80px">
    <el-form-item label="创建日期">
      <el-date-picker
        v-model="props.userItem.date"
        type="date"
        placeholder="创建日期"
      />
    </el-form-item>

    <el-form-item label="昵称">
      <el-input v-model="props.userItem.name" />
    </el-form-item>

    <el-form-item label="邀请码">
      <el-input v-model="props.userItem.inviter" />
    </el-form-item>

    <el-form-item label="剩余天数">
      <el-input-number v-model="props.userItem.residueDays" :min="0" :max="365" />
    </el-form-item>

    <el-form-item label="今日状态">
      <el-select v-model="props.userItem.nowState" placeholder="please select your zone">
        <el-option label="已完成" :value="true" />
        <el-option label="未完成" :value="false" />
      </el-select>
    </el-form-item>

    <el-form-item label="">
      <div class="btn">
        <el-button>取消</el-button>
        <el-button type="primary">确定</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
// 套餐类型 1-包天 2-包月 3-包年
enum PackageTypeEnum {
  包天,
  包月,
  包年,
}

interface User {
  date: number
  name: string
  address: string
  nowState: boolean
  inviter: number
  residueDays: number
}

const props = defineProps<{
  userItem: User
}>();
</script>

<style scoped lang="less">
.el-form {
    width: 290px;
    .btn {
      width: 100%;
      text-align: end;
    }
}
</style>
