<template>
  <div style="height: 42px; margin-top: 10px">
    <el-col :span="3">
      <div style="visibility: hidden;">占位</div>
    </el-col>

    <el-col :span="4" style="display:flex;align-items:center;flex-wrap: nowrap;justify-content: space-around;">
      <el-tooltip content="directly return final result">
        <el-button class="select-button" @click="errorBoundClick()">Error-bound model</el-button>
      </el-tooltip>
    </el-col>

    <div v-if="errorBoundModelClick === true && model === 'error-bound model'" id="error-bound">
      <el-col :span="3" style="display:flex;align-items:center;flex-wrap: nowrap;justify-content: space-around;">
        <el-input v-model="errorBound" style="width: 80%;text-align:center;"></el-input>
        <span style="text-align:center; font-size: 12px;">
          error bound
        </span>
      </el-col>

      <el-col :span="4" style="display:flex;align-items:center;flex-wrap: nowrap;justify-content: space-around;">
        <el-input v-model="confidenceLevel" style="width: 100%;"></el-input>
        <span style="width: 78px; text-align:center; font-size: 12px;">
          confidence level
        </span>
      </el-col>

      <el-col :span="1" style="display:flex;align-items:center;flex-wrap: nowrap;justify-content: space-around;">
        <el-tooltip content="submit">
          <el-button type="primary" class="search-icon" @click="modeSelect('normal')">
            <svg t="1654943281654" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1175" width="200" height="200"><path d="M439.488 960l124.416-169.984-124.416-35.84L439.488 960 439.488 960 439.488 960M0 559.936l353.472 107.072 435.328-369.6-337.408 398.144 377.92 116.736L1024 64.064 0 559.936 0 559.936 0 559.936M0 559.936" p-id="1176" fill="#fff"></path></svg>
          </el-button>
        </el-tooltip>
      </el-col>
    </div>

    <div v-else>
      <el-col :span="8">
        <div style="visibility: hidden;">占位</div>
      </el-col>
    </div>

    <el-col :span="1">
      <div style="visibility: hidden;">占位</div>
    </el-col>

    <el-col :span="5" style="display:flex;align-items:center;flex-wrap: nowrap;justify-content: space-around;">
      <el-tooltip content="round by round">
        <el-button class="select-button" @click="chooseInteractive()">Interactive model</el-button>
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
    },
    query: {
      type: String,
      default() {
        return ""
      }
    }
  },
  data() {
    return {
      model: "",
      status: "",
      oldRound: undefined,
      oldMaxRound: undefined,
      errorBoundModelClick: false,
      errorBound: "",
      confidenceLevel: ""
    }
  },
  watch: {
    query: {
      handler() {
        this.status = "unselected"
        this.model = "unselected"
        this.errorBound = ""
        this.confidenceLevel = ""
      },
      immediate: true,
      deep: true
    }
    // maxRound: {
    //   handler(newValue, oldValue) {
    //     console.log("maxRound")
    //     console.log(newValue, oldValue)
    //     if (oldValue !== 0) {
    //       this.status = "unselected"
    //       this.model = "unselected"
    //     }
    //     if (this.oldRound === 0 && this.round === 0) {
    //       this.status = "unselected"
    //       this.model = "unselected"
    //     }
    //   },
    //   immediate: true,
    //   deep: true
    // },
    // round: {
    //   handler(newValue, oldValue) {
    //     console.log("round")
    //     console.log(newValue, oldValue)
    //     this.oldRound = oldValue
    //     if (newValue === 0 && this.maxRound !== 0) {
    //       this.status = "unselected"
    //       this.model = "unselected"
    //     }
    //   },
    //   immediate: true,
    //   deep: true
    // }
  },
  methods: {
    errorBoundClick() {
      if (this.maxRound !== 0 && this.model !== "interactive model") {
        this.model = 'error-bound model'
        this.errorBoundModelClick = true;
        this.$message.success("Successfully choose error-bound model!")
      } else {
        this.$message.error("No query was submitted or another model has been chosen!")
      }
    },
    modeSelect(mode) {
      this.$emit("modeSelect", mode)
      if (this.maxRound !== 0)
        this.status = mode
    },
    chooseInteractive() {
      if (this.maxRound !== 0 && this.model !== "error-bound model") {
        this.status = "interactive"
        this.$message.success("Successfully choose interactive model!")
        this.model = "interactive model"
      } else {
        this.$message.error("No query was submitted or another model has been chosen!")
        return
      }
      this.$emit("modeSelect", "chooseInteractive")
    }
  }
}
</script>

<style scoped>
.select-button {
  padding: 2px;
  height: 42px;
  width: 165px;
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
