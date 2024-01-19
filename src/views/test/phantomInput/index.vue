<template>
  <div class="app-container">
    <div style="height: 780px;overflow: auto;padding: 2px 2px 2px 2px;">
      <el-row>
        <el-col :span="4">
          <el-tag>tab 幽灵 </el-tag>
        </el-col>
        <el-col :span="8">
          <label class="input-container">
            <el-input v-model="valueStr" @keydown.tab.native="handleTab($event)" />
            <div class="suggestion-text">{{ suggestion }}</div>
          </label>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <el-tag>enter 幽灵 </el-tag>
        </el-col>
        <el-col :span="8">
          <label class="input-container">
            <el-input v-model="valueStr" @keydown.enter.native="handleTab($event)" />
            <div class="suggestion-text">{{ suggestion }}</div>
          </label>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <el-tag>space 幽灵 </el-tag>
        </el-col>
        <el-col :span="8">
          <label class="input-container">
            <el-input v-model="valueStr" @keydown.space.native="handleTab($event)" />
            <div class="suggestion-text">{{ suggestion }}</div>
          </label>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="js">

export default {
  data() {
    return {
      valueStr: '',
      suggestion: '',
      suggestions: ['我是你儿子', '你是我爸爸']
    }
  },
  watch: {
    valueStr(val) {
      this.suggestion = ''
      console.log('清空数据')
      const suggestionItem = this.suggestions.find((item) => item.startsWith(val))
      if (suggestionItem) {
        this.suggestion = suggestionItem
      }
    }
  },
  methods: {
    handleTab(e) {
      // 禁用默认的事件
      e.preventDefault()
      const targetStr = this.suggestions.find(str => str.includes(this.valueStr))
      if (!targetStr) return
      this.$notify({
        title: '提示',
        message: targetStr,
        type: 'info',
        duration: 2000
      })
      this.valueStr = targetStr
    }
  }
}
</script>

<style lang="scss" scoped>
.input-container {
  position: relative;
  display: block;
  font-size: 14px;
  .suggestion-text {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    padding: 10px 16px;
    box-sizing: border-box;
    opacity: 0.3;
  }
}
</style>
