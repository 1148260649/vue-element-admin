<template>
  <div class="app-container">
    <div style="height: 780px;overflow: auto;padding: 2px 2px 2px 2px;">
      <table-no-dialog
        :data-param="dataParam"
        :table-list-download="tableListDownload"
      />
      <el-table
        :data="tableData"
        class="table-class"
        max-height="485"
        height="485"
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
    <el-dialog
      :visible.sync="dialogTableVisible"
      width="80%"
      append-to-body
    >
      <el-form ref="oneTableInfo" :model="oneTableInfo" :rules="formRule">
        <el-form-item prop="username">
          <el-input
            v-model="oneTableInfo.userName"
            name="userName"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>
        <el-form-item prop="userAge">
          <el-input
            v-model="oneTableInfo.userAge"
            name="userAge"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import TableNoDialog from '@/views/test/Commonable/tableNoDialog.vue'

export default {
  components: { TableNoDialog },
  data() {
    return {
      activeNumber: 0,
      dataParam: {
        code: 'KEY_01'
      },
      tableListDownload: true,
      tableData: [
        {
          userName: 'jz',
          userAge: 58
        }
      ],
      dialogTableVisible: false,
      oneTableInfo: {
        userName: 'jz',
        userAge: 58
      },
      formRule: {
      }
    }
  },
  methods: {
    tableEdit(row) {
      // 在做项目中经常会遇到table表格某行进行编辑。
      // 当编辑表格行时弹出一个浮框，里面被赋值当前表格的各个元素。可以在此元素的基础上进行修改编辑操作。
      // 一般浮框的输入项是用双向绑定v-model。
      // 当点击编辑按钮时候把当前行的数据赋值给弹框内并渲染弹框数据。
      // 这时候问题就容易出现了：浮框数据改变发现页面数据也跟着改变了。
      // 如果只有确认按钮还能忍受，关键是数据已经改变，如果有取消编辑按钮，数据一样已经改变!
      // 其实原因很简单，数据是obj类型，赋值操作的时候把地址给共同绑定了。
      // 这也是一个js的基础问题，对象等赋值数据类型的值和址应用等知识点
      // 解决方案很简单，利用js提供的Object.assign()对象方法。
      // Object.assign()方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
      // 不会引用原地址。不会修改到原来的内容。
      this.oneTableInfo = Object.assign({}, row)
      this.dialogTableVisible = true
    },
    tableDelete(row) {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
