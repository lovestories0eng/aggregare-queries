<template>
  <div class="show">
    <el-col :span="13" style="display:flex;align-items:center">
      <el-link :style="'width:'+widthLink+'%;display:flex;height:38px;text-algin:start;justify-content:flex-start;border-bottom:1px solid #DCDFE6;font-size:'+fontsize+'px'" @click="widthChange()">
        <span style="padding-top:10px;">
          <span>{{ str[0] }}</span>
          <span style="color:#F56C6C">{{ str[1] }}</span>
          <span>{{ str[2] }}</span>
          <span style="color:#409EFF">{{ str[3] }}</span>
          <span>{{ str[4] }}</span>
        </span>
      </el-link>
      <el-select
        id="select"
        ref="headerSearchSelect"
        v-model="containSearch"
        :remote-method="querySearch"
        filterable
        remote
        :placeholder="beforeContain"
        class="header-search-select"
        :style="'width:'+widthSearch+'%'"
        @change="selectChage"
      >
        <el-option v-for="{ item } in options" :key="item.query" :value="item.query" :label="item.query" />
      </el-select>
    </el-col>
    <el-col :span="11" style="display:flex;align-items:center;justify-content:center">
      <slot></slot>

      <el-tooltip content="submit query" style="margin-left:10px">
        <el-button type="primary" class="search-icon" @click="proceed">
          <svg t="1646027529363" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2442" width="200" height="200"><path d="M439.488 960l124.416-169.984-124.416-35.84L439.488 960 439.488 960 439.488 960M0 559.936l353.472 107.072 435.328-369.6-337.408 398.144 377.92 116.736L1024 64.064 0 559.936 0 559.936 0 559.936M0 559.936" p-id="2443" fill="#fff"></path></svg>
        </el-button>
      </el-tooltip>
      <el-tooltip content="continue">
        <el-button type="primary" class="search-icon" @click="proceedContinue">
          <svg t="1646027791988" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2864" width="200" height="200" fill="#fff"><path d="M104 0v1024l816-512z" p-id="2865"></path></svg>
        </el-button>
      </el-tooltip>
    </el-col>
  </div>
</template>

<script>
// fuse is a lightweight fuzzy-search module
// make search results more in line with expectations
import Fuse from 'fuse.js'

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
  data() {
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
      str:[]
    }
  },
  watch:{
   query(val) {

      this.search=val
      this.containLink=val
      this.containSearch=""
      this.beforeContain=""
      this.widthLink=100
      this.widthSearch=0
      this.fontsize=14
   },
   graphData(val) {
     if("undefined" == typeof val[2]||"undefined" == typeof val[0])
     return;
     let from=val[2].substring(0,3)
     let to=val[0].substring(0,3)
     let fromIndex=-1,toIndex=-1,fromEnd=-1,toEnd=-1
     let str1="",str2="",str3="",str4="",str5=""
     for(let i=0;i<=this.search.length-4;i++)
     {
       if(this.search.substring(i,i+3)==from||this.search.substring(i,i+1)>='A'&&this.search.substring(i,i+1)<='Z'&&i>=1&&fromIndex==-1)
        {
          fromIndex=i
           for(let j=i+3;j<=this.search.length;j++)
           {
             if(this.search.substring(j,j+1)==' '&&this.search.substring(j+1,j+2)<'A'&&this.search.substring(j+1,j+2)>'Z'||j==this.search.length)
              {
                fromEnd=j;
                break
              }

           }
        }
        if (this.search.substring(i,i+3)==to)
          {  toIndex=i
            for(let j=i+3;j<=this.search.length;j++)
            {
              if(this.search.substring(j,j+1)==' '&&this.search.substring(j+1,j+3)!='pl'||j==this.search.length)
                {
                  toEnd=j
                  break
                }
                else
                {
                  console.log(j-i-2+":"+this.search.substring(j,j+1))
                }
            }
          }

      }
      if(fromIndex!=-1&&toIndex!=-1)
          {
              str1=this.search.substring(0,toIndex)
              str2=this.search.substring(toIndex,toEnd)
              str3=this.search.substring(toEnd,fromIndex)
              str4=this.search.substring(fromIndex,fromEnd)
              str5=this.search.substring(fromEnd)
          }
          console.log(toIndex,toEnd,fromIndex,fromEnd)
          console.log("1:"+str1)
          console.log("2:"+str2)
          console.log("3:"+str3)
          console.log("4:"+str4)
          console.log("5:"+str5)
          this.str[0]=str1;
          this.str[1]=str2;
          this.str[2]=str3;
          this.str[3]=str4;
          this.str[4]=str5;
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
    selectChage()
    {
       let Obj = {}
      Obj.query = this.containSearch
      Obj.flag = 1
      this.$emit('choosedQuery', Obj)
    },
    querySearch(query) {
      if (query !== '') {
        this.options = this.fuse.search(query)
      } else {
        // this.options = []
      }
    },
      proceed() {
      let Obj = {}
      Obj.query = this.search
      Obj.flag = 2
      this.$emit('getQuery')
      this.$emit('choosedQuery', Obj)
      },
      proceedContinue() {
      this.$emit('getMessage');
    },
    widthChange()
    {
      this.containSearch=this.search
      this.containLink=""
      this.widthLink=0
      this.widthSearch=100
      this.fontsize=0
      document.getElementById('select').focus();
    }
  }
}
</script>

<style lang="scss" scoped>

.header-search-select {
  font-size: 18px;
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
}
</style>
