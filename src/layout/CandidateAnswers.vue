<template>
<div>
<el-container  v-for="option in samples" :key="option.value" :style="'height: 200px;float:left; border: 1px solid #eee;width: '+wide+'%'" >
  <el-container>
    <el-main style="padding:0px">
      <el-table :data="candidateAnswers[option.value-1]"  @row-click="clickData">
        <el-table-column prop="sampleName" :label="'round: '+option.value">
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</el-container>
<el-container style="height: 200px;float:left; border: 1px solid #eee;width:100%;padding:20px" >
  <el-container>
    <el-main >
      <el-table :data="selectsample">
        <el-table-column prop="samplename" label="sample name">
        </el-table-column>
         <el-table-column prop="visitprobality" label="sample visitprobality">
        </el-table-column>
         <el-table-column prop="semanticsimilarities" label="sample semanticsimilarities">
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</el-container>
</div>
</template>

<script>
export default {
  name: "CandidateAnswers",
   props: {
    candidateAnswers: {
      type: Array,
      default() {
        return []
      }
    },
     options: {
      type: Array,
      default() {
        return []
      }
    },
    round:{

    }
   },
 data() {
     
     return{
       currentround:1,
        copyArray:this.options,
        samples:[],
        wide:100,
        selectsample:[
          {
        samplename:'',
        visitprobality:'',
        semanticsimilarities:''}
        ]
     }
     
    },
    methods:{
    clickData(row) {   
       this.selectsample[0].visitprobality=row.visitprobality;
       this.selectsample[0].semanticsimilarities=row.semanticsimilarities;
       this.selectsample[0].samplename=row.sampleName;
       
     }
    },
      watch: {
       round(val){
         if(this.round<=Object.keys(this.copyArray).length)
        this.currentround=this.round-1;
      
     else
        this.currentround=this.round;
            this.wide=100/(this.round-1);
          this.samples=this.copyArray.slice(0,this.currentround);
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