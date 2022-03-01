<template>
  <div id="side-bar">
    <el-table
      stripe
      :data="sampleQueries"
      :height="autoHeight.height"
      :header-cell-style="{'font-size':'20px','color':'#303133','font-weight': '520'}"
      @row-click="clickData"
    >
      <el-table-column
        prop="query"
        label="Query Examples"
        align="center"
      >
        <template slot-scope="scope">
          <el-tooltip effect="dark" disabled:false :content="scope.row.query" placement="top" :open-delay="500">
            <span>{{ scope.row.query| ellipsis }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  filters: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 30) {
        return value.slice(0, 30) + "...";
      }
      return value;
    }
  },
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
  mounted()
  {

  },
  methods: {
      clickData(row) {
       this.cardInfoList = row
       this.cardInfoList.flag = 1
      this.$emit('choosedQuery',this.cardInfoList, 1);
     },
    getHeight() {
      this.windowHeight = window.innerHeight
      this.autoHeight.height = (this.windowHeight - 40) + 'px';
    }
  },
}
</script>

<style >

</style>
