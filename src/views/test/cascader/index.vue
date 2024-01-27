<template>
  <div class="app-container">
    <el-card>
      <div style="height: 725px;overflow: auto;">
        <el-form ref="cityForm" :model="casCaderCity" label-width="240px" style="width: 99%;" class="elColCasPro">
          <el-form-item label="城市级联选择器">
            <el-row :gutter="20">
              <el-col :span="5">
                <el-button :loading="casCaderCity.cityLoadIng" style="width: 100%" @click="queryChinaCity(cityRootId)">查询中国城市信息</el-button>
              </el-col>
              <el-col :span="8">
                <el-cascader
                  v-model="casCaderCity.cityList"
                  :loading="casCaderCity.cityLoadIng"
                  :props="{value: 'id',label:'cityName',children:'children',multiple : true, expandTrigger:'hover',checkStrictly : true}"
                  :options="cityListOptions"
                  clearable
                  filterable
                  collapse-tags
                  :show-all-levels="true"
                  style="width: 100%"
                  @change="(val) => handleChange(val)"
                />
              </el-col>
              <el-col :span="5">
                <el-tooltip placement="top">
                  <div slot="content">绑定的级联值：<br>{{ casCaderCity.cityList }}</div>
                  <i class="el-icon-warning-outline" />
                </el-tooltip>
              </el-col>
              <el-col :span="5">
                <el-tooltip placement="top">
                  <div slot="content">数据处理后的值：<br>{{ casCaderCity.selectCityStr }}</div>
                  <i class="el-icon-warning" />
                </el-tooltip>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="懒加载城市级联选择器">
            <el-row :gutter="20">
              <el-col :span="5">
                <el-button :loading="casCaderCity.lazy.cityLazyLoadIng" style="width: 100%" @click="lazyInitChinaCity(cityRootId)">加载第一级城市信息</el-button>
              </el-col>
              <el-col :span="8">
                <el-cascader
                  v-model="casCaderCity.lazy.cityList"
                  :loading="casCaderCity.lazy.cityLazyLoadIng"
                  :props="{lazy:true,lazyLoad:lazyQueryChinaCity,value: 'id',label:'cityName',children:'children',multiple : true, expandTrigger:'hover',checkStrictly : true}"
                  :options="lazyCityOptions"
                  clearable
                  filterable
                  :show-all-levels="true"
                  style="width: 100%;"
                  @change="(val) => handleChangeLazy(val)"
                >
                  <template slot-scope="{ node, data }">
                    <span>{{ data.cityName }}</span>
                    <span v-if="data.childrenNum && data.levelStr !== 'district'"> ({{ data.childrenNum }}) </span>
                    <el-tooltip placement="top">
                      <div slot="content">data：<br>{{ data }}</div>
                      <i class="el-icon-warning-outline" />
                    </el-tooltip>
                  </template>
                </el-cascader>
              </el-col>
              <el-col :span="5">
                <el-tooltip placement="top">
                  <div slot="content">绑定的级联值：<br>{{ casCaderCity.lazy.cityList }}</div>
                  <i class="el-icon-warning-outline" />
                </el-tooltip>
              </el-col>
              <el-col :span="5">
                <el-tooltip placement="top">
                  <div slot="content">数据处理后的值：<br>{{ casCaderCity.lazy.selectCityStr }}</div>
                  <i class="el-icon-warning" />
                </el-tooltip>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>

import { queryCityByPId, queryCityTreeNodeOptionsList } from '@/api/test/myTest'
import { getDefaultPage } from '@/utils'

export default {
  data() {
    return {
      cityRootId: '100000',
      casCaderCity: {
        cityList: [],
        selectCityStr: '',
        cityLoadIng: false,
        lazy: {
          cityList: [],
          selectCityStr: '',
          cityLazyLoadIng: false
        }
      },
      lazyCityOptions: [],
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
  created() {

  },
  methods: {
    /**
     * 获取城市信息
     * @returns {Promise<void>}
     */
    async queryChinaCity(cityId) {
      this.casCaderCity.cityLoadIng = true
      await queryCityTreeNodeOptionsList({ id: cityId }, getDefaultPage()).then(response => {
        this.casCaderCity.cityLoadIng = false
        // console.log(response)
        this.$message({
          message: '数据加载成功',
          type: 'success'
        })
        this.cityListOptions = response.resData
      }).catch(err => {
        this.casCaderCity.cityLoadIng = false
        console.log(err)
        this.$notify({
          title: '加载数据失败',
          message: '获取城市数据失败',
          type: 'error',
          duration: 5000
        })
      })
    },
    /**
     * 级联框变化事件
     * @param val 值
     */
    handleChange(val) {
      const selectVal = []
      val.some(function(item) {
        selectVal.push(item[item.length - 1])
      })
      this.$message({
        message: '选中值：' + selectVal,
        type: 'success',
        duration: 2000
      })
      this.casCaderCity.selectCityStr = selectVal
    },
    /**
     * 获取城市信息-初始化-懒加载
     */
    async lazyInitChinaCity(cityId) {
      this.casCaderCity.lazy.cityLazyLoadIng = true
      await queryCityByPId({ id: this.cityRootId }, getDefaultPage()).then(response => {
        this.casCaderCity.lazy.cityLazyLoadIng = false
        console.log(response.resData)
        this.lazyCityOptions = response.resData
      }).catch(err => {
        this.casCaderCity.lazy.cityLazyLoadIng = false
        console.log(err)
        this.$notify({
          title: '城市数据初始化失败',
          message: '懒加载-城市数据初始化失败',
          type: 'error',
          duration: 5000
        })
      })
    },
    /**
     * 获取城市信息-懒加载
     * @param node 城市信息
     * @param resolve lazy
     */
    async lazyQueryChinaCity(node, resolve) {
      var cityId = node.value
      if (cityId) {
        this.casCaderCity.lazy.cityLazyLoadIng = true
        await queryCityByPId({ id: cityId }, getDefaultPage()).then(response => {
          this.casCaderCity.lazy.cityLazyLoadIng = false
          console.log(response.resData)
          // 通过调用resolve将子节点数据返回，通知组件数据加载完成
          resolve(response.resData)
        }).catch(err => {
          this.casCaderCity.lazy.cityLazyLoadIng = false
          console.log(err)
          this.$notify({
            title: '懒加载数据失败',
            message: '懒加载-获取城市数据失败',
            type: 'error',
            duration: 5000
          })
        })
      } else {
        resolve([])
      }
    },
    /**
     * 级联框变化事件-懒加载
     * @param val 值
     */
    handleChangeLazy(val) {
      const selectVal = []
      val.some(function(item) {
        selectVal.push(item[item.length - 1])
      })
      this.$message({
        message: '选中值：' + selectVal,
        type: 'success',
        duration: 2000
      })
      this.casCaderCity.lazy.selectCityStr = selectVal
    }
  }
}
</script>

<style>
 .el-cascader-panel {
   height: 400px;
   border-radius: 4px;
 }
 .el-scrollbar__wrap{
   height: 500px !important;
 }
</style>

