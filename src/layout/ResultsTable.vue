<template>
<div class="tableContainer">
<table class="imagetable">
    <tr>
        <th>result</th><th>error</th><th>confidence interval</th><th>confidence level-fixed</th><th>runtime of this round</th>
    </tr>
    <tr v-for="i in resultTable" :key="i.result">
        <td>{{i.result}}</td><td>{{i.error}}</td><td>{{i.confidence_interval}}</td><td>{{i.confidence_level_fixed}}</td><td>{{i.runtime}}</td>
    </tr>
    </table>
</div>
</template>

<script>
import ResultsTable, { resultArray } from '../data/ResultTable'
export default {
  name: "ResultsTable",
  data()
  {
    return{
      resultTable:[]
    }
  },
  mounted()
  {
    this.resultTable=resultArray()
  }
}
</script>

<style scoped>
.tableContainer{
  margin-top:20px;
}
 table.imagetable {
        font-family: verdana,arial,sans-serif;
        font-size:11px;
        color:#333333;
        border-width: 1px;
        border-color: #999999;
        border-collapse: collapse;
    }
    table.imagetable th {
        background:#b5cfd2 ;
        border-width: 1px;
        padding: 8px;
        border-style: solid;
        border-color: #999999;
    }
    table.imagetable td {
        background:#dcddc0 ;
        border-width: 1px;
        padding: 8px;
        border-style: solid;
        border-color: #999999;
    }
</style>
