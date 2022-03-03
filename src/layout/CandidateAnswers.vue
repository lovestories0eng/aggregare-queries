<template>
  <div>
    <el-container v-for="option in samples" :key="option.value" :style="'cursor:pointer;margin-bottom:20px;height: '+height+'px;float:left; border: 1px solid #eee;width: '+wide+'%'">
      <el-container>
        <el-main style="padding:0">
          <el-table empty-text="Null" :data="candidateCopy[option.value-1]" :header-cell-style="{background:'#EDCA96',color:'#ffff',textAlign:'center',cursor:'default',height:'30px',fontSize:'14px'}" @row-click="clickData">
            <el-table-column prop="sampleName" :label="'round:'+option.value+':'+Object.keys(candidateCopy[option.value-1]).length+'samples'">
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
    <el-table :data="selectsample" :header-cell-style="{background:'#F4B0B0',color:'#fff',align:'center'}" :style="'border:#DCDFE6 solid 1.5px;height:'+height+'px;width:'+wideSample+'%;'">
      <el-table-column prop="samplename" label="Sample Name" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="visitprobality" label="Visiting Probability" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="semanticsimilarities" label="Semantic Similarity" :show-overflow-tooltip="true">
      </el-table-column>
    </el-table>
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
      type: Number,
      default: 0
    }
   },
  data() {
    return{
      currentround: 1,
      copyArray: this.options,
      samples: [],
      candidateCopy:[],
      wide:51,
      wideSample:0,
      height:0,
      selectsample: [
        {
          samplename: '',
          visitprobality: '',
          semanticsimilarities: ''
        }
      ]
    }
  },
  watch: {
    round(val) {
      this.height=150
       this.wideSample=49
      this.currentround = val
      if(val!=0)
      this.wide = 51 / val
      else
      this.wide=0
      this.samples = this.copyArray.slice(0,this.currentround)
    },
    options(val)
    {
      this.copyArray=val//因为初始化时候的option长为3后续选择别的option时没有更新过了，所以大于3的就会出bug
      this.selectsample[0].visitprobality = ''
      this.selectsample[0].semanticsimilarities = ''
      this.selectsample[0].samplename = ''
    },
   wide(val)
    {  
      
       if(this.wide==0)
      {
        this.height=0
       this.wideSample=0
      }
       else
       {
        this.wideSample=49
        this.height=150;
        }
      
    },
    candidateAnswers(val)
    {    
      if(!val)
      return;
      
       this.candidateCopy=[];
       for(let i=0;i<=Object.keys(val).length-1;i++)
      {   
        let tableArray=[];
        if(i==0)
       this.candidateCopy.push(val[i]); 
        else
        {  
          for(let j=0;j<=Object.keys(val[i]).length-1;j++)
          {
            let flag=1;
              for(let k=0;k<=Object.keys(val[i-1]).length-1;k++)
              {
                  if(val[i][j].sampleName===val[i-1][k].sampleName)
                  {
                    flag=0;
                    break;
                  }
              }
              if(flag==1)
             tableArray.push(val[i][j])
          }
          if(!tableArray)
          tableArray.push({sampleName: "" ,visitprobality: "",semanticsimilarities: ""})
          this.candidateCopy.push(tableArray)
        
        }
      }
      
       
    }
  },
  methods:{
    clickData(row) {
      this.selectsample[0].visitprobality = row.visitprobality
      this.selectsample[0].semanticsimilarities = row.semanticsimilarities
      this.selectsample[0].samplename = row.sampleName
      this.$emit('getSelectedSample', this.selectsample[0])
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
</style>

