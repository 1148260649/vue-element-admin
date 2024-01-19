<template>
  <div class="app-container">
    <div style="height: 780px;overflow: auto;padding: 2px 2px 2px 2px;">
      <el-row>
        <el-checkbox-group v-model="checkboxGroup1" size="small" @change="handleChange">
          <el-col
            v-for="(key,val) in checkListOp"
            :key="key"
            :span="6"
          >
            <el-checkbox :label="val" border>({{ key }} - {{ val }})</el-checkbox>
          </el-col>
        </el-checkbox-group>
      </el-row>
      <el-row>
        {{ checkboxGroup1 }}
      </el-row>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      checkboxGroup1: [],
      checkListOp: {
        'nj': '南京',
        'hf': '合肥',
        'sz': '苏州'
      }
    }
  },
  methods: {
    handleChange(val) {
      this.$notify({
        title: '提示',
        message: '选中值：' + val,
        type: 'info',
        duration: 2000
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
