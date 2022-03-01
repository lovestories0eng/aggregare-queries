<template>
  <el-container class="contain">
    <el-aside class="left-column">
      <side-bar :sample-queries="sampleQueries" @choosedQuery="choosedQuery"></side-bar>
    </el-aside>
    <el-main class="right-column">
      <head-searcher :query="query" :sample-queries="sampleQueries" @getQuery="getQuery" @getMessage="getMessage" @choosedQuery="choosedQuery"></head-searcher>
      <div style="padding-top:10px">
        <results-table :round="round" :table-data="tableData"></results-table>
      </div>
      <div class="candidate-answers-container">
        <candidate-answers
          :candidate-answers="candidateAnswers"
          :options="options"
          :round="round"
          :max-round="maxRound"
          @getSelectedSample="getSelectedSample"
        >
        </candidate-answers>
      </div>
      <div class="query-graph-container">
        <query-graph :graph-data="graphData" :selected-sample="selectedSample"></query-graph>
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
import { Message } from "element-ui";
import {deepClone} from "utils";

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
      query: '',
      click:0,
      selectedSample: ''
    }
  },
  mounted() {
  },
  methods: {
    // 每一轮次的路径数据进行叠加
    dataProcess(Obj) {
      if (Object.keys(Obj).length === 0) {
        return Obj
      }
      let keys = Object.keys(Obj)
      // for (let u=1;u<=keys.length;u++) {
      //   console.log((Obj[u].queryPath).length)
      // }
      for (let i=2;i<=keys.length;i++) {
        let tempData = deepClone(Obj[i].queryPath)
        // 需要深拷贝
        let tempDataHistory = deepClone(Obj[i-1].queryPath)
        let tempDataLength = tempData.length
        let tempDataHistoryLength = tempDataHistory.length
        let currentPath
        let historyPath
        for (let j=0;j<tempDataLength;j++) {
          currentPath = tempData[j].path
          let flag = true
          for (let k=0;k<tempDataHistoryLength;k++) {
            historyPath = tempDataHistory[k].path
            if (currentPath.toString() === historyPath.toString()) {
              // console.log('true')
              flag = false
              break
            }
          }
          if (flag) {
            tempDataHistory.push(tempData[j])
          }
        }
        Obj[i].queryPath = tempDataHistory
      }
      return Obj
    },
    // 获取子组件所选择的sample
    getSelectedSample(val) {
      this.selectedSample = val.samplename
    },
    choosedQuery(val) {
      this.click = 1;
      this.query = val.query;
      axios.get("./data/" + val.query + ".json").then(res => {
        res = res.data
        this.queryData = res
        this.queryData = this.dataProcess(this.queryData)
        this.maxRound = Object.keys(this.queryData).length
        if (val.flag === 1)
          this.round = 0
        else if (val.flag === 2)
          this.round = 1
        this.tableData = []
        this.candidateAnswers = []
        this.graphData = []
        this.tableData = []
        this.options = []
        this.initTableData()
        this.initGraphData()
        this.initCandidateAnswers()
      })
    },
    // 提交查询后默认显示第一轮
    getQuery() {
      if(this.click === 0) {
        Message.error('Please choose a query')
        return
      }
      if(this.round >= 1) {
        return
      } else {
        this.round = 1
      }
      this.initTableData()
      this.initGraphData()
      this.initCandidateAnswers()
    },
    getMessage() {
      if(this.click === 0)
      {
         Message.error('Please choose a query')
        return
      }
      else if(this.round  >= this.maxRound) {
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
