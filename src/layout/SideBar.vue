<template>
  <div id="root">
    <div class="query-container">
      <div class="query-wrap">
        <div class="query-header">
          <span>Sample Queries</span>
        </div>
        <div class="query-itemcontainer">
          <div class="query-maincontainer">
            <ul class="query-main">
              <li v-for="query in queries" :key="query.query">
                <span>{{ query.query }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sampleQueries from '@/data/SampleQueries'

export default {
  name: "SideBar",
  data() {
    return {
      queries: []
    }
  },
  mounted() {
    this.queries = sampleQueries
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
}

.query-container .query-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

/*header*/
.query-header {

  height: 28px;
  font-size: 14px;
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
  width: 600px;
  height: 1200px;
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
  height: 36px;
  padding: 10px;
  cursor: pointer;
  font-size: 12px;
}


</style>
