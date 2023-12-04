<template>
  <div class="app-container">
    <div style="height: 780px;overflow: auto;padding: 2px 2px 2px 2px;">
      <table-no-dialog
        :data-param="dataParam"
        :table-list-download="tableListDownload"
      />
    </div>
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
      tableListDownload: true
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>

</style>
