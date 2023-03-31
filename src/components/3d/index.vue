<template>
  <div class="d3">
    <div class="detail">
      1
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import TWEEN from "@tweenjs/tween.js";
import { onMounted, ref } from 'vue';
// import { AES , enc, mode , pad } from 'crypto-js'
import earth from '@/assets/earth.jpeg'
export default {
  name:'D3',
  setup(){
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.set(0, 500, 2000);
    camera.lookAt(0, 0, 0);
    // 环境光
    const allLight = new THREE.AmbientLight(0x333333);
    scene.add(allLight);

    // // 平行光 位置不同，方向光作用于物体的面也不同，看到的物体各个面的颜色也不一样
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 3, 5);
    scene.add(light);

    // // 点光源
    const sun = new THREE.SpotLight(0xffffff);
    // sun.position.set(-200, 0, 0);

    scene.add(allLight,light,sun);

    const renderer = new THREE.WebGLRenderer({
      // alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const createLine = (color, coordinate)=>{
      const material = new THREE.LineBasicMaterial({ color });
      const {start,end} = {start:[0,0,0],end:[0,0,0],...coordinate}
      const [ia,ib,ic] = start
      const [a, b, c] = end
      const points = [];
      points.push(new THREE.Vector3(ia, ib, ic));
      points.push(new THREE.Vector3(a, b, c));
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      return [geometry,material]
    }

    const [a, b] = createLine(0xff0000,{end:[1000, 0, 0]})
    const [c, d] = createLine(0xffa500,{end:[0, 1000, 0]})
    const [e, f] = createLine(0xffffff,{end:[0, 0, 1000]})
    const line1 = new THREE.Line(a, b);
    const line2 = new THREE.Line(c, d);
    const line3 = new THREE.Line(e, f);
    scene.add(line1);
    scene.add(line2);
    scene.add(line3);

    // 球
    const loader = new THREE.TextureLoader();
    const geometry = new THREE.SphereGeometry(200, 64, 32)
    const material = new THREE.MeshPhongMaterial({
      map: loader.load('src/assets/earth.jpeg'),
      bumpMap: loader.load('src/assets/elev_bump_4k.jpeg'),
      bumpScale: 0.005,
      specularMap: loader.load('src/assets/water_4k.png'),
      // specular: new THREE.Color('grey'),    
      // transparent: true
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    // 环绕器
    let _a, _ap
    _a = new THREE.Group()
    _ap = new THREE.Group()
    const geometry1 = new THREE.SphereGeometry(50, 64, 32)
    const hrq = new THREE.Mesh(geometry1, material);
    hrq.position.set(301,0,0)
    _a.add(hrq);
    _ap.add(_a);
    scene.add(_ap)

    // 轨迹

    //创建轨迹
    const trackGeometry = new THREE.RingGeometry( //圆环几何体
      300,
      302,
      64
    );
    //圆环材质
    let trackMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    });
    let trackMesh = new THREE.Mesh(trackGeometry, trackMaterial);
    trackMesh.position.set(0, 0, 0); //轨道位置
    trackMesh.rotation.set(0.5 * Math.PI, 0, 0); //旋转轨道至水平
    scene.add(trackMesh);

    // 公转

    // _ap.rotation.y = ;

    const controls = new OrbitControls(camera, renderer.domElement);

    function render() {
      controls.update();
      mesh.rotation.y += 0.0005;
      // _ap.rotation.y += 0.05;
      
     
      requestAnimationFrame(render);
      renderer.render(scene, camera);
    }
    onMounted(()=>{
      document.querySelector('.d3').appendChild(renderer.domElement);
      render();
     
    })
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.d3 {
  height: 100%;
  .detail {
    position: absolute;
    top: 0;
    left: 0;
    width:100%;
    height:100%;
    pointer-events: none;
  }
  .can {
    height:100%
  }
}
</style>