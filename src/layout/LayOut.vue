<template>
  <div class="contain">
    <div class="leftcolumn">
      <side-bar></side-bar>
    </div>
    <div class="rightcolumn">
      <head-searcher :sample-queries="sampleQueries"></head-searcher>
      <results-table></results-table>
      <candidate-answers></candidate-answers>
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
      sampleQueries: sampleQueries
    }
  },
  mounted() {
    console.log(this.sampleQueries)
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
  width:30%;
  float:left;

}
.rightcolumn
{
  width:65%;
  float:right;
}
</style>
