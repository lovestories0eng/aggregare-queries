<template>
  <div class="show">
    <el-col :span="13" style="display:flex;align-items:center">
      <el-link v-if="colorShow" :style="'width:'+widthLink+'%;display:flex;height:38px;text-align:start;justify-content:flex-start;border-bottom:1px solid #DCDFE6;'" @click="widthChange()">
        <span style="padding-top:10px;font-size: 14px;">
          <span>{{ str[0] }}</span>
          <span style="color:#CF9F62;font-weight:600">{{ str[1] }}</span>
          <span>{{ str[2] }}</span>
          <span style="color:#E88D8D;font-weight:600">{{ str[3] }}</span>
          <span>{{ str[4] }}</span>
        </span>
      </el-link>
      <!--  <el-select
        id="select"
        ref="headerSearchSelect"
        v-model="containSearch"
        :remote-method="querySearch"
        filterable
        remote
        :placeholder="beforeContain"
        class="header-search-select"
        :style="'width:'+widthSearch+'%'"
        :default-first-option="true"
        @blur="changeToLink()"
      >
        <el-option v-for="{ item } in options" :key="item.query" :value="item.query" :label="item.query" />
      </el-select>-->
      <el-input v-if="widthSearch===100"
                id="input"
                ref="headerSearchSelect"
                v-model="containSearch"
                class="header-search-select"
                :style="'width:'+widthSearch+'%'"
                @blur="changeToLink()"
      >
      </el-input>
    </el-col>
    <el-col :span="1.5">
      <div>
        <el-button class="submit-button" type="primary" style="font-size:12px;margin: 0 2px" @click="selectChange(0)">submit</el-button>
      </div>
    </el-col>
    <el-col :span="9.5" style="display:flex;align-items:center;justify-content:center">
      <slot></slot>
    </el-col>
  </div>
</template>

<script>
// fuse is a lightweight fuzzy-search module
// make search results more in line with expectations
import Fuse from 'fuse.js'
import allQueries from "../data/SampleQueries";
export default {
  name: 'HeaderSearch',
  props: {
    sampleQueries: {
      type: Array,
      default() {
        return []
      }
    },
    query:{
      type: String,
      default() {
        return '';
      }
    },
    graphData: {
      type: Array,
      default() {
        return []
      }
    }

  },
  data() { //clickJudge判断是不是由自己输入的，searchCopy存放内容根据点击或输入判断，search存的是对应的查询
    return {
      search: '',
      options: [],
      searchPool: [],
      show: true,
      fuse: undefined,
      widthLink:0,
      widthSearch:100,
      containLink:"",
      containSearch:"",
      beforeContain:"Search",
      fontsize:0,
      str:[],
      type:"",
      searchWidth:10,
      leftWidth:14,
      colorShow:true,
      clickJudge:false,
      searchCopy:''
    }
  },
  watch:{
    widthLink(val){
      if(val === 0)
      {
        this.colorShow = false;
      }
      else
      {
        this.colorShow = true;
      }
    },
    query(val) {
      if(this.clickJudge )
      {this.searchCopy = this.containSearch
        this.clickJudge = false
        console.log("clickJudge true")
        console.log(this.containSearch)}
      else
      { this.searchCopy = val
        this.containSearch = ''
        console.log("clickJudge false")
        console.log(this.containSearch)}
      this.search = val
      this.beforeContain = ""
      this.type = ""
      this.widthLink = 100
      this.widthSearch = 0
      this.fontsize = 14
      if(this.search.length > 50){
        this.searchWidth = 15
        this.leftWidth = 9
      }
      else if(this.search.length <= 35){
        this.searchWidth = 8
        this.leftWidth = 16
      }
      else{
        this.searchWidth = 10
        this.leftWidth = 14
      }

    },
    graphData(val) {
      if("undefined" === typeof val[2] || "undefined" === typeof val[0])
        return;
      if(val[0] === "?(automobile)")
        val[0] = "?(cars)"
      if(val[2] === "Advertising")
        val[2] = "advertising"
      let from = val[2].substring(0,3)
      let to = val[0].substring(2,5)
      let fromIndex = -1,toIndex = -1,fromEnd = -1,toEnd = -1
      let str1 = "",str2 = "",str3 = "",str4 = "",str5 = ""
      for(let i = 0;i <= this.search.length - 4;i++)
      {
        if(this.search.substring(i,i + 3) === from || this.search.substring(i,i + 1) >= 'A' && this.search.substring(i,i + 1) <= 'Z' && i >= 1 && fromIndex === -1)
        {
          fromIndex = i
          for(let j = i + 3;j <= this.search.length;j++)
          {
            if(this.search.substring(j,j + 1) === ' ' && this.search.substring(j + 1,j + 2) < 'A' && this.search.substring(j + 1,j + 2) > 'Z' || j === this.search.length)
            {
              fromEnd = j;
              break
            }

          }
        }
        if (this.search.substring(i,i + 3) === to)
        {  toIndex = i
          for(let j = i + 3;j <= this.search.length;j++)
          {
            if(this.search.substring(j,j + 1) === ' ' && this.search.substring(j + 1,j + 3) !== 'pl' || j === this.search.length)
            {
              toEnd = j
              break
            }

          }
        }

      }
      if(fromIndex !== -1 && toIndex !== -1)
      {
        str1 = this.search.substring(0,toIndex)
        str2 = this.search.substring(toIndex,toEnd)
        str3 = this.search.substring(toEnd,fromIndex)
        str4 = this.search.substring(fromIndex,fromEnd)
        str5 = this.search.substring(fromEnd)
      }
      //根据查询问题找到关键词
      this.str[0] = str1;
      this.str[1] = str2;
      this.str[2] = str3;
      this.str[3] = str4;
      this.str[4] = str5;
      this.type = ""
      let key = []
      let s = ''
      console.log("containSearch")
      console.log(this.containSearch)
      key = this.containSearch.trim().split(/[,_\s.]/)
      console.log("key")
      console.log(key)
      console.log("str[1]")
      console.log(this.str[1].toLowerCase().trim().split(/[,_\s.]/)[0])
      console.log("str[3]")
      console.log(this.str[3].toLowerCase().trim().split(/[,_\s.]/)[0])
      let flag1 = false
      let flag2 = false
      let jump = false
      if(Object.keys(key).length > 1)
      { for(let i = 0;i < Object.keys(key).length;i++)
      {

        if(key[i].toLowerCase() === this.str[1].toLowerCase().trim().split(/[,_\s.]/)[0])
        {
          this.str[0] = s
          if(key[i] !== this.str[1].trim().split(/[,_\s.]/)[0])//判断输入的关键词大小写问题
            this.str[1] = this.str[1].toLowerCase() + ' '
          else
            this.str[1] = this.str[1] + ' '
          s = ''
          console.log(this.str[0])
          flag1 = true
          if(Object.keys(this.str[1].toLowerCase().trim().split(/[,_\s.]/)).length > 1)
          {
            if(this.str[1].indexOf("_") !== -1)
            {
              this.str[1] = this.str[1].toLowerCase().trim().split(/[,_\s.]/)[0] + " " + this.str[1].toLowerCase().trim().split(/[,_\s.]/)[1] + " "
            }
            jump = true
          }
          continue
        }
        else if(key[i].toLowerCase() === this.str[3].toLowerCase().trim().split(/[,_\s.]/)[0])
        {
          this.str[2] = s
          if(key[i] !== this.str[3].trim().split(/[,_\s.]/)[0])//判断输入的关键词大小写问题
            this.str[3] = this.str[3].toLowerCase() + ' '
          else
            this.str[3] = this.str[3] + ' '
          console.log(this.str[2])
          s = ''
          flag2 = true
          if(Object.keys(this.str[3].toLowerCase().trim().split(/[,_\s.]/)).length > 1)
          {
            if(this.str[3].indexOf("_") !== -1)
            {
              this.str[3] = this.str[3].toLowerCase().trim().split(/[,_\s.]/)[0] + " " + this.str[3].toLowerCase().trim().split(/[,_\s.]/)[1] + " "
            }
            jump = true

          }
          continue
        }
        if(!jump)
          s = s + key[i] + ' '
        else
          jump = false
      }
      }
      this.str[4] = s
      for(let i = 0;i < 5;i++)
      {
        console.log("str" + i)
        console.log(this.str[i])
      }
      /*if((flag1 === false || flag2 === false) && Object.keys(key).length !== 1)
      {
        this.str[0] = this.containSearch
        for(let i = 1;i < 4;i++)
        {
          this.str[i] = ''
        }
        this.$message.error("No relevant query found, please enter another query!")
      }*/

      if(this.search.substring(0,4) === "What")
      {
        for(let i = 0;i <= this.search.length - 8;i++)
        {
          if(this.search.substring(i,i + 7) === "average")
          { let j = i + 8
            while(this.search.substring(j,j + 1) !== ' ')
            {
              j++
            }
            let attribute = this.search.substring(i + 8,j)
            if(attribute === "oil")
              attribute = attribute + " consumption"
            else if(attribute === "0-100")
              attribute = "0-100 accelerate"
            this.type = "AVG(" + attribute + ")"
          }
        }
      }
      else if(this.search.substring(0,3) === "How")
      {
        this.type = "COUNT(*)"
      }
      this.$emit('getMiniGraphType', this.type)
    }
  },
  mounted() {
    this.searchPool = this.sampleQueries
    this.fuse = new Fuse(this.searchPool, {
      shouldSort: true,
      threshold: 0.4,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['query']
    })
  },
  methods: {
    selectChange(val) {
      console.log("change")
      console.log(allQueries)
      let Obj = {}
      let max = 0
      let s = []
      s = this.containSearch.trim().split(/\s+/)
      for(let i = 0;i < Object.keys(allQueries).length;i++)
      {
        let count = 0;
        let s1 = []
        s1 = allQueries[i].query.trim().split(/\s+/)
        for(let j = 0;j < Object.keys(s).length;j++)
        {
          for(let k = 0;k < Object.keys(s1).length;k++)
          {
            if(s1[k] === s[j])
              count++
          }
        }
        if(count > max)
        { max = count
          Obj.query = allQueries[i].query
          this.searchCopy = this.containSearch
        }
      }
      Obj.flag = 1
      if(val === 0)//submit提交
        this.clickJudge = true
      this.$emit('choosedQuery', Obj)
    },
    querySearch(query) {
      this.options = this.fuse.search(query)
      if (this.options.length === 0) {
        this.options = [{
          item: {
            query: 'No relevant data found, please enter the correct query',
            refIndex: 0
          }
        }]
      }
    },
    // proceed() {
    //   let Obj = {}
    //   Obj.query = this.search
    //   Obj.flag = 2
    //   this.$emit('getQuery')
    //   this.$emit('choosedQuery', Obj)
    // },
    // proceedContinue() {
    //   this.$emit('getMessage');
    // },
    widthChange() {
      this.type = ""
      this.widthLink = 0
      this.widthSearch = 100
      // document.getElementById('select').focus();
      //document.getElementById('input').focus();
    },
    changeToLink() {
      this.widthLink = 100
      this.widthSearch = 0
      this.colorShow = true;
    }
  }
}
</script>

<style lang="scss" scoped>

.header-search-select {
  font-size: 14px;
  transition: width 0.2s;
  background: transparent;
  border-radius: 0;
  display: inline-block;
  vertical-align: middle;
  ::v-deep .el-input__inner {
    border-radius: 0;
    border: 0;
    padding-left: 0;
    padding-right: 0;
    box-shadow: none !important;
    border-bottom: 1px solid #d9d9d9;
    vertical-align: middle;
  }
}

.show {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
  font-size: 0 !important;

  .header-search-select {
    width: 100%;
  }
  .search-icon {

    cursor: pointer;
    font-size: 14px;

  }
  ::v-deep .el-button{
    line-height: 3;
    width:100%;
    font-weight: 700;
  }
}

.submit-button:hover {
  color: black !important;
}

.submit-button:focus {
  color: black !important;
}
</style>
