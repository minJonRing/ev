<template>
  <div class="earth">
    <div class="orbit-system">
      <div class="system">
        <div class="satellite-orbit" :style="{ transform: `rotateZ(${rotate}deg` }">
          <div class="satellite" :style="{ transform: `rotateZ(${active * 90}deg) rotateY(15deg) rotateX(-75deg)` }" @click="handleClick(0)">SAT1</div>
          <div class="satellite2" :style="{ transform: `rotateZ(${active * 90}deg) rotateY(15deg) rotateX(-75deg)` }" @click="handleClick(1)">SAT2</div>
          <div class="satellite3" :style="{ transform: `rotateZ(${active * 90}deg) rotateY(15deg) rotateX(-75deg)` }" @click="handleClick(2)">SAT3</div>
          <div class="satellite4" :style="{ transform: `rotateZ(${active * 90}deg) rotateY(15deg) rotateX(-75deg)` }" @click="handleClick(3)">SAT4</div>
        </div>
        <div class="planet">PLANET</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'Earth',
  data(){
    return {
      active:0,
      rotate:0
    }
  },
  watch:{
    active(data,old){
      console.log(old,data)
      if(old == 0 && data ==3){
        this.rotate = -90
        console.log(this.rotate)
        return 
      }else if(old === 3 && data == 0){
         this.rotate = 360
         return
      }else{
        this.rotate = this.active * 90
      }
    }
  },  
  methods:{
    handleClick(i){
      this.active = i
    }
  }
}
</script>

<style lang="scss" scoped>
.earth {
  font-family: sans-serif;
  background-color: #2E3445;
  height: 100%;
}
.orbit-system {
  position: relative;
  width: 18em;
  height: 18em;
  margin: 0 auto;
}

.system {
  position: relative;
  width: 100%;
  height: 100%;
  
  transform: rotateX(75deg) rotateY(-15deg);
  transform-style: preserve-3d;
}

.planet, .satellite-orbit, .satellite, .satellite2,.satellite3,.satellite4{
  position: absolute;
  top: 50%;
  left: 50%;
  transform-style: preserve-3d;
   transition-duration: 5000ms;
}

.planet {
  width: 9em;
  height: 9em;
  margin-top: -4.5em;
  margin-left: -4.5em;
  
  border-radius: 50%;
  background-color: rgba(0,0,0);
  color: white;
  
  text-align: center;
  line-height: 9em;
  
  transform: rotateY(15deg) rotateX(-75deg);
}

.satellite-orbit {
  width: 16em;
  height: 16em;
  margin-top: -8em;
  margin-left: -8em;
  
  border: 1px solid black;
  border-radius: 50%;
 
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  // animation-name: orbit;
  // animation-duration: 10s;
  // animation-iteration-count: infinite;
  // animation-timing-function: linear;
}

@keyframes orbit {
  0% {
      transform: rotateZ(0deg);
  }
  100% {
      transform: rotateZ(360deg);
  }
}

.satellite {
  top: 100%;
  width: 3em;
  height: 3em;
  margin-top: -1.5em;
  margin-left: -1.5em;
  
  color: black;
  background-color: #999;
  border-radius: 50%;
  text-align: center;
  line-height: 3em;
  
  // animation-name: invert-orbit;
  // animation-duration: 10s;
  // animation-iteration-count: infinite;
  // animation-timing-function: linear;
}

.satellite2{
  top: 50%;
  left:0%;
  width: 3em;
  height: 3em;
  background-color: #999;
  margin-top:-1.5em;
  margin-left:-1.5em;
  
  color: black;
  border-radius: 50%;
  text-align: center;
  line-height: 3em;
  // animation-name: invert-orbit;
  // animation-duration: 10s;
  // animation-iteration-count: infinite;
  // animation-timing-function: linear;
}

.satellite3{
  top: 0%;
  left:50%;
  width: 3em;
  height: 3em;
  background-color: #999;
  margin-top:-1.5em;
  margin-left:-1.5em;
  
  color: black;
  border-radius: 50%;
  text-align: center;
  line-height: 3em;
  // animation-name: invert-orbit;
  // animation-duration: 10s;
  // animation-iteration-count: infinite;
  // animation-timing-function: linear;
}

.satellite4{
  top: 50%;
  left:100%;
  width: 3em;
  height: 3em;
  background-color: #999;
  margin-top:-1.5em;
  margin-left:-1.5em;
  
  color: black;
  border-radius: 50%;
  text-align: center;
  line-height: 3em;
  // animation-name: invert-orbit;
  // animation-duration: 10s;
  // animation-iteration-count: infinite;
  // animation-timing-function: linear;
}




/*
In order to invert the rotation, do the rotate* transforms in reverse order.

Here, we rotated the system with rotateX(75deg) rotateY(-30deg), and then we are animating the rotation of the orbit with rotateZ(0-360deg). To reverse that, we need to reverse the last transform applied (rotateZ), then rotateY, then rotateX.

The rotateX/Y reversal is easy since it's not animated, so just use its opposite (30deg, -75deg). The rotateZ is trickier since it's animating, but since it's rotating from 0 to 360, we just need to animate the satellite from 360 to 0.
*/
@keyframes invert-orbit {
    0% {
        transform: rotateZ(360deg) rotateY(15deg) rotateX(-75deg);
    }

    100% {
        transform: rotateZ(0deg) rotateY(15deg) rotateX(-75deg);
    }
}


</style>