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
        prop="confidence interval"
        label="confidence interval"
      >
      </el-table-column>
      <el-table-column
        prop="confidence level-fixed"
        label="confidence level-fixed"
      >
      </el-table-column>
      <el-table-column
        prop="runtime of this round"
        label="runtime of this round"
      >
      </el-table-column>
    </el-table>
    <el-button type="primary" :disabled="disabled" class="button-style" @click="proceed">continue</el-button>
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
