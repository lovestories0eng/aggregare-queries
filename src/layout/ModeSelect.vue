<template>
  <div style="height: 42px; margin-top: 10px">
    <el-col :span="12" style="display:flex;align-items:center;flex-wrap: nowrap;justify-content: space-around;">
      <el-tooltip content="directly return final result">
        <el-button class="select-button" @click="modeSelect('normal')">Normal query</el-button>
      </el-tooltip>
    </el-col>
    <el-col :span="4" style="display:flex;align-items:center;flex-wrap: nowrap;justify-content: space-around;">
      <el-tooltip content="round by round">
        <el-button class="select-button" @click="chooseInteractive()">Interactive query</el-button>
      <!-- changeStatus('interactive') -->
      </el-tooltip>
    </el-col>
    <el-col :span="1" style="display:flex;align-items:center;flex-wrap: nowrap;justify-content: space-around;">
      <el-tooltip v-if="status === 'interactive'" content="continue">
        <el-button type="primary" class="search-icon" @click="modeSelect('interactive')">
          <svg t="1646027791988" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2864" width="200" height="200" fill="#fff"><path d="M104 0v1024l816-512z" p-id="2865"></path></svg>
        </el-button>
      </el-tooltip>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "ModeSelect",
  props: {
    maxRound: {
      type: Number,
      default() {
        return 0
      }
    },
    round: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    return {
      status: "",
      oldRound: undefined,
      oldMaxRound: undefined
    }
  },
  watch: {
    maxRound: {
      handler(newValue, oldValue) {
        console.log("maxRound")
        console.log(newValue, oldValue)
        if (oldValue !== 0) {
          this.status = "unselected"
        }
        if (this.oldRound === 0 && this.round === 0) {
          this.status = "unselected"
        }
      },
      immediate: true,
      deep: true
    },
    round: {
      handler(newValue, oldValue) {
        console.log("round")
        console.log(newValue, oldValue)
        this.oldRound = oldValue
        if (newValue === 0 && this.maxRound !== 0) {
          this.status = "unselected"
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    modeSelect(mode) {
      this.$emit("modeSelect", mode)
      if (this.maxRound !== 0)
        this.status = mode
    },
    chooseInteractive() {
      this.$emit("modeSelect", "chooseInteractive")
      if (this.maxRound !== 0) {
        this.status = "interactive"
      }
    }
  }
}
</script>

<style scoped>
.select-button {
  height: 42px;
  width:150px;
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
