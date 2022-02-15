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
    <el-button type="primary" class="search-icon" @click="proceed">submit query</el-button>
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
  watch:{
   query(val)
    {
      this.search=val;
      
    }
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
      width: 15%;
    }
  }
}
</style>
