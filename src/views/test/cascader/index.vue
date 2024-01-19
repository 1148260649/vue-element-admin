<template>
  <div class="app-container">
    <div style="height: 780px;overflow: auto;padding: 2px 2px 2px 2px;">
      <el-row>
        <el-col>
          <el-button :loading="cityLoadIng" @click="queryChinaCity">查询中国城市信息</el-button>
        </el-col>
        <el-col>
          <el-cascader
            v-model="cityList"
            :loading="cityLoadIng"
            :props="{value: 'id',label:'cityName',children:'children',multiple : true, expandTrigger:'hover',checkStrictly : true}"
            :options="cityListOptions"
            clearable
            filterable
            :show-all-levels="true"
            style="width: 100%"
            @change="(val) => handleChange(val)"
          />
          <span>绑定的级联值：{{ cityList }}</span>
          <br>
          <span>数据处理后的值：{{ selectVal }}</span>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>

import { queryCityTreeNodeOptionsList } from '@/api/test/myTest'
import { getDefaultPage } from '@/utils'

export default {
  data() {
    return {
      cityList: [],
      selectVal: [],
      cityLoadIng: false,
      cityListOptions: [
        {
          id: 1,
          cityName: '东南',
          disabled: true,
          children: [
            {
              id: 2,
              cityName: '上海',
              children: [
                { id: 3, cityName: '普陀' },
                { id: 4, cityName: '黄埔' },
                { id: 5, cityName: '徐汇' }
              ]
            },
            {
              id: 7,
              cityName: '江苏',
              children: [
                { id: 8, cityName: '南京' },
                { id: 9, cityName: '苏州' },
                { id: 10, cityName: '无锡' }
              ]
            },
            {
              id: 12,
              cityName: '浙江',
              children: [
                { id: 13, cityName: '杭州' },
                { id: 14, cityName: '宁波' },
                { id: 15, cityName: '嘉兴' }
              ]
            }]
        }, {
          id: 17,
          cityName: '西北',
          children: [
            {
              id: 18,
              cityName: '陕西',
              children: [
                { id: 19, cityName: '西安' },
                { id: 20, cityName: '延安' }
              ]
            },
            {
              id: 21,
              cityName: '新疆维吾尔族自治区',
              children: [
                { id: 22, cityName: '乌鲁木齐' },
                { id: 23, cityName: '克拉玛依' }
              ]
            }]
        }]
    }
  },
  methods: {
    async queryChinaCity() {
      this.cityLoadIng = true
      await queryCityTreeNodeOptionsList({ id: '' }, getDefaultPage()).then(response => {
        this.cityLoadIng = false
        // console.log(response)
        this.$message({
          message: '数据加载成功',
          type: 'success'
        })
        this.cityListOptions = response.resData
      }).catch(err => {
        this.cityLoadIng = false
        console.log(err)
        this.$notify({
          title: '加载数据失败',
          message: '获取城市数据失败',
          type: 'error',
          duration: 5000
        })
      })
    },
    handleChange(val) {
      const selectVal = []
      val.some(function(item) {
        selectVal.push(item[item.length - 1])
      })
      this.selectVal = selectVal
      this.$message({
        message: '选中值：' + selectVal,
        type: 'success',
        duration: 2000
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
