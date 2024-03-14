<template>
  <div class="app-container">
    <el-card>
      <div style="height: 725px;overflow: auto;padding: 10px">
        <el-form>
          <el-form-item>
            <el-row>
              <el-col :span="6">
                <el-button @click="vueToPdf"> vue-to-pdf 导出 pdf</el-button>
              </el-col>
              <el-col :span="18">
                <div ref="exportPDF">
                  <!-- 绑定ref为exportPDF的div内的内容是要导出的内容 -->
                  <el-table
                    :data="tableData"
                    class="table-class"
                    max-height="250"
                    height="200"
                    border
                    stripe
                  >
                    <el-table-column
                      label="序号"
                      type="index"
                      width="50"
                    />
                    <el-table-column
                      prop="userName"
                      label="姓名"
                      align="center"
                      show-overflow-tooltip
                      min-width="180"
                      header-align="center"
                    >
                      <template slot-scope="{row}">
                        <span>
                          {{ row.userName }}
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="userAge"
                      label="年龄"
                      align="center"
                      show-overflow-tooltip
                      min-width="180"
                      header-align="center"
                    >
                      <template slot-scope="{row}">
                        <span>
                          {{ row.userAge }}
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      align="center"
                      show-overflow-tooltip
                      min-width="180"
                      header-align="center"
                    >
                      <template slot-scope="{row}">
                        <span>
                          <el-button icon="el-icon-edit" @click="tableEdit(row)"> 编辑 </el-button>
                          <el-button icon="el-icon-delete" @click="tableDelete(row)"> 删除 </el-button>
                        </span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row>
              <el-col :span="6">
                <el-button @click="createByTemplate"> 服务端根据模板创建 pdf</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row>
              <el-col :span="6">
                <el-button @click="createByEmptyTemplate"> 根据空的pdf模板文件创建 pdf</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row>
              <el-col :span="6">
                <el-button @click="serverExportPdf"> 保存文件到服务器路径 pdf - table</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row>
              <el-col :span="6">
                <el-button @click="createPdf"> 创建 pdf 文件（包含多种数据类型）</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row>
              <el-col :span="6">
                <el-button @click="mergePdfFile"> 合并 pdf 文件 </el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script lang="js">

import {
  createByEmptyTemplate,
  createPdfTableFileSaveLocal,
  createByTemplate,
  createPdf,
  mergePdfFile
} from '@/api/test/myTest'

export default {
  components: {},
  data() {
    return {
      tableData: [
        {
          userName: 'jz',
          userAge: 58
        }
      ]
    }
  },
  methods: {
    /**
     * vue-to-pdf 导出 pdf
     */
    vueToPdf() {
      this.$PDFSave(this.$refs['exportPDF'], 'names11')
    },
    /**
     * 服务端根据模板创建 pdf
     */
    createByTemplate() {
      createByTemplate().then(res => {
        console.log(res)
        if (res.resCode === '200') {
          this.$message({
            message: '导入成功,请稍后查看',
            type: 'success',
            duration: 5 * 1000
          })
        } else {
          this.$message({
            message: '导入失败,' + res.resMessage,
            type: 'error',
            duration: 5 * 1000
          })
        }
      }).catch(err => {
        console.log(err)
        this.$message({
          message: '下载pdf文件失败',
          type: 'error',
          duration: 5 * 1000
        })
      })
    },
    /**
     * 根据空的pdf模板文件创建内容
     */
    createByEmptyTemplate() {
      createByEmptyTemplate().then(res => {
        console.log(res)
        this.$message({
          message: '下载成功',
          type: 'success',
          duration: 5 * 1000
        })
      }).catch(err => {
        console.log(err)
        this.$message({
          message: '下载pdf文件失败',
          type: 'error',
          duration: 5 * 1000
        })
      })
    },
    /**
     * 保存文件到服务器路径
     */
    serverExportPdf() {
      createPdfTableFileSaveLocal().then(res => {
        this.$message({
          message: res.resData,
          type: 'success',
          duration: 5 * 1000
        })
      }).catch(err => {
        this.$message({
          message: err.resMessage,
          type: 'error',
          duration: 5 * 1000
        })
      })
    },
    /**
     * 创建pdf文件（包含多种数据类型）
     */
    createPdf() {
      createPdf().then(res => {
        this.$message({
          message: res.resData,
          type: 'success',
          duration: 5 * 1000
        })
      }).catch(err => {
        this.$message({
          message: err.resMessage,
          type: 'error',
          duration: 5 * 1000
        })
      })
    },
    /**
     * 合并pdf文件
     */
    mergePdfFile() {
      mergePdfFile().then(res => {
        this.$message({
          message: res.resData,
          type: 'success',
          duration: 5 * 1000
        })
      }).catch(err => {
        this.$message({
          message: err.resMessage,
          type: 'error',
          duration: 5 * 1000
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
