<template>
  <el-container class="contain">
    <el-aside class="left-column">
      <side-bar :sample-queries="sampleQueries" @choosedQuery="choosedQuery"></side-bar>
    </el-aside>
    <el-main class="right-column">
      <head-searcher
        :graph-data="predicate.split(' ')"
        :query="query"
        :sample-queries="sampleQueries"
        @getQuery="getQuery"
        @getMessage="getMessage"
        @choosedQuery="choosedQuery"
        @selectChage="choosedQuery"
        @getMiniGraphType="getMiniGraphType"
      >
        <miniQueryGraph :query-type="miniGraphType" :graph-data="predicate.split(' ')"></miniQueryGraph>
      </head-searcher>
      <ModeSelect @modeSelect="modeSelect"></ModeSelect>
      <div style="padding-top:10px">
        <results-table :round="round" :table-data="tableData"></results-table>
      </div>
      <div class="candidate-answers-container">
        <candidate-answers
          :candidate-answers="candidateAnswers"
          :options="options"
          :round="round"
          :max-round="maxRound"
          :click="click"
          @getSelectedSample="getSelectedSample"
        >
        </candidate-answers>
      </div>
      <div class="query-graph-container">
        <!--<div v-if="round === maxRound && round !== 0 && !status">-->
        <!--  <el-button @click="changeStatus" style="width: 150px; height: 40px; background-color:lightblue !important;color: black;">Click to show results</el-button>-->
        <!--</div>-->
        <div v-if="round === 0 && click !== 0">
          A partial knowledge graph that contains the specific entity<span class="entity">
            {{ predicate.split(" ")[2].substring(0, predicate.split(" ")[0].length) }}
          </span>.
          <largeQueryGraph :graph-data="largeGraph" :data-type="largeGraphDataType"></largeQueryGraph>
        </div>
        <!--<div v-else-if="round === 0 && click === 0">-->
        <!--  A knowledge graph snapshot-->
        <!--  <largeQueryGraph :graph-data="largeGraph" :data-type="largeGraphDataType"></largeQueryGraph>-->
        <!--</div>-->
        <div v-else-if="round >= 1">
          A random sample of
          <span class="entity">
            {{ predicate.split(" ")[0].substring(2, predicate.split(" ")[0].length-1) }}
          </span>.
          <query-graph v-if="!status" :graph-data="graphData" :selected-sample="selectedSample"></query-graph>
        </div>
        <SpecialGraph v-if="status" id="special-graph" style="height: 300px"></SpecialGraph>
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
import miniQueryGraph from "layout/miniQueryGraph";
import largeQueryGraph from "layout/largeQueryGraph";
import SpecialGraph from "layout/SpecialGraph";
import ModeSelect from "layout/ModeSelect";

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
    ControlButtons,
    miniQueryGraph,
    largeQueryGraph,
    SpecialGraph,
    ModeSelect
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
      click: 0,
      selectedSample: '',
      predicate: '',
      largeGraph: [],
      miniGraphType: '',
      largeGraphDataType: false,
      nodeLimit: 200,
      status: false
    }
  },
  mounted() {
    axios.get('knowledgeGraph.json').then(res => {
      res = res.data
      this.processKnowledgeGraphData(res)
    })
  },
  methods: {
    changeStatus() {
      this.status = true
    },
    processKnowledgeGraphData(knowledgeGraph) {
      let dataBase = []
      let center = 'Database'
      for (let i=0;i<this.nodeLimit;i++) {
        dataBase.push(knowledgeGraph[center][i])
      }
      let data = {}
      let allPoints = []
      let allPointsId = []
      let pointMapId = []
      let allEdges = []
      let id = 1
      for (let startPoint = 0;startPoint < dataBase.length;startPoint++) {
        let tempStartPoint = dataBase[startPoint]
        if (knowledgeGraph[tempStartPoint] === undefined) continue
        allPoints.push(tempStartPoint)
        allPointsId.push(id)
        pointMapId.push({ id: id, name: tempStartPoint, color: 'yellow' })
        let tempEdge = { from: 0, to: id }
        let tempStartPointId = id
        id++
        allEdges.push(tempEdge)
        let intermediateResults = []
        for (let endPoint = 0;endPoint < knowledgeGraph[tempStartPoint].length;endPoint++) {
          let tempEndPoint = knowledgeGraph[tempStartPoint][endPoint]
          if (intermediateResults.indexOf(tempEndPoint) === -1) {
            allPoints.push(tempEndPoint)
            intermediateResults.push(tempEndPoint)
            allPointsId.push(id)
            pointMapId.push({ id: id, name: tempEndPoint })
            id++
            let tempEdge = { from: tempStartPointId, to: id - 1 }
            allEdges.push(tempEdge)
          }
        }
      }
      pointMapId.push({ id: 0, name: 'DataBase', color:'red' })
      data['edgesArray'] = allEdges
      data['nodesArray']= pointMapId
      // console.log(data)
      this.largeGraphDataType = false
      this.largeGraph = data
    },
    // 每一轮次的路径数据进行叠加
    dataProcess(Obj) {
      if (Object.keys(Obj).length - 1 === 0) {
        return Obj
      }
      let keys = Object.keys(Obj)
      // for (let u=1;u<=keys.length;u++) {
      //   console.log((Obj[u].queryPath).length)
      // }
      for (let i=2;i<=keys.length - 1;i++) {
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
    async choosedQuery(val) {
      if (val.query === '') {
        return
      }
      this.click = 1;
      this.query = val.query;
      await axios.get("./data/" + val.query + ".json").then(res => {
        res = res.data
        this.predicate = res.predicate
        console.log(this.predicate)
        this.queryData = res
        this.queryData = this.dataProcess(this.queryData)
        this.maxRound = Object.keys(this.queryData).length - 1
        if (val.flag === 1) {
          this.round = 0
        } else if (val.flag === 2 && this.round === 0) {
          this.round = 1
        }
        this.tableData = []
        this.candidateAnswers = []
        this.graphData = []
        this.tableData = []
        this.options = []
        this.initTableData()
        this.initGraphData()
        this.initCandidateAnswers()
      })

      axios.get("./data/" + val.query + ' graph' + ".json").then(res => {
        this.largeGraphDataType = true
        this.largeGraph = res['data'].edges
      })
    },
    modeSelect(mode) {
      if (mode === 'normal') {
        if (this.round === this.maxRound) {
          this.$message.error('Query already submitted!')
          return
        }
        for (let i=0;i < this.maxRound; i++) {
          this.round++
          this.initTableData()
        }
        this.initGraphData()
        // for (let i = 0; i < this.maxRound; i++) {
        //   setTimeout(() => {
        //     this.round++
        //     console.log(this.round, this.maxRound)
        //     this.initTableData()
        //     this.initGraphData()
        //     console.log(this.graphData)
        //   }, i * 1000)
        // }
      }
    },
    // 提交查询后默认显示第一轮
    getQuery() {
      if(this.click === 0) {
        Message.error('Please choose a query')
        return
      }
      if(this.round >= 1) {
        this.$message.error('Query has already been submitted.')
        return
      } else {
        this.round = 1
      }
      this.initTableData()
      this.initGraphData()
      this.initCandidateAnswers()
    },
    // 轮次继续
    async getMessage() {
      if (this.click === 0) {
        Message.error('Please choose a query')
        return
      }
      else if(this.round  >= this.maxRound) {
        console.log(this.round, this.maxRound)
        Message.error('Reaches the maximum number of iterations')
        return
      }
      else {
        for (let i = 0; i < this.maxRound - 1; i++) {
          setTimeout(() => {
            this.round++
            console.log(this.round, this.maxRound)
            this.initTableData()
            this.initGraphData()
          }, i * 1000)
        }
      }
    },
    initTableData() {
      if (this.round === 0)
        return
      let tempData = {}
      tempData["round"] = this.round
      tempData["confidence interval"] = this.queryData[this.round]["MoE"]
      tempData["confidence level-fixed"] = this.queryData[this.round]["confidence level-fixed"]
      tempData["error"] = this.queryData[this.round]["error"]
      tempData["result"] = this.queryData[this.round]["result"]
      tempData["runtime of this round"] = this.queryData[this.round]["runtime of this round"]

      this.tableData.push(tempData)
      // this.graphData = this.queryData[this.round]
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
    },
    getMiniGraphType(val) {
      this.miniGraphType = val
    }
  }
}
</script>

<style scoped>
.contain {
  width:90%;
  margin: 20px auto auto;
}
.left-column {
  width:20%;
  box-shadow: 0 2px 15px rgba(0, 0, 255, .2);
}
.right-column {
  padding-top: 0 !important;
  width:70%;
}
.candidate-answers-container {
  width: 100%;
  float: right;
  margin-top:10px;
}
.query-graph-container{
  text-align: center;
  color: blue;
  margin-top: 50px;
  width: 100%;
}

.entity {
  color: red;
}
</style>
