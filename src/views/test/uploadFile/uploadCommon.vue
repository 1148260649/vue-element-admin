<template>
  <el-dialog
    v-if="dialogVisible"
    width="40%"
    :visible.sync="dialogVisible"
    :title="title"
    :close-on-click-modal="false"
    @close="closed"
  >
    <el-upload
      action=""
      show-file-list
      :accept="fileType"
      :limit="2"
      :auto-upload="false"
      :on-change="changeFile"
      :on-remove="removeFile"
      :on-exceed="exceedFile"
      :file-list="fileList"
    >
      <el-button slot="trigger" type="text" class="card-panel-text" :loading="importLoading">
        {{ fileUploadButtonDesc }}
      </el-button>
      <div slot="tip" class="el-upload__tip">只能上传{{ fileType }} 文件</div>
    </el-upload>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closed">取消</el-button>
      <el-button type="primary" :loading="importLoading" @click="submitEventSure()">确定</el-button>

    </span>
  </el-dialog>
</template>

<script lang="js">

import { importFile } from '@/api/test/myTest'

export default {
  name: 'UploadCommon',
  props: {
    title: {
      type: String,
      default: ''
    },
    fileType: {
      type: String,
      default: ''
    },
    fileUploadButtonDesc: {
      type: String,
      default: ''
    },
    keyFunctionStr: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      fileList: [],
      dialogVisible: true,
      importLoading: false
    }
  },
  watch: {},
  methods: {
    /**
     * 确定按钮事件
     */
    submitEventSure() {
      if (this.keyFunctionStr === '') {
        this.importFile()
      }
    },
    /**
     * 文件超过限制事件
     * @param files 当前文件
     * @param fileList 文件列表
     */
    exceedFile(files, fileList) {
      console.log(files)
      if (fileList.length >= 1) {
        this.$message({
          message: '请先删除已选择文件后，在重新上传',
          type: 'warning',
          duration: 5 * 1000
        })
      }
    },
    /**
     * 文件改变事件
     * @param file 当前文件
     * @param fileList 文件列表
     */
    changeFile(file, fileList) {
      console.log('直接删除')
      this.fileList = fileList.slice(-1)
      this.fileList[0] = file.raw
    },
    /**
     * 移出文件改变事件
     * @param file 当前文件
     * @param fileList 文件列表
     */
    removeFile(file, fileList) {
      this.fileList = fileList.slice(-1)
    },
    /**
     * 导入文件
     */
    importFile() {
      var thatThis = this
      if (!thatThis.fileList[0]) {
        console.log('文件未上传')
        this.$message({
          message: '请选择需要导入的文件',
          type: 'warning',
          duration: 5 * 1000
        })
        return
      }
      const fileFormData = new FormData()
      fileFormData.append('file', thatThis.fileList[0])
      thatThis.importLoading = true
      importFile(fileFormData).then(res => {
        thatThis.importLoading = false
        console.log(res)
        if (res.resCode === '200') {
          this.$message({
            message: '导入成功,请稍后查看',
            type: 'success',
            duration: 5 * 1000
          })
          thatThis.fileList = []
          thatThis.closed()
        } else {
          this.$message({
            message: '导入失败,' + res.resMessage,
            type: 'error',
            duration: 5 * 1000
          })
        }
      }).catch(err => {
        thatThis.importLoading = false
        console.log(err)
        this.$message({
          message: '导入失败，请查看错误文件，修改后重新导入',
          type: 'error',
          duration: 5 * 1000
        })
      })
    },
    /**
     * 关闭弹窗
     */
    closed(t) {
      this.dialogVisible = false
      this.$emit('closed')
    }

  }
}
</script>

<style lang="scss" scoped>
> > > .el-dialog__header {
  padding: 10px 20px;

  .el-dialog__title{
    color: #409EFF;
    font-weight: bold;

    &:before{
      content: "";
      display: inline-block;
      width: 4px;
      height: 20px;
      background-color: #409EFF;
      border-radius: 0 2px 2px 0;
      position: relative;
      top: 2.6px;
      left: -20px;
    }
  }

}
> > > .el-dialog__body{
  padding: 20px;
}

</style>
