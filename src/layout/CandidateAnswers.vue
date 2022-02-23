<template>
  <div>
    <el-container v-for="option in samples" :key="option.value" :style="'height: 200px;float:left; border: 1px solid #eee;width: '+wide+'%'">
      <el-container>
        <el-main style="padding:0">
          <el-table :data="candidateAnswers[option.value-1]" @row-click="clickData">
            <el-table-column prop="sampleName" :label="'round: '+option.value">
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
    <el-table :data="selectsample">
      <el-table-column prop="samplename" label="sample name" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="visitprobality" label="sample visitprobality" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="semanticsimilarities" label="sample semanticsimilarities" :show-overflow-tooltip="true">
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
    }
  },
  methods:{
    clickData(row) {
      this.selectsample[0].visitprobality = row.visitprobality;
      this.selectsample[0].semanticsimilarities = row.semanticsimilarities;
      this.selectsample[0].samplename = row.sampleName;
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
