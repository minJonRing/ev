<script>
import { onMounted, reactive } from 'vue'
import * as d3 from "d3"
export default {
  name: "Pie",

  setup() {

    const init = () => {
      const d = d3.select('#pie')

      const svgHeight = 400, svgWidth = 600   //svg画布的宽高
      const margin = { top: 70, bottom: 40, left: 60, right: 40 }  //上下左右边距
      const innerHeight = svgHeight - margin.top - margin.bottom   //核心图形区域的高度
      const innerWidth = svgWidth - margin.left - margin.right   //核心图形区域的宽度


      //添加画布，并设置宽高
      const svg = d
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight)
        .attr('viewBox', '-300 -200 600 400')

      const data = {
        date: '2022-7-19',
        visit: [
          {label:'攻击',value:1400},
          {label:'防御',value:1200},
          {label:'气血',value:5200},
          {label:'速度',value:420},
          {label:'灵力',value:1500},
        ]
      }
    
      const t = d3.transition()
        .duration(3000);

      const arcs = d3.pie().value(d=>d.value)(data.visit)
      console.log(arcs)
      const arc = d3.arc()
        .outerRadius(100)
        .innerRadius(0)


      svg.append('g').selectAll('path')
        .data(arcs)
        .enter()
        .append('path')
        .attr('class','path-group')
        .attr('d', arc)
        .attr('fill', (d,i)=>{
          return d3.schemePaired[i]
        })
        .on('mousemove', ev => {
           const data = ev.srcElement.__data__.data
            tooltip.html(`${data.label}:${data.value}`)
            .style('left', ev.pageX+20 + 'px')
            .style('top', ev.pageY +10+ 'px')
            .style('opacity', 1)
        })
     

      // svg.on('mouseover', ev => {
      //   if (ev.target.tagName !== 'rect') {
      //     tooltip.style('opacity', 0)
      //   } else {
      //     tooltip.style('opacity', 1)
      //   }
      // })

      // svg.append('text')
      //   .html('Alaso的编程纪 2022/7/19 访问量（单位：万次）')
      //   .attr('x', 0)
      //   .attr('y',0)
      //   .attr('transform', 'translate(0,9)')
      //   .attr('font-size', 18)

       // toop
      const tooltip = d3.select('body')
        .append('div')
        .attr('class', 'tool-tip')
        .style('position', 'absolute')
        .style('pointer-events', 'none')

    }
    onMounted(() => {
      init()
    })
  },
}
</script>

<template>
  <div id="pie"></div>
</template>
<style lang="scss" >
.bar:hover {
  //生成rect的时候给它添加 class=bar
  fill: #a8ced7
}
</style>
<style lang="scss" scoped>
.pie {
  height: 100%;

  .bar:hover {
    //生成rect的时候给它添加 class=bar
    fill: #a8ced7
  }
}
</style>
