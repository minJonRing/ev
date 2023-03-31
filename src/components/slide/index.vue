<template>
  <div class="slide">
    <swiper class="mySwiper" 
        :modules="modules"
        direction="vertical"
        slidesPerView="auto"
        
        :freeMode="{
          enabled:true,
          minimumVelocity:0.02,
          momentum:true	,
          momentumBounce:true,
          momentumBounceRatio:1,
          momentumRatio:1,
          momentumVelocityRatio:1,
          sticky:false
        }"
        grabCursor
        :scrollbar="{
          draggable: true,
        }"
        mousewheel
        >
        <swiper-slide>
          <div>
            <img :src="cjt" style="width:100vw">
          </div>
        </swiper-slide>
    </swiper>
    </div>
</template>

<script>
import cjt from '@/assets/c.jpeg'
import { Swiper,SwiperSlide } from 'swiper/vue';
import { Scrollbar, FreeMode,Mousewheel } from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar';
export default {
  name:'Slide',
  components:{
    Swiper, SwiperSlide
  },
  setup(){
    console.log(1)
    new Promise((r)=>{
      console.log(2)
      setTimeout(() => {
        console.log(3)
      }, 0);
      r()
    })
    console.log(4)
    Promise.resolve(5).then((v)=>{
      console.log(v)
    })
    console.log(6)
    setTimeout(() => {
      console.log(7)
    }, 0);
    return {
      cjt,
      modules: [Scrollbar, FreeMode, Mousewheel],
    }
  }
}
</script>

<style lang="scss" scoped>
.slide {
  position: relative;
  height: 100%;
  overflow: hidden;
  .mySwiper {
    height:100%;
    .swiper-slide {
      font-size: 18px;
      height: auto;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
  }
}
</style>