<template>
  <div style="height: 42px; margin-top: 10px">
    <el-col :span="24" style="display:flex;align-items:center;flex-wrap: nowrap;justify-content: space-around;">
      <el-tooltip content="directly return final result">
        <el-button class="select-button" @click="modeSelect('normal')">Normal query</el-button>
      </el-tooltip>
      <el-tooltip content="round by round">
        <el-button class="select-button" @click="modeSelect('interactive')">Interactive query</el-button>
      </el-tooltip>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "ModeSelect",
  data() {
    return {
      status: ""
    }
  },
  methods: {
    modeSelect(mode) {
      this.$emit("modeSelect", mode)
      this.status = mode
    }
  }
}
</script>

<style scoped>
.select-button {
  height: 42px;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
}

.select-button:hover {
  color: black !important;
}

.select-button:focus {
  color: black !important;
}
</style>
