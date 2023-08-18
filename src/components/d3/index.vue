<script>
import { onMounted, reactive } from 'vue'
import Rect from './rect.vue'
import Pie from './pie.vue'
export default {
  name: "Home", 
  components:{
    Rect,
    Pie
  },
  setup() {
    onMounted(()=>{
    })
  },
}
</script>

<template>
  <div id="chart">
    <Rect />
    <Pie />
  </div>
</template>
<style lang="scss" scoped>
.chart {
  height: 100%;
}
</style>
