<template>
  <div>
    <el-container>
      <el-main style="padding:0;text-align:center;height: 30vh;">
        <el-select v-model="value" placeholder="please choose round" @change="changeRound">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-table :data="candidateAnswers[roundShow - 1]">
          <el-table-column
            align="center"
            prop="sampleName"
            label="sample name"
          >
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <el-button type="primary" class="button-show-more" @click="changeStatus">show more</el-button>
  </div>
</template>

<script>
export default {
  name: "CandidateAnswers",
  props: {
    options: {
      type: Array,
      default() {
        return []
      }
    },
    candidateAnswers: {
      type: Array,
      default() {
        return []
      }
    },
    roundShow: {
      type: Number,
      default: 1
    },
    threshold: {
      type: Number,
      default: 5
    },
    round: {
      type: Number,
      default: 0
    },
    maxRound: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      showMore: false,
      value: ''
    }
  },
  methods: {
    changeStatus() {
      this.showMore = true
    },
    changeRound(value) {
      this.$emit('changeRound', value)
    }
  }
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
  .button-show-more
{
  margin-top:10px;
  float: right;
}
</style>
