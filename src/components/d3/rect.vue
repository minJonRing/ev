<script>
import { onMounted, reactive } from 'vue'
import * as d3 from "d3"
export default {
  name: "Rect",

  setup() {

    const init = () => {
      const d = d3.select('#rect')

      const svgHeight = 400, svgWidth = 600   //svg画布的宽高
      const margin = { top: 70, bottom: 40, left: 60, right: 40 }  //上下左右边距
      const innerHeight = svgHeight - margin.top - margin.bottom   //核心图形区域的高度
      const innerWidth = svgWidth - margin.left - margin.right   //核心图形区域的宽度


      //添加画布，并设置宽高
      const svg = d
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight);

      const data = {
        date: '2022-7-19',
        visit: [
          { time: '0:00', num: 21 },
          { time: '1:00', num: 15 },
          { time: '2:00', num: 13 },
          { time: '3:00', num: 10 },
          { time: '4:00', num: 9 },
          { time: '5:00', num: 8 },
          { time: '6:00', num: 2 },
          { time: '7:00', num: 3 },
          { time: '8:00', num: 5 },
          { time: '9:00', num: 5 },
          { time: '10:00', num: 4 },
          { time: '11:00', num: 13 },
          { time: '12:00', num: 14 },
          { time: '13:00', num: 17 },
          { time: '23:00', num: 23 }
        ]
      }
      const yScale = d3.scaleLinear()
        .domain([0, d3.max(data.visit, d => +d.num)])  //domain是[0, 访问量的最大值]
        .range([0, innerHeight]);    //range是[0, 核心图形区域的高度]】
      const xScale = d3.scaleBand()
        .domain(data.visit.map(item => item.time)) //domain是由时刻组成的数组
        .range([0, innerWidth])     //range是[0, 核心图形区域的宽度]


      const t = d3.transition()
        .duration(3000);

      svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)
        .selectAll('rect')
        .data(data.visit)
        .enter()
        .append('rect')   //根据访问量数据生成柱子
        .attr('class', 'bar')
        .attr('fill', (d) => d.num > 20 ? '#9cc960' : '#ec5487')
        .attr('height', 0)
        .attr('y', (d, i) => {
          return innerHeight - yScale(d.num)    //根据矩形高度计算矩形的 y 属性
        })
        .attr('width', (innerWidth / data.visit.length) - 5)
        .attr('x', (d, i) => {
          return xScale(d.time)   //根据数据的时刻值计算出矩形的 x 属性
        })
        .text(d => d.num)
        .style('color', '#fff')
        .on('mouseover', ev => {
          const data = ev.srcElement.__data__
          tooltip.html(`时刻：${data.time}<br>访问量：${data.num}万次`)
            .style('left', ev.pageX + 'px')
            .style('top', ev.pageY + 'px')
            .style('opacity', 1)
        })
        .transition(t)
        .attr('height', (d, i) => {   //将数据传入比例尺函数，计算矩形高度
          return yScale(d.num)
        })

      svg.on('mouseover', ev => {
        console.log(ev)
        if (ev.target.tagName !== 'rect') {
          tooltip.style('opacity', 0)
        } else {
          tooltip.style('opacity', 1)
        }
      })

      const xAxis = d3.axisBottom()
        .scale(xScale)

      svg.append('g').call(xAxis)
        .attr('transform', `translate(${margin.left}, ${svgHeight - margin.bottom})`).select('.domain').remove()


      const _yScale = d3.scaleLinear()
        .domain([0, d3.max(data.visit, d => +d.num)])
        .range([innerHeight, 0]);

      const yAxis = d3.axisLeft()
        .scale(_yScale)
      // .tickPadding(10)  //设置刻度和文字的间距
      // .ticks(3)    //显示3个刻度
      // .tickSize(-innerWidth)
      // .select('.domain')
      // .remove()

      svg.append('g').call(yAxis)
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

      svg.append('text')
        .html('Alaso的编程纪 2022/7/19 访问量（单位：万次）')
        .attr('x', margin.left - 15)
        .attr('y', margin.top / 2)
        .attr('transform', 'translate(0,9)')
        .attr('font-size', 18)

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
  <div id="rect"></div>
</template>
<style lang="scss" >
.bar:hover {
  //生成rect的时候给它添加 class=bar
  fill: #a8ced7
}
</style>
<style lang="scss" scoped>
.rect {
  height: 100%;

  .bar:hover {
    //生成rect的时候给它添加 class=bar
    fill: #a8ced7
  }
}
</style>
