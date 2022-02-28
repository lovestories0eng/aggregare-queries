<template>
  <div :class="{'show':show}" class="header-search">
    <el-select
      ref="headerSearchSelect"
      v-model="search"
      :remote-method="querySearch"
      filterable
      remote
      placeholder="Search"
      class="header-search-select"
    >
      <el-option v-for="{ item } in options" :key="item.query" :value="item.query" :label="item.query" />
    </el-select>
    <el-tooltip content="submit query">
      <el-button type="primary" class="search-icon" @click="proceed">
        <svg t="1646027529363" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2442" width="200" height="200"><path d="M439.488 960l124.416-169.984-124.416-35.84L439.488 960 439.488 960 439.488 960M0 559.936l353.472 107.072 435.328-369.6-337.408 398.144 377.92 116.736L1024 64.064 0 559.936 0 559.936 0 559.936M0 559.936" p-id="2443" fill="#333333"></path></svg>
      </el-button>
    </el-tooltip>
     <el-tooltip content="continue">
      <el-button type="primary" :disabled="disabled"  @click="proceedContinue">
        <svg t="1646027791988" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2864" width="200" height="200"><path d="M104 0v1024l816-512z" p-id="2865"></path></svg>
      </el-button>
    </el-tooltip>
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
    }
  },
  data() {
    return {
      search: '',
      options: [],
      searchPool: [],
      show: true,
      fuse: undefined
    }
  },
  watch:{
   query(val)
    {
      this.search=val;

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
    querySearch(query) {
      if (query !== '') {
        this.options = this.fuse.search(query)
      } else {
        this.options = []
      }
    },
      proceed() {
      this.$emit('getQuery');
    },
      proceedContinue() {
      this.$emit('getMessage');  
    }
  }
}
</script>

<style lang="scss" scoped>
.header-search {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
  font-size: 0 !important;

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

  &.show {
    .header-search-select {
      width: 85%;
    }
    .search-icon {
      cursor: pointer;
      font-size: 14px;
      vertical-align: middle;
      
    }
  }
}
</style>
