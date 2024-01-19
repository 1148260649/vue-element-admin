<template>
  <el-row style="text-align: center;padding: 50px 0;color: #909399;">
    <svg-icon icon-class="message" />
    {{ getMessage() }}
    <!--$t('common.no_data')-->
  </el-row>
</template>

<script>
export default {
  name: 'NoData',
  props: {
    message: {
      type: String,
      default: ''
    }
  },
  methods: {
    getMessage() {
      if (this.message) {
        return this.message
      }
      return this.$t('common.no_data')
    }
  }
}
</script>
