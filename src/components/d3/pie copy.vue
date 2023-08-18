<script>
import { onMounted, reactive } from 'vue'
import * as d3 from "d3"
export default {
  name: "Pie",

  setup() {
    const letterAspectRatio = {
      ' ': 0.3329986572265625,
      a: 0.5589996337890625,
      A: 0.6569992065429687,
      b: 0.58599853515625,
      B: 0.6769989013671875,
      c: 0.5469985961914062,
      C: 0.7279998779296875,
      d: 0.58599853515625,
      D: 0.705999755859375,
      e: 0.554998779296875,
      E: 0.63699951171875,
      f: 0.37299957275390627,
      F: 0.5769989013671875,
      g: 0.5909988403320312,
      G: 0.7479995727539063,
      h: 0.555999755859375,
      H: 0.7199996948242188,
      i: 0.255999755859375,
      I: 0.23699951171875,
      j: 0.26699981689453123,
      J: 0.5169998168945312,
      k: 0.5289993286132812,
      K: 0.6899993896484375,
      l: 0.23499908447265624,
      L: 0.5879989624023437,
      m: 0.854998779296875,
      M: 0.8819992065429687,
      n: 0.5589996337890625,
      N: 0.7189987182617188,
      o: 0.58599853515625,
      O: 0.7669998168945312,
      p: 0.58599853515625,
      P: 0.6419998168945312,
      q: 0.58599853515625,
      Q: 0.7669998168945312,
      r: 0.3649993896484375,
      R: 0.6759994506835938,
      s: 0.504998779296875,
      S: 0.6319992065429687,
      t: 0.354998779296875,
      T: 0.6189987182617187,
      u: 0.5599990844726562,
      U: 0.7139999389648437,
      v: 0.48199920654296874,
      V: 0.6389999389648438,
      w: 0.754998779296875,
      W: 0.929998779296875,
      x: 0.5089996337890625,
      X: 0.63699951171875,
      y: 0.4959991455078125,
      Y: 0.66199951171875,
      z: 0.48699951171875,
      Z: 0.6239990234375,
      '0': 0.6,
      '1': 0.40099945068359377,
      '2': 0.6,
      '3': 0.6,
      '4': 0.6,
      '5': 0.6,
      '6': 0.6,
      '7': 0.5469985961914062,
      '8': 0.6,
      '9': 0.6,
      '[': 0.3329986572265625,
      ']': 0.3329986572265625,
      ',': 0.26399993896484375,
      '.': 0.26399993896484375,
      ';': 0.26399993896484375,
      ':': 0.26399993896484375,
      '{': 0.3329986572265625,
      '}': 0.3329986572265625,
      '\\': 0.5,
      '|': 0.19499969482421875,
      '=': 0.604998779296875,
      '+': 0.604998779296875,
      '-': 0.604998779296875,
      _: 0.5,
      '`': 0.3329986572265625,
      ' ~': 0.8329986572265625,
      '!': 0.3329986572265625,
      '@': 0.8579986572265625,
      '#': 0.6,
      $: 0.6,
      '%': 0.9699996948242188,
      '^': 0.517999267578125,
      '&': 0.7259994506835937,
      '*': 0.505999755859375,
      '(': 0.3329986572265625,
      ')': 0.3329986572265625,
      '<': 0.604998779296875,
      '>': 0.604998779296875,
      '/': 0.5,
      '?': 0.53699951171875,
    };
    const init = () => {
      const getWordWidth = (word, fontSize = 14) => word.split('').reduce((acc, cur) => {
        return acc + letterAspectRatio[cur] * fontSize
      }, 0);

      const getOffsetX = (name) => {
        return getWordWidth(name) + 20
      }

      const getAxis = (centerX, centerY, centerZ, distance) => {
        // 当前处于第一、四象限
        if (centerY <= 0) {
          const cos = Math.abs(centerX / centerZ)
          const sin = Math.abs(centerY / centerZ)
          const x = centerX >= 0 ? cos * distance : -cos * distance
          const y = -sin * distance
          return [x, y]
        }
        // 当前处于第二、三象限
        const cos = Math.abs(centerY / centerZ)
        const sin = Math.abs(centerX / centerZ)
        const x = centerX > 0 ? sin * distance : -sin * distance
        const y = cos * distance
        return [x, y]
      }

      const animatePolyline = (d, i, options) => {
        const { datasets, points, arc, distance } = options
        const centerX = arc.centroid(d)[0]
        const centerY = arc.centroid(d)[1]
        const centerZ = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2))
        const offsetX = getOffsetX(datasets[i].name)
        const [X, Y] = getAxis(centerX, centerY, centerZ, distance)
        points.push({ [datasets[i].name]: [X, Y] })
        if (centerX >= 0) {
          return t => {
            const x = centerX + (X - centerX) * t
            const y = centerY + (Y - centerY) * t
            return `${centerX},${centerY} ${x},${y}, ${x + offsetX},${y}`
          }
        }
        return t => {
          const x = centerX + (X - centerX) * t
          const y = centerY + (Y - centerY) * t
          return `${centerX},${centerY} ${x},${y}, ${x - offsetX},${y}`
        }
      }

      const animateText = (selection, options) => {
        const { datasets, points, offsetY } = options
        selection
          .attrTween('x', (_d, i) => {
            const { name } = datasets[i]
            const [x] = points[i][name]
            const offsetX = getOffsetX(name)
            if (x > 0) {
              return t => (x + 5) * t
            }
            return t => (x - offsetX + 5) * t
          })
          .attrTween('y', (_d, i) => {
            const { name } = datasets[i]
            const [, y] = points[i][name]
            return t => (y - offsetY) * t
          })
      }

      const animatePercentage = (selection, options) => {
        const { datasets, points, r1 } = options
        selection
          .attrTween('x', (d, i) => {
            const { name } = datasets[i]
            const [x] = points[i][name]
            const offsetX = getOffsetX(name)
            if (x > 0) {
              return t => x + offsetX + r1 - 10
            }
            return t => x - offsetX - r1 - 10
          })
          .attrTween('y', (d, i) => {
            const { name } = datasets[i]
            const [, y] = points[i][name]
            return t => y + 4
          })
      }

      const animateCircle = (selection, options) => {
        const { datasets, points, r1 } = options
        selection
          .attrTween('cx', (d, i) => {
            const { name } = datasets[i]
            const [x] = points[i][name]
            const offsetX = getOffsetX(name)
            if (x > 0) {
              return t => x + offsetX + r1
            }
            return t => x - offsetX - r1
          })
          .attrTween('cy', (d, i) => {
            const { name } = datasets[i]
            const [, y] = points[i][name]
            return t => y
          })
      }

      (() => {

        const generatePolyline = selection => {
          // 生成折线
          selection.append('polyline')
            .attr('class', 'polyline')
            .transition()
            .duration(1000)
            .attrTween('points', (d, i) => animatePolyline(d, i, { arc, datasets, points, distance }))
            .attr('stroke', '#6F68A7')
            .attr('fill', 'none')
        };

        const generateText = (selection) => {
          // 添加文字
          selection.append('text')
            .attr('class', 'text')
            .style('font-size', '14px')
            .style('opacity', 0)
            .transition()
            .duration(1000)
            .call(selection => animateText(selection, { datasets, points, offsetY }))
            .style('opacity', 1)
            .attr('fill', '#6F68A7')
            .text((d, i) => datasets[i].name)
        }

        const generatePercentage = (selection) => {
          // 添加百分比
          selection.append('text')
            .attr('class', 'text')
            .attr('fill', '#6F68A7')
            .style('font-size', '12px')
            .style('opacity', 0)
            .transition()
            .duration(1000)
            .call(selection => animatePercentage(selection, { datasets, points, r1 }))
            .style('opacity', 1)
            .text((d, i) => {
              const sum = datasets.reduce((acc, cur) => acc + cur.value, 0)
              return `${datasets[i].value / sum * 100}%`
            })
        }

        const generateCircle = (selection) => {
          // 添加圆点
          selection.append('circle')
            .attr('class', 'circle')
            .transition()
            .duration(1000)
            .call(selection => animateCircle(selection, { datasets, points, r1 }))
            .attr('r', r1)
            .attr('fill', 'none')
            .attr('stroke', '#6F68A7')
        }

        const generateArcs = (selection) => {
          selection
            .selectAll('path')
            .data(arcs)
            .enter()
            .append('g')
            .attr('class', 'path-group')
            .append('path')
            .transition()
            .duration(1000)
            .attr('d', arc)
            .attr('fill', (d, i) => d3.schemePaired[i])
            .attrTween('d', (d, i) => {
              const interpolate = d3.interpolate(d.startAngle, d.endAngle)
              return t => {
                d.endAngle = interpolate(t)
                return arc(d)
              }
            })
        }

        const datasets = [
          { name: 'cat', value: 10 },
          { name: 'dog', value: 20 },
          { name: 'pig', value: 30 },
          { name: 'cow', value: 40 },
          { name: 'bird', value: 50 },
          { name: 'fish', value: 60 },
          { name: 'snake', value: 70 },
          { name: 'mouse', value: 80 },
          { name: 'monkey', value: 90 },
          { name: 'elephant', value: 100 },
        ]
        const width = 600
        const height = 400
        const r = 100;
        const r1 = 20
        const points = []
        const offsetY = 10;
        const distance = r + 50;

        const svg = d3.select('#pie')
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .attr('class', 'svg')
          .attr('viewBox', `-${width / 2} -${height / 2} ${width} ${height}`)
        const arcs = d3.pie()(datasets.map(data => data.value))
        const arc = d3.arc()
          .outerRadius(r)
          .innerRadius(0)

        svg.append('g')
          .attr('class', 'path-groups')
          .call(generateArcs)

        svg.selectAll('.path-group')
          .call(generatePolyline)
          .call(generateText)
          .call(generatePercentage)
          .call(generateCircle)

      })()

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
