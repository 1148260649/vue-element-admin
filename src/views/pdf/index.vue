<template>
  <div class="app-container">
    <aside style="margin-top:15px;">{{ $t('pdf.tips') }}</aside>
    <router-link target="_blank" to="/pdf/download">
      <el-button type="primary">
        Click to download PDF
      </el-button>
    </router-link>
    <div>
      <h1>File</h1>
      <el-button @click="openPdfFileBytesDialog"> 文件流查看pdf </el-button>

      <h1>Base64</h1>
      <el-button @click="openPdfFileBase64Dialog"> base64查看pdf </el-button>

      <h1>test</h1>
      <el-button @click="test001Click">预览查看pdf</el-button>
    </div>
    <!--    <embed src="D:\纪振 程序包\java相关软件\API\MySQL笔记.pdf" type="application/pdf" width="100%" height="500px">-->
    <!--    <div>
      <pdf
        v-for="i in numPages"
        :key="i"
        :src="pdfFileBytesUrl"
        :page="i"
      />
      <pdf :src="pdfFileBytesUrl" />
      <iframe :src="fileURLOther" />
    </div>-->

    <!-- 文件流查看pdf -->
    <el-dialog
      id="elDialogCss1"
      center
      fullscreen
      :visible.sync="pdfFileBytesDialogVisible"
    >
      <div class="elDialogCssDiv">
        <vue-pdf-embed :source="pdfFileBytesUrl" />
      </div>
    </el-dialog>

    <!-- base64查看pdf -->
    <el-dialog
      center
      fullscreen
      :visible.sync="pdfFileBase64DialogVisible"
      class="elDialogCss"
    >
      <div class="elDialogCssDiv">
        <vue-pdf-embed :source="pdfFileBase64DialogSource" />
      </div>
    </el-dialog>

    <!-- 样例 -->
    <el-dialog
      center
      fullscreen
      :visible.sync="test001DialogVisible"
      class="elDialogCss"
    >
      <div class="zhjxMain">
        <div class="content">
          <div class="pdf-view-list">
            <div
              v-for="(item, index) in numPages"
              :key="index"
              class="item active-item"
              @click="internalLinkClicked(index)"
            >
              <div class="pdf-box">
                <vue-pdf-embed :source="pdfFileBytesUrl" class="vue-pdf-embed" :page="index + 1" />
              </div>
              <div class="page">{{ index + 1 }}</div>
              <div class="mask" :class="{ active: test001.activePage === index + 1 }" />
            </div>
          </div>
          <!-- 展示容器 -->
          <div ref="wrapper" class="left-box" @wheel.prevent="scaleWheel($event)">
            <div ref="box" class="box" @mousedown="dragstart($event)">
              <vue-pdf-embed
                :source="pdfFileBytesUrl"
                class="vue-pdf-embed"
                :page="test001.activePage"
              />
            </div>
            <div class="zoomin-wrapper">
              <img src="https://common.cnblogs.com/icons/message.svg" alt="" @click="rollBtn('enlarge')">
              <img src="https://common.cnblogs.com/icons/message.svg" alt="" @click="rollBtn('zoomin')">
              <img src="https://common.cnblogs.com/icons/message.svg" alt="" @click="rolate">
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
// 主要使用的是这个插件组件
import VuePdfEmbed from 'vue-pdf-embed/dist/vue2-pdf-embed'

import axios from 'axios'
// import VuePdfEmbed from 'vue-pdf-embed'
import { pdfBase64 } from '@/api/testPdf'
import TrTR from 'element-ui/src/locale/lang/tr-TR'

// const PDFJS = require('../../utils/pdf.js')

export default {
  name: 'Index',
  components: {
    pdf,
    VuePdfEmbed
  },
  emits: {

  },
  filters: {},
  data() {
    return {
      pagenumsTest: [],
      test001: {
        activePage: 1
      },
      scaleData: {
        scale: 1, // 缩放比例
        scaleNum: 0.1, // 滚轮缩放比例
        scaleMax: 100, // 最大缩放比例
        scaleMin: 0.1, // 最小缩放比例
        scaleBtn: 0.4, // 缩放按钮缩放比例
        rotate: 0 // 旋转角度
      },
      dragData: {
        x: 0, // 拖拽初始化时的x坐标
        y: 0, // 拖拽初始化时的y坐标
        left: 0, // 拖拽结束时的x偏移量
        top: 0, // 拖拽结束时的y偏移量
        firstX: 0, // 初始x坐标
        firstY: 0 // 初始y坐标
      },
      pdfFileBytesDialogVisible: false,
      pdfFileBytesUrl: '',
      pdfFileBase64DialogVisible: false,
      pdfFileBase64DialogSource: '',
      test001DialogVisible: false,
      fileURLOther: '',
      numPages: undefined
    }
  },
  computed: {
    TrTR() {
      return TrTR
    },
    // 当前页面链接 http://192.168.0.6:9000/viewPDF?filePath=测试.pdf
    // return http://192.168.0.6:9000
    trimmedUrl() {
      // 完整的URL
      const fullUrl = window.location.href
      // 使用URL对象来解析URL
      const urlObject = new URL(fullUrl)
      // 获取截取后的域名和端口号部分
      const trimmedUrl = `${urlObject.protocol}//${urlObject.host}`
      return trimmedUrl
    }
  },
  watch: {},
  created() {
    // this.openPDF()
  },
  mounted() {
    // this.getTotal()
  },
  methods: {
    /**
     * 获取pdf总页数
     */
    getTotal() {
      // 多页pdf的src中不能直接使用后端获取的pdf地址 否则会按页数请求多次数据
      const loadingTask = this.trimmedUrl + process.env.VUE_APP_BASE_API + this.$route.query.filePath
      // 需要使用下述方法的返回值作为url
      this.pdfFileBytesUrl = pdf.createLoadingTask(loadingTask)
      // 获取页码
      this.pdfFileBytesUrl.promise.then(pdf => {
        this.numPages = pdf.numPages
      }).catch(() => {
        this.$notify({
          title: '失败',
          message: '加载页数失败',
          type: 'error',
          duration: 5000
        })
      })
    },
    /**
     * 打开文件流弹窗
     */
    openPdfFileBytesDialog() {
      this.pdfFileBytesUrl = process.env.VUE_APP_BASE_HOST + process.env.VUE_APP_BASE_API_JZ + '/verify/pdfFileReturnBytesGet?fileName=MyBatis 3 User Guide Simplified Chinese.pdf'
      this.pdfFileBytesDialogVisible = true
    },
    openPDF() {
      axios({
        method: 'post',
        url: this.pdfFileBytesUrl, // 文件的url
        data: {
          fileName: 'MyBatis 3 User Guide Simplified Chinese.pdf'
        },
        responseType: 'blob'
      }).then((res) => {
        console.log('res', res)
        if (res.status === '500') {
          this.$message({
            message: '下载失败！',
            type: 'error'
          })
          return
        }
        // 文件以pdf形式进行预览
        const blob = new Blob([res.data], {
          type: 'application/pdf;chartset=UTF-8'
        })
        const fileURL = URL.createObjectURL(blob)
        this.fileURLOther = fileURL
      })
    },
    /**
     * 打开 base64 弹窗
     */
    openPdfFileBase64Dialog() {
      this.pdfFileBase64DialogVisible = true
      this.getBase64Source()
    },
    /**
     * base64查看pdf文件
     */
    getBase64Source() {
      pdfBase64().then(res => {
        console.log(res)
        this.pdfFileBase64DialogSource = res.resData
      }).catch(() => {
        this.$notify({
          title: '失败',
          message: '获取pdfBase64失败',
          type: 'error',
          duration: 5000
        })
      })
    },
    test001Click() {
      this.pdfFileBytesUrl = process.env.VUE_APP_BASE_HOST + process.env.VUE_APP_BASE_API_JZ + '/verify/pdfFileReturnBytesGet?fileName=MyBatis 3 User Guide Simplified Chinese.pdf'
      this.test001DialogVisible = true
      this.pdfFileBytesUrl012 = pdf.createLoadingTask(this.pdfFileBytesUrl)
      // 获取页码
      this.pdfFileBytesUrl012.promise.then(pdf => {
        this.numPages = pdf.numPages
        this.$notify({
          title: '提示',
          message: '页码' + this.numPages,
          type: 'info',
          duration: 5000
        })
      }).catch(() => {
        this.$notify({
          title: '失败',
          message: '加载页数失败',
          type: 'error',
          duration: 5000
        })
      })
      // // 获得总页数
      // this.pdfFileBytesUrl.promise.then(pdf => {
      //   this.numPages = pdf.numPages
      //   this.$notify({
      //     title: '成功',
      //     message: '一共' + this.numPages + '页',
      //     type: 'error',
      //     duration: 5000
      //   })
      // }).catch(() => {
      //   this.$notify({
      //     title: '失败',
      //     message: '加载页数失败',
      //     type: 'error',
      //     duration: 5000
      //   })
      // })
    },
    /**
     * 旋转
     */
    rolate() {
      this.scaleData.rotate += 90
      this.boxTransform()
    },
    /**
     * 鼠标滚轮缩放
     * @param e any
     */
    scaleWheel(e) {
      const dy = -e.deltaY || e.wheelDeltaY
      if (dy < 0) {
        this.scaleData.scale -= this.scaleData.scaleNum
      } else {
        // console.log('放大');
        this.scaleData.scale += this.scaleData.scaleNum
      }
      // 边界判断
      if (this.scaleData.scale >= this.scaleData.scaleMax) {
        this.scaleData.scale = this.scaleData.scaleMax
        return
      }
      if (this.scaleData.scale <= this.scaleData.scaleMin) {
        this.scaleData.scale = this.scaleData.scaleMin
        return
      }
      this.boxTransform()
      return false
    },
    /**
     * 点击放大缩小
     * @param action 'enlarge' | 'zoomin'
     */
    rollBtn(action) {
      if (action === 'enlarge') {
        this.scaleData.scale += this.scaleData.scaleBtn
      } else {
        this.scaleData.scale -= this.scaleData.scaleBtn
      }
      // 边界判断
      if (this.scaleData.scale >= this.scaleData.scaleMax) {
        this.scaleData.scale = this.scaleData.scaleMax
        return
      }
      if (this.scaleData.scale <= this.scaleData.scaleMin) {
        this.scaleData.scale = this.scaleData.scaleMin
        return
      }
      this.boxTransform()
    },
    /**
     * 拖拽（box容器拖拽）
     * @param e MouseEvent
     */
    dragstart(e) {
      var that_this = this
      this.$refs.box.style.transition = 'none'
      e.preventDefault() // 阻止默认事件
      const box = this.$refs.box
      // const wrapper = this.$refs.wrapper
      this.dragData.x = e.pageX - box.offsetLeft
      this.dragData.y = e.pageY - box.offsetTop
      function move(event) {
        // 计算元素的位置
        that_this.dragData.left = event.pageX - that_this.dragData.x
        that_this.dragData.top = event.pageY - that_this.dragData.y
        // 边界判断可以在这里添加 ↓

        // 设置元素的位置
        box.style.left = that_this.dragData.left + 'px'
        box.style.top = that_this.dragData.top + 'px'
      }
      // 添加鼠标移动事件
      document.addEventListener('mousemove', move)
      // 添加鼠标抬起事件，鼠标抬起，将事件移除
      document.addEventListener('mouseup', function() {
        document.removeEventListener('mousemove', move)
      })
      // 鼠标离开父级元素，把事件移除
      document.addEventListener('mouseout', function() {
        document.removeEventListener('mousemove', move)
      })
    },
    /**
     * box 容器也要跟着变化
     */
    boxTransform() {
      this.$refs.box.style.transform = `translate(-50%, -50%) rotate(${this.scaleData.rotate}deg) scale(${this.scaleData.scale})`
    },
    /**
     * 切换页码
     * @param number 页码
     */
    internalLinkClicked(number) {
      this.test001.activePage = number + 1
      this.$message({
        message: '当前页码' + this.test001.activePage,
        type: 'info'
      })
    }
  }
}
</script>

<style scoped lang="scss">

>>>#elDialogCss1 .el-dialog {
  background: #fff0;
}

.elDialogCssDiv{
  max-height:800px;
  height: 100%;
  width:70%;
  overflow: auto;
  border: 5px solid #DCDFE6;
  text-align: center;
  margin: auto;
}

.pdf-view-list {
  width: 200px;
  height: 100%;
  //background-color: #333333;
  overflow-y: scroll;
  // 隐藏滚动条
  &::-webkit-scrollbar {
    display: none;
  }
  .item {
    width: 100%;
    height: 257px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 20px 20px 0 20px;
    cursor: pointer;
    .pdf-box {
      width: 140px;
      height: 203px;
      background: #ffffff;
      border-radius: 4px;
      z-index: 1;
      .vue-pdf-embed {
        width: 100%;
        height: 100%;
      }
    }
    .page {
      font-weight: 600;
      font-size: 12px;
      color: #ffffff;
      line-height: 34px;
      z-index: 1;
    }
    .mask {
      width: 100%;
      height: 100%;
      background-color: transparent;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 0;
    }
    .active {
      background-color: #ffaa46;
      opacity: 0.2;
    }
  }
}
.zhjxMain {
  width: 100%;
  height: 800px;
  display: flex;
  flex-direction: column;
  background-color: #000000;
  overflow: hidden;
  .content {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background-color: #000000;
    display: flex;
    overflow: hidden;

    .left-box {
      width: 100%;
      height: 100%;
      background-color: #262626;
      margin-right: 10px;
      position: relative;
      overflow: hidden;
      .box {
        width: 80%;
        height: 100%;
        object-fit: contain;
        user-select: none; /* 不可选中,为了拖拽时不让文字高亮 */
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        justify-content: center;
        .vue-pdf-embed {
          width: 100%;
        }
      }
      .zoomin-wrapper {
        position: absolute;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        img {
          width: 34px;
          height: 34px;
          cursor: pointer;
          margin: 5px 0;
        }
      }
      .center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .bottom-left {
        position: absolute;
        bottom: 20px;
        left: 20px;
      }
    }
  }
}
</style>
