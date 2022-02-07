<template>
  <!--<div id="root">-->
  <!--  <div class="query-container">-->
  <!--    <div class="query-wrap">-->
  <!--      <div class="query-header">-->
  <!--        <span>Sample Queries</span>-->
  <!--      </div>-->
  <!--      <div class="query-itemcontainer">-->
  <!--        <div class="query-maincontainer">-->
  <!--          <ul class="query-main">-->
  <!--            <li v-for="query in sampleQueries" :key="query.query">-->
  <!--              <span>{{ query.query }}</span>-->
  <!--            </li>-->
  <!--          </ul>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
  <!--</div>-->
  <div id="side-bar">
    <el-table
      stripe
      :data="sampleQueries"
      :height="autoHeight.height"
    >
      <el-table-column
        prop="query"
        label="sample queries"
        align="center"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  props: {
    sampleQueries: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      windowHeight: 0,
      autoHeight: {
        height: ''
      },
    }
  },
  created() {
    window.addEventListener('resize', this.getHeight)
    this.getHeight()
  },
  destroyed() {
    window.removeEventListener('resize', this.getHeight)
  },
  methods: {
    getHeight() {
      this.windowHeight = window.innerHeight
      this.autoHeight.height = (this.windowHeight - 40) + 'px';
      console.log(this.autoHeight.height)
    },
  }
}
</script>

<style>
/*base*/
body {
  background: #fff;
}

.query-container {
  width: 300px;
  float: left;
   font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;

}

.query-container .query-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

/*header*/
.query-header {

  height: 28px;
  font-size: 20px;
  border: 2px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
  text-align: center;
  background-color: gainsboro;
}


/*main*/
.query-itemcontainer {
  background-color: gainsboro;
  margin-top: 10px;
  border-radius: 3px;
  padding: 5px;
}

.query-maincontainer {
  width: 100%;
  height: 550px;
  overflow: auto;

}

.query-main {
  float: left;
}

.query-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}

/*item*/

li {

  padding: 10px;
  cursor: pointer;
  font-size: 14px;
}


</style>
