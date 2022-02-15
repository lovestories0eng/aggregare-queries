<template>
  <el-container class="contain">
    <el-aside class="left-column">
      <side-bar :sample-queries="sampleQueries" @choosedQuery="choosedQuery"></side-bar>
    </el-aside>
    <el-main class="right-column">
      <head-searcher :query="query" :sample-queries="sampleQueries" @getQuery="getQuery"></head-searcher>
      <div class="result-container">
        <results-table :round="round" :table-data="tableData" @getMessage="getMessage"></results-table>
      </div>
      <div class="candidate-answers-container">
        <candidate-answers
          :candidate-answers="candidateAnswers"
          :options="options"
          :round="round"
          :max-round="maxRound"
        >
        </candidate-answers>
      </div>
      <div class="query-graph-container">
        <query-graph :graph-data="graphData"></query-graph>
      </div>
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
import axios from "axios";
import {Message} from "element-ui";

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
      candidateAnswers: [],
      queryData: {},
      graphData: [],
      tableData: [],
      round: 0,
      maxRound: 0,
      options: [],
      query:''
    }
  },
  mounted() {
    // axios.get("./data/sampleData.json").then(res => {
    //   res = res.data
    //   this.queryData = res
    //   this.maxRound = Object.keys(this.queryData).length
    //   this.initTableData()
    //   this.initGraphData()
    //   this.initCandidateAnswers()
    // })
    axios.get("./data/How_many_astronaut_from_Russia.json").then(res => {
      res = res.data
      this.queryData = res
      this.maxRound = Object.keys(this.queryData).length
      this.initTableData()
      this.initGraphData()
      this.initCandidateAnswers()
    })
  },
  methods: {
    choosedQuery(val) {
      this.query=val.query;
    },
    // 提交查询后默认显示第一轮
    getQuery() {
      if(this.round >= 1) {
        return
      }
      this.round = 1
      this.initTableData()
      this.initGraphData()
    },
    getMessage() {
      if(this.round  >= this.maxRound) {
         Message.error('Reaches the maximum number of iterations')
        return
      }
      this.round++
      this.initTableData()
      this.initGraphData()
    },
    initTableData() {
      if (this.round === 0)
        return
      let tempData = {}
      tempData["round"] = this.round
      tempData["confidence interval"] = this.queryData[this.round]["confidence interval"]
      tempData["confidence level-fixed"] = this.queryData[this.round]["confidence level-fixed"]
      tempData["error"] = this.queryData[this.round]["error"]
      tempData["result"] = this.queryData[this.round]["result"]
      tempData["runtime of this round"] = this.queryData[this.round]["runtime of this round"]

      this.tableData.push(tempData)
      this.graphData = this.queryData[this.round]
    },
    initGraphData() {
      if (this.round === 0)
        return
      this.graphData = this.queryData[this.round]["queryPath"]
    },
    initCandidateAnswers() {
      this.candidateAnswers = []
      for (let i = 1; i <= this.maxRound; i++) {
        this.options.push({ label: "round " + i, value: i })
        let tempData = []
        this.queryData[i]["queryPath"].forEach(item => {
          tempData.push({ sampleName: item.path[0] ,visitprobality: item["visit probality"],semanticsimilarities: item["semantic similarities"]})
        })
        this.candidateAnswers.push(tempData)
      }

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
.query-graph-container{
  margin-top: 50px;
  width: 100%;
}
</style>
