<template>
  <div class="app-container">
    <div style="height: 780px;overflow: auto;padding: 2px 2px 2px 2px;">
      <el-row>
        <el-col :span="8">
          <el-button :loading="dialogVisible" type="primary" icon="el-icon-upload" @click="showUploadDialog(dataParam[0])">打开导入</el-button>
        </el-col>
      </el-row>
    </div>
    <upload-common
      v-if="dialogVisible"
      :title="title"
      :file-type="fileType"
      :file-upload-button-desc="fileUploadButtonDesc"
      :key-function-str="keyFunctionStr"
      @closed="dialogVisible=false"
    />
  </div>
</template>

<script lang="js">

import UploadCommon from '@/views/test/uploadFile/uploadCommon.vue'

export default {
  components: { UploadCommon },
  data() {
    return {
      dialogVisible: false,
      title: '',
      fileType: '',
      fileUploadButtonDesc: '',
      keyFunctionStr: '',
      dataParam: [
        {
          title: '请选择上传文件',
          fileType: '.xls,.xlsx',
          fileUploadButtonDesc: '请选择吧',
          keyFunctionStr: ''
        }
      ]
    }
  },
  watch: {
  },
  methods: {
    showUploadDialog(dataParamOne) {
      this.title = dataParamOne.title
      this.fileType = dataParamOne.fileType
      this.fileUploadButtonDesc = dataParamOne.fileUploadButtonDesc
      this.keyFunctionStr = dataParamOne.keyFunctionStr
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
