<template>
  <div class="content">
    <div class="earth-box">
      <div class="earth"></div>
      <div class="ring">
        <div class="rotate">
          <div class="item item-1">1</div>
          <div class="item item-2">2</div>
          <div class="item item-3">3</div>
          <div class="item item-4">4</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'Earth'
}
</script>

<style lang="scss" scoped>
:root {
  --stars: 5vw 15vh 2px white, 1vw 33vh 0px white, 2vw 25vh 2px white, 10vw 10vh 2px white, 12vw 20vh 0px white, 30vw 15vh 2px white, 16vw 5vh 2px white, 24vw 10vh 0px white, 32vw 40vh 0px white, 33vw 35vh 2px white, 12vw 38vh 2px white, 24vw 10vh 0px white, 33vw 5vh 2px white, 20vw 10vh 0px white, 80vw 10vh 2px white, 62vw 20vh 0px white, 60vw 15vh 2px white, 70vw 7vh 0px white, 62vw 50vh 0px white, 65vw 35vh 2px white, 64vw 10vh 0px white, 85vw 2vh 0px white, 92vw 40vh 0px white, 75vw 35vh 2px white, 90vw 10vh 0px white, 80vw 33vh 2px white, 80vw 10vh 0px white, 95vw 2vh 2px white, 95vw 25vh 0px white, 65vw 25vh 0px white, 85vw 20vh 0px white, 75vw 17vh 0px white, 25vw 25vh 0px white,95vw 95vh 2px white, 1vw 90vh 0px white, 2vw 80vh 2px white, 10vw 70vh 2px white, 12vw 65vh 0px white, 30vw 80vh 2px white, 16vw 85vh 2px white, 14vw 50vh 0px white, 5vw 55vh 0px white, 20vw 58vh 2px white, 80vw 38vh 2px white, 90vw 90vh 0px white, 90vw 95vh 2px white, 88vw 10vh 0px white, 80vw 10vh 2px white, 62vw 20vh 0px white, 60vw 15vh 2px white, 70vw 7vh 0px white, 62vw 50vh 0px white, 65vw 35vh 2px white, 64vw 10vh 0px white, 85vw 55vh 0px white, 92vw 60vh 0px white, 75vw 67vh 2px white, 60vw 80vh 0px white, 56vw 95vh 2px white, 75vw 70vh 0px white, 70vw 96vh 2px white, 79vw 87vh 0px white, 80vw 78vh 0px white, 85vw 70vh 0px white, 90vw 80vh 0px white, 25vw 25vh 0px white;
}

.content {
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
  &:before {
    content: ' ';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 50%;
      border-radius: 100%;
      width: 3px;
      height: 4px;
      z-index: -1;
      opacity: 0.3;
      box-shadow: var(--stars);
  }
  // 地球
  .earth-box{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width:400px;
    height: 400px;
    
    .earth {
      position: relative;
      perspective: 400vmin;
      transform-style: preserve-3d;
      width: min(80vmin, 320px);
      height: min(80vmin, 320px);
      z-index: 9;
      &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0%;
        left: 0%;
        background-image: url("../../assets/earth.png") ;
        background-repeat: repeat-x;
        background-size: cover;
        border-radius: 50%;
        animation: rotate 300s infinite linear;
        box-shadow: -80px -15px 80px 10px rgba(0,0,0,.9) inset, -10px 0px 15px -7px #f0df1759;
      }
      @keyframes rotate {
        0% {
          background-position: 0px 0px;
        }
        100% {
          background-position:1200px 0px;
        }
      }
    }
   
    // 环
    .ring {
      position: absolute;
      width: 100%;
      height: 100%;
      perspective: 400vmin;
      transform-style: preserve-3d;
      perspective-origin:center;
      z-index: 8;
      .rotate {
        transform-style: preserve-3d;
        position: absolute;
        left: 50%;
        top:50%;
        width: 200%;
        height: 200%;
        transform-origin: 50% 50%;
        border: 1px #fff solid;
        border-radius: 50%;
        transform: translate(-50%,-40%)  rotateX(-110deg) rotateY(20deg);//rotateX(70deg)
        box-sizing: border-box;
        //  animation: aaa 30s infinite linear;
        @keyframes aaa {
          0% {
             transform: translate(-50%,-40%)  rotateX(-110deg) rotateY(20deg) rotateZ(0) ; 
          }
          100% {
             transform: translate(-50%,-40%)  rotateX(-110deg) rotateY(20deg) rotateZ(-360deg) ; 
          }
        }
        .item {
          position: absolute;
          width:60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translate(-50%,-50%) rotateX(110deg);
          background-color: #ffaa0059;
          border-radius: 50%;
          color:#fff;
          &.item-1 {
            top: 0;
            left: 50%;
          }
          &.item-2 {
            top: 50%;
            right: -60px;
          }
          &.item-3 {
            bottom: -60px;
            left: 50%;
          }
          &.item-4 {
            top: 50%;
            left: 0%;
          }
        }
      }
    }
  }
}


</style>