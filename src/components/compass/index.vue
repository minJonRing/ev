<template>
  <div class="compass">
    <div :class="['content', none?'active':'']" :style="{ transform:`rotate(${rotate}deg)`}">
      <div class="item" v-for="(el,i) in list" :key="el.label" :style="{transform:`rotate(${i*deg}deg)`}">
        <div :class="['span',active == i?'active':'']" @click="handleClick(i)">
          <span class="text">{{ el.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue'
export default {
  name:'Compass',
  setup(){
    const list = ref([])
    const _list = []
    for(let i = 2000;i<2024;i++){
      _list.push({label:i})
    }
    list.value = _list;

    const deg = Math.floor(360/_list.length*100)/100;

    const active = ref(0)

    const none = ref(false)

    const rotate = computed(()=>{
      let r = -90 - active.value * deg
      return  r 
    })
    const handleClick = (i)=>{
      active.value = i
      
    }
    return {
      list,
      deg,
      active,
      none,
      rotate,
      handleClick
      // fn
    }
  }
}
</script>

<style lang="scss" scoped>
.compass {
  padding-top: 100px;
  .content{
    position: relative;
    width: 40vw;
    height: 40vw;
    transition-duration: 2000ms;
    // background-color: orange;
    margin: 0 auto;
    &.active {
      transition-duration: none;
    }
    .item {
      position: absolute;
      width: 83%;
      height: 30px;
      line-height: 30px;
      top:50%;
      right: 0;
      margin-top: -15px;
      perspective: 1000vmin;
      transform-style: preserve-3d;
      perspective-origin:0;
      transform-origin: 40%;
      // border: 2px #fff solid;
      .span {
        position: absolute;
        top: -8px;
        height: 46px;
        right: 0;
        display: flex;
        align-items: center;
        border: 2px #fff solid;
        padding:0 12px 0 36px;
        cursor: pointer;
        transform: perspective(100px) rotateY(-30deg);
        perspective: 1000vmin;
        transform-style: preserve-3d;
        border-top-right-radius: 4px 23px;
        border-bottom-right-radius: 4px 23px;
        transition-duration: 2000ms;
        background-image: linear-gradient(0,#59909b,#00344e);
        &.active {
          border-color: deepskyblue;
          background: #009393;
          .text {
            color:#fff
          }
        }
        .text {
          position: relative;
          display: inline-block;
          transform-origin: 100%;
          transform: rotateY(30deg);
          color: aqua;
          z-index:9
        }
      }
    }
  }
}

</style>