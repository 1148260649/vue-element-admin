<template>
  <el-card body-style="width:96%;margin-left:2%;">
    <el-row :gutter="50">
      <el-form
        v-if="formItems.length > 0"
        ref="SearchForm"
        :model="searchForm"
        label-width="120px"
      >
        <el-row :gutter="2">
          <el-col
            v-for="(item,index) of formItems"
            :key="item['interfaceColumn'] + index"
            :span="formSpan.item"
          >
            <el-form-item
              :label="item['interfaceName'] + ':'"
              :prop="item['interfaceColumn']"
            >
              <el-date-picker
                v-if="item['interfaceType'] === 'DATE'"
                v-model="searchForm[item['interfaceColumn']]"
                type="date"
                size="small"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :placeholder="'请选择' + item['interfaceName']"
                class="form-item-length"
              />
              <el-date-picker
                v-else-if="item['interfaceType'] === 'MONTH'"
                v-model="searchForm[item['interfaceColumn']]"
                type="month"
                size="small"
                format="yyyy-MM"
                value-format="yyyy-MM"
                :placeholder="'请选择' + item['interfaceName']"
                class="form-item-length"
              />
              <el-date-picker
                v-else-if="item['interfaceType'] === 'DATE_RANGE'"
                v-model="searchForm[item['interfaceColumn']]"
                type="daterange"
                size="small"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                class="form-item-length"
              />
              <el-input-number
                v-else-if="item['interfaceType'] === 'NUMBER'"
                v-model="searchForm[item['interfaceColumn']]"
                controls-position="right"
                size="small"
                :placeholder="'请选择' + item['interfaceName']"
                :step="0.01"
                :precision="2"
                class="form-item-length"
              />
              <el-input
                v-else
                v-model="searchForm[item['interfaceColumn']]"
                size="small"
                :placeholder="'请输入' + item['interfaceName']"
                class="form-item-length"
              />
            </el-form-item>
          </el-col>
          <el-col :span="formSpan.button_span" :offset="formSpan.button_offset">
            <el-button type="success" :loading="tableLoadIng" @click="query"> <svg-icon icon-class="search" /> 查询</el-button>
            <el-button :loading="tableLoadIng" icon="el-icon-refresh" @click="resetForm"> 重置</el-button>
            <el-button v-if="tableListDownload" icon="el-icon-download" type="primary" :loading="tableLoadIng" @click="downLoad"> 下载
            </el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-table
        :loading="tableLoadIng"
        :data="tableDataList"
        class="table-class"
        max-height="485"
        height="485"
        border
        stripe
      >
        <el-table-column
          v-if="dataParam.code === 'key01' || dataParam.code === 'key02'"
          label="序号"
          type="index"
          width="50"
        />
        <el-table-column
          v-for="(item,index) of columns"
          :key="item['interfaceColumn'] + index"
          :prop="item['interfaceColumn']"
          :label="item['interfaceName']"
          :align="item['interfaceAlign'] || 'center'"
          :show-overflow-tooltip="true"
          :min-width="item['interfaceWidth']"
          header-align="center"
        >
          <template slot-scope="{row}">
            <span v-if="item['interfaceDict']">
              {{ getDescByColumn(item['interfaceDict'], row[item['interfaceColumn']]) }}
            </span>
            <span v-else>
              {{ row[item['interfaceColumn']] }}
            </span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :qi-page="page.pageNumber"
        :page-sizes="[5, 10, 20, 50, 100, 200, 300, 400]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.totalRecord"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        @pagination="queryTableList"
      />
    </el-row>
  </el-card>
</template>

<script>

import { deepClone, getDefaultPage, setPage } from '@/utils'
import { configListAjax, queryTableListAjax } from '@/api/test/myTest'
import moment from 'moment/moment'

export default {
  name: 'TableNoDialog',
  components: {},
  props: {
    tableListDownload: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    dataParam: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      page: getDefaultPage(),
      tableLoadIng: false,
      formItems: [
        // {
        //   interfaceColumn: 'amountSpent',
        //   interfaceName: '消费金额',
        //   interfaceType: 'NUMBER'
        // }
      ],
      formSpan: {
        item: 8,
        button_span: 10,
        button_offset: 6
      },
      columns: [
        // {
        //   interfaceColumn: 'queryDate',
        //   interfaceName: '查询日期',
        //   interfaceAlign: 'left',
        //   interfaceWidth: '100',
        //   interfaceDict: ''
        // }
      ],
      tableDataList: [],
      searchForm: {
      },
      searchColumns: [],
      dictTypeDesc: {
        PAY_TYPE: {
          0: '现金支付',
          1: '交行信用卡',
          2: '建行信用卡'
        }
      }
    }
  },
  computed: {},
  async created() {
    await this.tableInit()
    this.searchFormHandler()
    await this.queryTableList()
  },
  methods: {
    /**
     * 表头和查询项初始化
     */
    async tableInit() {
      const param = {
        interfaceNo: this.dataParam.code
      }
      await configListAjax(param).then(response => {
        console.log(response)
        this.$message({
          message: '表头加载成功',
          type: 'success',
          duration: 2000
        })
        const date = response.resData
        this.searchColumns = date.filter(item => item['interfaceSelect'] === 'Y')
        this.columns = date.filter(item => item['interfaceShow'] === 'Y')
      }).catch(err => {
        this.tableLoadIng = false
        console.log(err)
        this.$notify({
          title: '错误',
          message: '表头加载失败',
          type: 'error',
          duration: 2000
        })
      })
    },
    /**
     * 查询表格数据
     */
    async queryTableList() {
      this.tableLoadIng = true
      console.log(this.searchForm)
      let searchDateTime = moment(new Date()).format('YYYY-MM-DD')
      if (this.searchForm.dateOfPurchase) {
        searchDateTime = this.searchForm.dateOfPurchase
      }
      const param = {
        interfaceNo: this.dataParam.code,
        dateTime: searchDateTime
      }
      await queryTableListAjax(param, this.page).then(response => {
        this.tableLoadIng = false
        // console.log(response)
        this.$message({
          message: '数据加载成功',
          type: 'success'
        })
        this.page = setPage(response.resData)
        this.tableDataList = response.resData.pageList
      }).catch(err => {
        this.tableLoadIng = false
        console.log(err)
        this.$notify({
          title: '加载数据失败',
          message: '获取表格数据失败',
          type: 'error',
          duration: 5000
        })
      })
    },
    /**
     * 查询数据
     */
    query() {
      this.page = getDefaultPage()
      this.tableInit()
      this.queryTableList()
      this.searchFormHandler()
    },
    /**
     * 重置查询条件
     */
    resetForm() {
      this.$refs.SearchForm.resetFields()
      this.searchFormHandler()
    },
    /**
     * 下载表格数据
     */
    downLoad() {

    },
    /**
     * 查询框重新设置
     */
    searchFormHandler() {
      const formItemList = deepClone(this.searchColumns)
      for (let i = 0; i < formItemList; i++) {
        const formItem = formItemList[i]
        const fieldType = formItem['interfaceType']
        const fieldName = formItem['interfaceColumn']
        switch (fieldType) {
          case 'NUMBER' :
            this.$set(this.searchForm, fieldName, undefined)
            break
          case 'DATE' :
            this.$set(this.searchForm, fieldName, this.getDateYYYYMMDD())
            break
          case 'MONTH' :
            this.$set(this.searchForm, fieldName, this.getDateYYYYMM())
            break
          case 'DATE_RANGE' :
            this.$set(this.searchForm, fieldName, this.getDateYYYYMMDD(), this.getDateYYYYMMDD())
            break
          default :
            this.$set(this.searchForm, fieldName, '')
            break
        }
      }
      this.formItems = formItemList
      this.formSpan.button_offset = 24 - (this.formItems.length * this.formSpan.item + this.formSpan.button_span) % 24
    },
    /**
     * 获取时间 yyyy-MM
     */
    getDateYYYYMM() {
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      return year + '-' + month
    },
    /**
     * 获取时间 yyyy-MM-dd
     */
    getDateYYYYMMDD() {
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      return year + '-' + month + '-' + day
    },
    /**
     * 获取字段项值 描述
     * @param dictType 字典类型
     * @param dictValue 字典值
     */
    getDescByColumn(dictType, dictValue) {
      return this.dictTypeDesc[dictType][dictValue]
    },
    /**
     * 切换每页大小
     * @param val 每页大小
     */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.page.pageSize = val
    },
    /**
     * 切换页码
     * @param val 当前页
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.page.pageNumber = val
      this.queryTableList()
    }
  }
}
</script>

<style lang="scss" scoped>

.form-item-length {
  width: 180px;
}

.el-row {
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
}

.table-class {
  margin-top: 10px;
}

</style>
