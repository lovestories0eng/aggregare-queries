<template>
  <div class="contain">
    <div class="leftcolumn">
      <side-bar></side-bar>
    </div>
    <div class="rightcolumn">
      <head-searcher :sample-queries="sampleQueries"></head-searcher>
      <div class="result_container">
      <results-table @getmessage="sendmessage"></results-table>
      </div>
      <div class="candidate_answers_container">
      <candidate-answers :message="round"></candidate-answers>
      </div>
      <query-graph></query-graph>
      <control-buttons></control-buttons>
    </div>
  </div>
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
  methods:
{
  sendmessage(msg)
  {
    this.round=msg
    
  }
}
}
</script>

<style scoped>
.contain
{
  width:1200px;
  margin:auto;
}
.leftcolumn
{
  width:25%;
  float:left;

}
.rightcolumn
{
  width:70%;
  float:right;
}
.result_container
{
 float:right;
  width:100%;
}
.candidate_answers_container
{
  height:300px;
  width:100%;
  float: right;
  margin-top:10px;
  
}
</style>
