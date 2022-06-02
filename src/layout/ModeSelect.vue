<template>
  <div>
    <el-button @click="modeSelect('normal')">Normal query (directly return final result)</el-button>
    <el-button @click="modeSelect('interactive')">Interactive query （round by round）</el-button>
  </div>
</template>

<script>
export default {
  name: "ModeSelect",
  methods: {
    modeSelect(mode) {
      this.$emit("modeSelect", mode)
    }
  }
}
</script>

<style scoped>

</style>
