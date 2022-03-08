<template>
  <div style="border:#DCDFE6 solid 1.5px;">
    <el-table
      :data="copydata"
      empty-text="Please choose a query"
      border
      :header-cell-style="{backgroundColor:'lightblue',color:'#ffff',fontWight:'500',textAlign:'center'}"
      :row-style="{height: '0'}"
      :cell-style="{padding: '0','text-align':'center'}"
    >
      <el-table-column
        prop="round"
        label="Round"
      >
      </el-table-column>
      <el-table-column
        prop="result"
        label="Approximate Result"
        min-width="120"
      >
      </el-table-column>

      <el-table-column
        prop="confidence interval"
        label="MoE ε"
      >
      </el-table-column>
      <el-table-column
        prop="error"
        label="Relative Error"
        min-width="120"
      >
      </el-table-column>
      <el-table-column
        prop="confidence level-fixed"
        label="Confidence Level"
        min-width="110"
      >
      </el-table-column>
      <el-table-column
        prop="runtime of this round"
        label="Runtime (ms)"
        min-width="100"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "ResultsTable",
  props: {
    round:{
       type: Number,
       default: 0
    },
    tableData: {
      type: Array,
      default() {
        return []
      }
    },
    disabled: {
      type: Boolean,
      default() {
        return false;
      }
    }

  },
  data(){
    return{
    copydata:[]
    }
  },
  watch:{
    round(val) {
  
      this.copydata = this.tableData.slice(0, val);
    }
  },
  methods: {
  
  }
}
</script>
<style scoped>
.el-table td, .el-table th.is-leaf,.el-table--border, .el-table--group{
  border-color: #DCDFE6; 
  border:10px;
}
.el-table--border::after, .el-table--group::after, .el-table::before{
  background-color: #DCDFE6;
  border:10px;
}
</style>
