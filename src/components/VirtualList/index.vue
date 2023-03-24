<script>
import { computed, onActivated, onMounted, ref, toRefs } from 'vue';
export default {
  name: "Home",
  props: {
    data:{
      tyoe:Array,
      default:()=>{
        return []
      }
    }
  },
  setup(props) {
    const { data } = toRefs(props)

    const listRef = ref()

    const vData = ref([])

    const scrollRef = ref()
    const scrollTop = ref(0)

    const backgroundHerght = computed(()=> data.value.length*40+'px')

    const onScroll = (e)=>{
      const s = e.target.scrollTop;
      scrollTop.value = s
      updataVData(s)
    }

    const updataVData = (value)=>{
      const start = Math.floor(value/40)
      const end = start + 10;
      vData.value = data.value.slice(start,end)
      listRef.value.style.transform = `translate(0,${start*40}px)`
    }

    onMounted(()=>{
      updataVData(0)
    })

    onActivated(()=>{
      scrollRef.value.scrollTop = scrollTop.value
    })

    return {
      scrollRef,
      listRef,
      vData,
      backgroundHerght,
      // function
      onScroll
    }
  },
};
</script>

<template>
  <div class="virtual-list">
    <!-- <div>VirtualList</div> -->
    <div ref="scrollRef" class="list" @scroll="onScroll">
      <div :style="{height: backgroundHerght }"></div>
      <ul ref="listRef" class="list-content">
        <li v-for="item in vData" :key="item.label">{{ item.label }}</li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.virtual-list {
  height: 400px;
  overflow: auto;
  .list {
    position: relative;
    height: 100%;
    overflow: auto;
    .list-content {
      position: absolute;
      top:0;
      width:100%;
      li {
        height: 40px;
      }
    }
  }
}
</style>
