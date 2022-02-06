<template>
<div>
<el-container  v-for="sample in samples" :key="sample.round" :style="'height: 200px;float:left; border: 1px solid #eee;width: '+wide+'%'" >
  <el-container>
    <el-main style="padding:0px">
      <el-table :data="sample.sampledetail">
        <el-table-column prop="samplename" :label="'round: '+sample.round">
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</el-container>
<el-button type="primary" :disabled=false  class="button_showmore">show more</el-button>
</div>
</template>

<script>
import sampleNames from '@/data/SampleName'
export default {
  name: "CandidateAnswers",
  props:['message'],
 data() {
     
     return{
       round:0,
        samples:[],
        copyArray:sampleNames,
        wide:0,
     }
     
    },
      watch: {
        message(val){
        this.round=val;
          console.log("round"+this.round);
            this.wide=100/this.round;
          this.samples=this.copyArray.slice(0,this.round);
        }
        },
  
}
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
  .button_showmore
{
  margin-top:10px;
  float: right;
}
</style>