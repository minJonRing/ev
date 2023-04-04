<script>
export default {
  name: "About",
  mounted(){
    const A = function(){
      this.name = 'a'
    }
    const AA = function () {
      this.names = 'AA'
    }

    let B = function(){

    }
    B.prototype = {...new A(),...new AA()}
    let c = new B()
    console.log(c.name,c.names)

    class aa {
      constructor(){
        this.name = 'aa'
      }
    }

    class bb extends aa {
      constructor(){
        super()
        this.age = 22
      }
    }

    class cc extends bb {
      constructor(){
        super()
        console.log(this.name,this.age)
      }
    }

    new cc()
  }
};
</script>

<template>
  <div class="about">
    <div>about</div>
    <input />
  </div>
</template>

<style lang="scss" scoped>
.about {
  height: 100%;
  // background-color: #fff;
}
</style>
