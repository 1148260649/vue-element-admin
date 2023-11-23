<template>
  <div class="app-container">
    <el-card>
      <el-row :gutter="20">
        <el-col :span="20">
          <div style="height: 725px;overflow: auto;" @scroll="scrollListener($event)">
            <el-row :id="stepList[0].key" class="custRowCss">
              <el-card>
                <el-date-picker
                  v-model="dateTest.exCheckDate"
                  type="date"
                  :picker-options="dateTest.pickerOptions"
                  value-format="yyyy-MM-dd"
                  placeholder="Please select"
                />
              </el-card>
            </el-row>
            <el-row :id="stepList[1].key" class="custRowCss">
              <el-card>
                <div style="height: 500px;">
                  <el-table
                    :v-loading="tableLoading"
                    :data="tableData"
                    border
                    stripe
                  >
                    <el-table-column
                      label="序号"
                      type="index"
                      width="50"
                      align="center"
                    />
                    <el-table-column
                      v-for="(item,index) of tableColumn"
                      :key="item['interfaceColumn'] + index"
                      :prop="item['interfaceColumn']"
                      :label="item['interfaceLabelName']"
                      :align="item['interfaceAlign'] || 'center'"
                      :show-overflow-tooltip="true"
                      :min-width="item['interfaceWidth']"
                      header-align="center"
                    >
                      <template scope="{ row }">
                        <span v-if="item['interfaceDict']">
                          {{ getDIctStr(item['interfaceDict'], row[item['interfaceColumn']]) }}
                        </span>
                        <span v-else>
                          {{ row[item['interfaceColumn']] }}
                        </span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-card>
            </el-row>
            <el-row :id="stepList[2].key" class="custRowCss">
              <el-card>
                <div style="height: 500px;">
                  <span>333</span>
                </div>
              </el-card>
            </el-row>
            <el-row :id="stepList[3].key" class="custRowCss">
              <el-card>
                <div style="height: 500px;">
                  <span>444</span>
                </div>
              </el-card>
            </el-row>
          </div>
        </el-col>
        <el-col :span="4">
          <el-card>
            <div style="height: 680px;">
              <el-steps
                direction="vertical"
                :active="activeNumber"
                space="40%"
                finish-status="wait"
                process-status="finish"
              >
                <el-step
                  v-for="(item,index) in stepList"
                  :key="item.key"
                  style="line-height: 25px;"
                  :title="item.titleName"
                  :icon="item.iconStr"
                  :description="item.descriptionStr"
                  @click.native="stepClick(item.key,index)"
                />
              </el-steps>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      dateTest: {
        exCheckDate: '2023-11-23',
        pickerOptions: {
          disabledDate: (time) => {
            // 如果函数处理比较简单,可以直接在这里写逻辑方法
            // return time.getTime() < Date.now() - 8.64e7
            // 如果函数里处理的数据比较麻烦,也可以单独放在一个函数里,避免data数据太臃肿
            return this.judgeDateIsIn(time)
          }
        }
      },
      activeNumber: 0,
      stepList: [
        {
          key: 'test1',
          titleName: '个人信息',
          descriptionStr: '我的自我介绍',
          iconStr: ''
        },
        {
          key: 'test2',
          titleName: '每日支出',
          descriptionStr: '每天的所有支出和收入都在这里能看到',
          iconStr: ''
        },
        {
          key: 'test3',
          titleName: '个人薪资',
          descriptionStr: '上班的薪资情况，包括五险一金',
          iconStr: ''
        },
        {
          key: 'test4',
          titleName: '信用卡账单',
          descriptionStr: '每个月所有的信用卡记录',
          iconStr: ''
        }
      ],
      tableLoading: false,
      tableDicts: {
        'PAY_TYPE': {
          'jhxyk1': '交行信用卡',
          'jhxyk2': '建行信用卡'
        }
      },
      tableColumn: [
        {
          interfaceColumn: 'dateOfPurchase',
          interfaceLabelName: '消费日期',
          interfaceAlign: 'center',
          interfaceWidth: '100',
          interfaceDict: ''
        },
        {
          interfaceColumn: 'theAmountSpent',
          interfaceLabelName: '消费金额',
          interfaceAlign: 'right',
          interfaceWidth: '95',
          interfaceDict: ''
        },
        {
          interfaceColumn: 'consumptionDescription',
          interfaceLabelName: '消费描述',
          interfaceAlign: 'left',
          interfaceWidth: '200',
          interfaceDict: ''
        },
        {
          interfaceColumn: 'paymentMethods',
          interfaceLabelName: '付款方式',
          interfaceAlign: 'center',
          interfaceWidth: '120',
          interfaceDict: 'PAY_TYPE'
        },
        {
          interfaceColumn: 'dayExpenditure',
          interfaceLabelName: '日支出（元）',
          interfaceAlign: 'right',
          interfaceWidth: '110',
          interfaceDict: ''
        },
        {
          interfaceColumn: 'dailyIncome',
          interfaceLabelName: '日收入（元）',
          interfaceAlign: 'right',
          interfaceWidth: '110',
          interfaceDict: ''
        },
        {
          interfaceColumn: 'monthlyExpenditure',
          interfaceLabelName: '月支出（元）',
          interfaceAlign: 'right',
          interfaceWidth: '110',
          interfaceDict: ''
        }
      ],
      tableData: [
        {
          'dateOfPurchase': '2023-11-22',
          'theAmountSpent': '20.00',
          'consumptionDescription': '饿了吗优惠卷',
          'paymentMethods': 'jhxyk1',
          'dayExpenditure': '33.39',
          'dailyIncome': '0.00',
          'monthlyExpenditure': '100.00'
        },
        {
          'dateOfPurchase': '2023-11-22',
          'theAmountSpent': '11.39',
          'consumptionDescription': '外卖',
          'paymentMethods': 'jhxyk2',
          'dayExpenditure': '33.39',
          'dailyIncome': '0.00',
          'monthlyExpenditure': '100.00'
        }
      ]
    }
  },
  computed: {

  },
  methods: {
    /**
     * div滚动监听事件
     * @param thatThis 当前事件
     */
    scrollListener(thatThis) {
      const cantainer = thatThis.srcElement
      const divs = cantainer.querySelectorAll('.custRowCss')
      let currentDiv = null
      let currentDivTop = Infinity
      for (const div of divs) {
        const divTop = div.getBoundingClientRect().top
        if (divTop > 0 && divTop < currentDivTop) {
          currentDivTop = divTop
          currentDiv = div
        }
      }
      if (currentDiv) {
        try {
          const divId = currentDiv.id
          const divNum = divId.substr(divId.length - 1)
          this.activeNumber = parseInt(divNum) - 1
        } catch (e) {
          console.error('切换右侧激活状态失败')
        }
      }
    },
    /**
     * 步骤切换事件
     * @param stepKey 步骤key
     * @param stepIndex 索引
     */
    stepClick(stepKey, stepIndex) {
      this.activeNumber = stepIndex
      document.querySelector('#' + stepKey).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start'
      }, true)
    },
    /**
     * 获取字典数据值
     * @param distType 字典类型
     * @param distValue 字典值
     * @returns {string} 字典值描述
     */
    getDIctStr(distType, distValue) {
      return this.tableDicts[distType][distValue]
    },
    /**
     * 判断日期是否在可用范围内
     */
    judgeDateIsIn(time) {
      const date = new Date() // 获取当前日期和时间
      const formattedDate = moment(date).format('YYYY-MM-DD')
      console.log(formattedDate) // 输出格式为 "yyyy-MM-dd" 的日期字符串
      // time.getTime是把选中的时间转化成自1970年1月1日 00:00:00 UTC到当前时间的毫秒数
      // Date.now()是把今天的时间转化成自1970年1月1日 00:00:00 UTC到当前时间的毫秒数,这样比较好比较
      // return的值,true是不可以操作选择,false可以操作选择,比如下面这个判断就只能选择今天之后的时间
      return time.getTime() > Date.now()

      // 这里减8.64e7的作用是,让今天的日期可以选择,如果不减的话,今天的日期就不可以选择,判断中写<= 也是没用的,一天的毫秒数就是8.64e7
      // return time.getTime() <= Date.now()
      // return time.getTime() < Date.now() - 8.64e7
    }
  }
}
</script>

<style lang="scss" scoped>
// 隐藏滚动条
::-webkit-scrollbar {
  display: none;
}
.custRowCss {
  padding: 5px 5px 5px 5px;
  margin-bottom: 15px;
}
</style>
