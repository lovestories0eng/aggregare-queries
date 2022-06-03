<template>
  <div>
    <div v-if="!answer">
      <el-container v-for="option in samples" :key="option.value" :style="'cursor:pointer;margin-bottom:20px;height: '+height+'px;float:left; border: 1px solid #eee;width: '+wide+'%'">
        <el-container>
          <el-main style="padding:0">
            <el-table v-if="linejudge===false" empty-text="Null" :data="candidateCopy[option.value-1]" :header-cell-style="{whiteSpace:'pre-line',background:'#EDCA96',color:'#ffff',textAlign:'center',cursor:'default',height:'30px',fontSize:'14px',height: '45px',padding: '0'}" :cell-style="{padding: '0','text-align':'center'}"
                      :row-style="{height: '0'}" height="140" @row-click="clickData"
            >
              <el-table-column prop="sampleName" :label="'Round '+option.value+':'+Object.keys(candidateCopy[option.value-1]).length+' samples'" :show-overflow-tooltip="true">
                <template slot="header">
                  <div>Round {{ option.value }}:</div>
                  <div>{{ Object.keys(candidateCopy[option.value-1]).length + " " }}samples</div>
                </template>
                <template slot-scope="scope">
                  <span>{{ scope.row.sampleName }}</span>
                </template>
              </el-table-column>
            </el-table>
            <el-table v-if="linejudge===true" empty-text="Null" :data="candidateCopy[option.value-1]" :header-cell-style="{whiteSpace:'pre-line',background:'#EDCA96',color:'#ffff',textAlign:'center',cursor:'default',height:'30px',fontSize:'14px',height: '45px',padding: '0'}" :cell-style="{padding: '0','text-align':'center'}"
                      :row-style="{height: '0'}" height="140" @row-click="clickData"
            >
              <el-table-column prop="sampleName" :label="'Round '+option.value+':'+Object.keys(candidateCopy[option.value-1]).length+' samples'" :show-overflow-tooltip="true">
              </el-table-column>
            </el-table>
          </el-main>
        </el-container>
      </el-container>
    </div>
    <el-container v-if="answer" :style="'cursor:pointer;margin-bottom:20px;height: '+height+'px;float:left; border: 1px solid #eee;width: '+65+'%'">
      <el-container>
        <el-main style="padding:0">
          <el-table height="45" :header-cell-style="{whiteSpace:'pre-line',background:'#EDCA96',color:'#ffff',textAlign:'center',cursor:'default',height:'30px',fontSize:'14px',height: '45px',padding: '0'}" :cell-style="{padding: '0','text-align':'center'}"
                    :row-style="{height: '0'}" :data="finalAnswer" 
          >
            <el-table-column :label="'All Samples: '+(Object.keys(finalAnswer[0]).length+Object.keys(finalAnswer[1]).length)">
            </el-table-column>
          </el-table>
          <el-row>
            <el-col :span="12">
              <el-table :show-header="false" empty-text="Null" 
                        :header-cell-style="{whiteSpace:'pre-line',background:'#EDCA96',color:'#ffff',textAlign:'center',cursor:'default',height:'30px',fontSize:'14px',height: '45px',padding: '0'}" :cell-style="{padding: '0','text-align':'center'}" :row-style="{height: '0'}"
                        :data="finalAnswer[0]" @row-click="clickData"
              >
                <el-table-column prop="sampleName">
                  <template slot-scope="scope">
                    {{ scope.row.sampleName }}
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
            <el-col :span="12">
              <el-table :show-header="false" empty-text="Null" 
                        :header-cell-style="{whiteSpace:'pre-line',background:'#EDCA96',color:'#ffff',textAlign:'center',cursor:'default',height:'30px',fontSize:'14px',height: '45px',padding: '0'}" :cell-style="{padding: '0','text-align':'center'}" :row-style="{height: '0'}"
                        :data="finalAnswer[1]" @row-click="clickData"
              >
                <el-table-column prop="sampleName">
                  <template slot-scope="scope">
                    {{ scope.row.sampleName }}
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
    <el-table :cell-style="{'text-align':'center'}" :data="selectsample" :header-cell-style="{whiteSpace:'pre-line',background:'#F4B0B0',color:'#fff',textAlign:'center',height: '0',padding: '0'}" :style="'border:#DCDFE6 solid 1.5px;height:'+height+'px;width:'+wideSample+'%;'">
      <el-table-column prop="samplename" label="Sample Name" :show-overflow-tooltip="true">
        <template slot="header">
          <div>Sample</div>
          <div>Name</div>
        </template>
        <template slot-scope="scope">
          <span>{{ scope.row.samplename }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="visitprobality" label="Visiting Probability" :show-overflow-tooltip="true">
        <template slot="header">
          <div>Visiting</div>
          <div>Probability</div>
        </template>
        <template slot-scope="scope">
          <span>{{ scope.row.visitprobality }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="semanticsimilarities" label="Semantic Similarity" :show-overflow-tooltip="true">
        <template slot="header">
          <div>Semantic</div>
          <div>Similarity</div>
        </template>
        <template slot-scope="scope">
          <span>{{ scope.row.semanticsimilarities }}</span>
        </template>
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
    },
    answer:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return{
      currentround: 1,
      copyArray: this.options,
      samples: [],
      candidateCopy:[],
      wide:65,
      wideSample:0,
      height:0,
      selectsample: [
        {
          samplename: '',
          visitprobality: '',
          semanticsimilarities: ''
        }
      ],
      linejudge:true,
      finalAnswer:[]
    }
  },
  watch: {
    round(val) {
      this.height = 150
      this.wideSample = 35
      this.currentround = val
      if(val !== 0)
        this.wide = 65 / val
      else
        this.wide = 0
      this.samples = this.copyArray.slice(0,this.currentround)
      if(val >= 3)
        this.linejudge = false
    },
    options(val)
    {
      this.copyArray = val//因为初始化时候的option长为3后续选择别的option时没有更新过了，所以大于3的就会出bug
      this.selectsample[0].visitprobality = ''
      this.selectsample[0].semanticsimilarities = ''
      this.selectsample[0].samplename = ''
    },
    wide(val)
    {

      if(this.wide === 0)
      {
        this.height = 0
        this.wideSample = 0
      }
      else
      {
        this.wideSample = 35
        this.height = 150;
      }

    },
    candidateAnswers(val)
    {
      this.answer = false
      if(!val)
        return;

      this.candidateCopy = [];
      this.finalAnswer = [];
      this.linejudge = true
      for(let i = 0;i <= Object.keys(val).length - 1;i++)
      {
        let tableArray = [];
        if(i === 0)
          this.candidateCopy.push(val[i]);
        else
        {
          for(let j = 0;j <= Object.keys(val[i]).length - 1;j++)
          {
            let flag = 1;
            for(let k = 0;k <= Object.keys(val[i - 1]).length - 1;k++)
            {
              if(val[i][j].sampleName === val[i - 1][k].sampleName)
              {
                flag = 0;
                break;
              }
            }
            if(flag === 1)
              tableArray.push(val[i][j])
          }
          if(!tableArray)
            tableArray.push({sampleName: "" ,visitprobality: "",semanticsimilarities: ""})
          this.candidateCopy.push(tableArray)
        }
      }
      let lenth = Object.keys(val).length
      let array = [];
      for(let i = 0;i <= Object.keys(val[lenth - 1]).length - 1;i++)//分两列显示
      {   
        array.push(val[lenth - 1][i])
        if(i === parseInt(Object.keys(val[lenth - 1]).length / 2))
        { 
          console.log(1111)
          this.finalAnswer.push(array)  
          array = []
        }   
      }
      this.finalAnswer.push(array)
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
  .thead {
   display: none;
  }
</style>

