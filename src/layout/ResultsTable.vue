<template>
  <div>
    <el-table
      :data="copydata"
      empty-text="Please choose a query"
      border
      style="width: calc(100% - 40px); margin:20px"
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
    <el-tooltip content="continue">
      <el-button type="primary" :disabled="disabled" class="button-style" @click="proceed">
        <svg t="1646027791988" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2864" width="200" height="200"><path d="M104 0v1024l816-512z" p-id="2865"></path></svg>
      </el-button>
    </el-tooltip>
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
      // if(val === 2)//点击submit时显示第一轮
      // this.copydata = this.tableData.slice(0, this.round);
      this.copydata = this.tableData.slice(0, val);
    }
  },
  methods: {
    proceed() {
      this.$emit('getMessage');
      // this.copydata = this.tableData.slice(0, this.round);
    }
  }
}
</script>
<style scoped>
.button-style
{
  margin-top:10px;
  float: right;
}
</style>
