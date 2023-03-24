<script>
import { reactive } from 'vue';
import VirtualList from '../VirtualList/index.vue'
export default {
  name: "Home",
  components:{
    VirtualList
  },  
 
  setup() {
    let list = reactive([])
    list = new Array(200).fill({label:''}).map((el,i)=>({label:`数据${i}`}))
    return {
      list
    }
  },
};
</script>

<template>
  <div class="home">
    <VirtualList :data="list"/>
  </div>
</template>

<style lang="scss" scoped>
.home {
  height: 100%;
  // background-color: #fff;
}
</style>
