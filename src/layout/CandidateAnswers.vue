<template>
  <div>
    <el-container v-for="option in samples" :key="option.value" :style="'height: 200px;float:left; border: 1px solid #eee;width: '+wide+'%'">
      <el-container>
        <el-main style="padding:0">
          <el-table :data="candidateAnswers[option.value-1]" :header-cell-style="{background:'#EDCA96',color:'#ffff',align:'center'}" @row-click="clickData">
            <el-table-column prop="sampleName" :label="'round: '+option.value+': '+Object.keys(candidateAnswers[option.value-1]).length+' samples'">
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
    <el-table :data="selectsample" :header-cell-style="{background:'#F4B0B0',color:'#fff',align:'center'}" style="padding-top:10px ;border:#DCDFE6 solid 1.5px ">
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
      wide: 100,
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
      this.currentround = val
      this.wide = 100 / (this.round);
      this.samples = this.copyArray.slice(0,this.currentround);
    },
    options(val)
    {
      this.copyArray=val//因为初始化时候的option长为3后续选择别的option时没有更新过了，所以大于3的就会出bug
      this.selectsample[0].visitprobality = ''
      this.selectsample[0].semanticsimilarities = ''
      this.selectsample[0].samplename = ''
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

