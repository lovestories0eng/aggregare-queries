<template>
  <div>
    <el-table
      :data="tableData"
      empty-text="Please choose a query"
      border
      style="width: 100%;margin-top:20px"
    >
      <el-table-column
        prop="index"
        label="round"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="result"
        label="result"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="error"
        label="error"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="confidence_interval"
        label="confidence interval"
      >
      </el-table-column>
      <el-table-column
        prop="confidence_level_fixed"
        label="confidencelevel fixed"
      >
      </el-table-column>
      <el-table-column
        prop="runtime"
        label="runtime of this round"
      >
      </el-table-column>
    </el-table>
    <el-button type="primary" :disabled="judge" class="button_style" @click="slice()">continue</el-button>
  </div>
</template>

<script>
import ResultsTable, { resultArray } from '../data/ResultTable'
export default {
  name: "ResultsTable",
  data() {
    return{
      i:1,
      judge:false,
      tableData:[],
      copyData:[]
    }
  },
  mounted() {
    this.copyData = resultArray()
  },
  methods: {
    slice() {
     this.tableData=this.copyData.slice(0,this.i);
     this.$emit('get-message',this.i);
     this.i++;
     if(this.i > Object.keys(this.copyData).length)
       this.judge=true;

   }
  }
  }
</script>
<style scoped>
.button_style
{
  margin-top:10px;
  float: right;
}
</style>
