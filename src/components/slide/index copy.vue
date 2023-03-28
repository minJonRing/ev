<template>
  <div class="slide">
    <Swiper ref="imgBoxRef" class="img">
      <swiperWrapper>
        <swiperSlide>
          <img ref="imgRef" :src="cjt" alt="">
        </swiperSlide>
      </swiperWrapper>
    </Swiper>
    <div ref="touchRef" class="touch"></div>
  </div>
</template>

<script>
import c from '@/assets/c.jpeg'
import { onMounted, ref } from 'vue'
import { Swiper, swiperWrapper, swiperSlide } from 'swiper/vue';
export default {
  name:'Slide',
  components:{
    Swiper, swiperWrapper, swiperSlide
  },
  setup(){
    const cjt = ref(null)
    cjt.value = c
    const wh = window.innerHeight
    const imgRef = ref(null)
    const touchRef = ref(null)
    const imgBoxRef = ref(null)

    const statr = ref(0)
    let isMouse = false
    const handleStart = (e)=>{
      statr.value = e.clientY
      isMouse = true
    }

    const handleMove = (e)=>{
      if(isMouse){
        const m = e.clientY
        const sub = statr.value - m
        imgBoxRef.value.scrollTop = imgBoxRef.value.scrollTop + sub
        statr.value = m
      }
    }

    const handleUp = (e)=>{
      isMouse = false
    }

    const init = ()=>{
      const ih = imgRef.value.clientHeight;
       touchRef.value.addEventListener('mousedown', handleStart)
      touchRef.value.addEventListener('mousemove', handleMove)
      document.addEventListener('mouseup', handleUp)

    }
    onMounted(()=>{
      init()
    })
    return {
      imgBoxRef,
      imgRef,
      touchRef,
      cjt,
    }
  }
}
</script>

<style lang="scss" scoped>
.slide {
  position: relative;
  height: 100%;
  .img {
    height: 100%;
    overflow:auto;
    pointer-events: none;
    img {
      display: block;
      width: 100%;
    }
  }
  .touch {
    position: absolute;
    top: 30%;
    width: 100%;
    height: 30vh;
    background-color: rgba(255,255,255,.8);
  }
}
</style>