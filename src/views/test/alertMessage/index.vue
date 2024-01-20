<template>
  <div class="app-container">
    <div style="height: 780px;overflow: auto;padding: 2px 2px 2px 2px;">
      <el-row>
        <el-col :span="4">
          <el-button type="primary" @click="alertMessage">弹出两个message</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="alertZIndexMessage">弹出两个message info 在上面</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="asyncAlertMessage">异步弹出两个message</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="nextTickAlertMessage">nextTick弹出两个message</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="js">

export default {
  data() {
    return {
    }
  },
  methods: {
    alertMessage() {
      this.$message({
        message: '这是一条信息',
        type: 'info',
        duration: 2000
      })
      this.$message({
        message: '警告！这是一条信息',
        type: 'warning',
        duration: 2000
      })
    },
    alertZIndexMessage() {
      this.$message({
        message: '这是一条信息',
        type: 'info',
        duration: 2000,
        customClass: 'messageIndex'
      })
      this.$message({
        message: '警告！这是一条信息',
        type: 'warning',
        duration: 2000
      })
    },
    async asyncAlertMessage() {
      await this.$message({
        message: '这是一条信息',
        type: 'info',
        duration: 2000
      })
      await this.$message({
        message: '警告！这是一条信息',
        type: 'warning',
        duration: 2000
      })
    },
    nextTickAlertMessage() {
      this.$message({
        message: '这是一条信息',
        type: 'info',
        duration: 2000
      })
      this.$nextTick(() => {
        this.$message({
          message: '警告！这是一条信息',
          type: 'warning',
          duration: 2000
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.messageIndex {
  z-index: 3000 !important;
}
</style>
