<template>
  <div>
    <side-bar></side-bar>
    <head-searcher></head-searcher>
    <results-table></results-table>
    <candidate-answers></candidate-answers>
    <query-graph></query-graph>
    <control-buttons></control-buttons>
  </div>
</template>

<script>
import SideBar from "./SideBar";
import HeadSearcher from "../components/HeadSearcher";
import ResultsTable from "./ResultsTable";
import CandidateAnswers from "./CandidateAnswers";
import QueryGraph from "./QueryGraph";
import ControlButtons from "./ControlButtons";

export default {
  name: "index",
  components: {
    SideBar,
    HeadSearcher,
    ResultsTable,
    CandidateAnswers,
    QueryGraph,
    ControlButtons
  }
}
</script>

<style scoped>

</style>
