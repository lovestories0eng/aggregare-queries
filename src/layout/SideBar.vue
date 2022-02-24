<template>
  <div id="side-bar">
    <el-table
      stripe
      :data="sampleQueries"
      :height="autoHeight.height"
      @row-click="clickData"
    >
      <el-table-column
        prop="query"
        label="sample queries"
        align="center"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  props: {
    sampleQueries: {
      type: Array,
      default() {
        return []
      }
    },
    singlePath: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      windowHeight: 0,
      autoHeight: {
        height: ''
      },
      cardInfoList:''
    }
  },
  created() {
    window.addEventListener('resize', this.getHeight)
    this.getHeight()
  },
  destroyed() {
    window.removeEventListener('resize', this.getHeight)
  },
  methods: {

      clickData(row) {
       this.cardInfoList=row

      this.$emit('choosedQuery',this.cardInfoList);
     },
    getHeight() {
      this.windowHeight = window.innerHeight
      this.autoHeight.height = (this.windowHeight - 40) + 'px';
    },
  }
}
</script>

<style>
</style>
