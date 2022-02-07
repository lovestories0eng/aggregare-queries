<template>
  <el-container class="contain">
    <el-aside class="left-column">
      <side-bar :sample-queries="sampleQueries"></side-bar>
    </el-aside>
    <el-main class="right-column">
      <head-searcher :sample-queries="sampleQueries"></head-searcher>
      <div class="result-container">
        <results-table @get-message="sendMessage"></results-table>
      </div>
      <div class="candidate-answers-container">
        <candidate-answers :message="round"></candidate-answers>
      </div>
      <query-graph></query-graph>
      <control-buttons></control-buttons>
    </el-main>
  </el-container>
</template>

<script>
import SideBar from "./SideBar";
import HeadSearcher from "../components/HeadSearcher";
import ResultsTable from "./ResultsTable";
import CandidateAnswers from "./CandidateAnswers";
import QueryGraph from "./QueryGraph";
import ControlButtons from "./ControlButtons";

import sampleQueries from "../data/SampleQueries";

export default {
  name: "LayOut",
  components: {
    SideBar,
    HeadSearcher,
    ResultsTable,
    CandidateAnswers,
    QueryGraph,
    ControlButtons
  },
  data() {
    return {
      sampleQueries: sampleQueries,
      round:0
    }
  },
  mounted() {
    console.log(this.sampleQueries)
  },
  methods: {
    sendMessage(msg) {
      this.round = msg
    }
  }
}
</script>

<style scoped>
.contain {
  width:80%;
  margin: 20px auto auto;
}
.left-column {
  width:25%;
  box-shadow: 0 2px 15px rgba(0, 0, 255, .2);
}
.right-column {
  padding-top: 0 !important;
  width:70%;
}
.result-container {
 float:right;
  width:100%;
}
.candidate-answers-container {
  height:300px;
  width:100%;
  float: right;
  margin-top:10px;
}
</style>
