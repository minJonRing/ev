<template>
  <div class="d3">
    <div class="detail">
      1
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import TWEEN from "@tweenjs/tween.js";
import { nextTick, onMounted, ref } from 'vue';
// import { AES , enc, mode , pad } from 'crypto-js'
import earth from '@/assets/earth.jpeg'
export default {
  name:'D3',
  setup(){
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.set(0, 0, 2000);
    camera.lookAt(0, 0, 0);
    // 环境光
    const allLight = new THREE.AmbientLight(0x666666);
    scene.add(allLight);

    // // 平行光 位置不同，方向光作用于物体的面也不同，看到的物体各个面的颜色也不一样
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    // // 点光源
    const sun = new THREE.SpotLight(0xffffff);
    // sun.position.set(-200, 0, 0);

    // scene.add(sun);

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
    mesh.name = "mesh"
    scene.add(mesh);

    // 环绕器
    const createEmbrace = (c, rotation)=>{
      const {rx,ry,rz}  = rotation
      return function(deg){
        const G = new THREE.Group();
        const g = new THREE.Group()
        const geometry = new THREE.SphereGeometry(50, 64, 32)
        const material = new THREE.MeshPhongMaterial({
          map: loader.load('src/assets/earth.jpeg'),
          bumpMap: loader.load('src/assets/elev_bump_4k.jpeg'),
          bumpScale: 0.005,
          specularMap: loader.load('src/assets/water_4k.png'),
        });
        const m = new THREE.Mesh(geometry, material);
        const x = c*Math.sin(Math.PI * deg)
        const y = c*Math.cos(Math.PI * deg)
        m.position.set(x, y, 0)
        g.add(m);
        G.add(g);
        if(rx){
          G.rotation.x = rx;
        }
        if (ry) {
          G.rotation.y = ry;
        }
        if (rz) {
          G.rotation.z = rz;
        }
        m.name=`embrace${deg}`
        scene.add(G)
        return G
      }
    }
    const embrace = createEmbrace(421,{rx: Math.PI / 1.6 ,ry: Math.PI / 8 })
    const e1 = embrace(0)
    const e2 = embrace(0.5)
    embrace(1)
    embrace(1.5)
    

    // 轨迹
    const createGeometry = (w, map, rotation)=>{
      const { rx, ry, rz } = rotation || {}
      const geometry = new THREE.RingGeometry(0,w,64);
      //圆环材质
      const material = new THREE.MeshLambertMaterial({
        map,// ,
        side: THREE.DoubleSide,
        transparent: true,
        depthWrite: false
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.set(0.5 * Math.PI, 0, 0); //旋转轨道至水平
      if (rx) {
        mesh.rotation.x = rx;
      }
      if (ry) {
        mesh.rotation.y = ry;
      }
      if (rz) {
        mesh.rotation.z = rz;
      }
      scene.add(mesh);
      mesh.name = 'gj'
      return mesh
    }
    createGeometry(422, loader.load('src/assets/material.png'), { rx: Math.PI / 1.6, ry: Math.PI / 8 })

    // 事件
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const controls = new OrbitControls(camera, renderer.domElement);

    function render() {
      controls.update();
      mesh.rotation.y += 0.0005;
      // TWEEN.update();
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }

    const sube = new THREE.Mesh(
      new THREE.BoxGeometry(100,100,100),
      new THREE.MeshBasicMaterial({color:0xff0000})
    )
    sube.position.set(500,0, 500)
    sube.name = 'sube'
    scene.add(sube)

    const reductionMaterial = {}
    const objects = {}
    function Transparent(model) {
      model.traverse((obj) => {
        if (obj.isMesh) {
          obj.material.transparent = true;
          obj.material.opacity = 1;
          obj.material.color = new THREE.Color('rgb( 255 , 255, 255 )');
        }
      })
    }
    function reduction(model) {
      const { name } = model
      if(!!reductionMaterial[name]){
        model.traverse((obj => {
          // if (obj.isMesh) {
            obj.material.copy(reductionMaterial[name])
          // }
        }))
      }
    }

    // var tween = new TWEEN.Tween(e1.rotation)
    //   .to({ y: Math.PI/3 }, 5000)
    //   .start();

    onMounted(()=>{
      document.querySelector('.d3').appendChild(renderer.domElement);
      renderer.domElement.addEventListener('mousemove', (event) => {
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
        // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
        raycaster.setFromCamera(pointer, camera);
        // 获取raycaster直线和所有模型相交的数组集合
        var intersects = raycaster.intersectObjects(scene.children);
        //将所有的相交的模型的颜色设置为红色，如果只需要将第一个触发事件，那就数组的第一个模型改变颜色即可
        let activeName = ''
        if (intersects.length) {
          const { object } = intersects[0]
          const { name } = object
          activeName = name
          if (name) {
            object.traverse((obj) => {
              // if (obj.isMesh) {
              if (!reductionMaterial[name]) {
                reductionMaterial[name] = obj.material.clone(object);
              }
              objects[name] = object
              // }
            })
            Transparent(object)
          }
        }

        for (let name in objects) {
          const el = objects[name];
          if (!!el && name !== activeName) {
            reduction(el)
            nextTick(()=>{
              objects[name] = null
            })
          }
        }
      })
      renderer.domElement.addEventListener('click',(event)=>{
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
         // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
        raycaster.setFromCamera(pointer, camera);
        // 获取raycaster直线和所有模型相交的数组集合
        var intersects = raycaster.intersectObjects(scene.children);
        //将所有的相交的模型的颜色设置为红色，如果只需要将第一个触发事件，那就数组的第一个模型改变颜色即可
        if(intersects.length){
          const { object } = intersects[0]
          const {name} =object
          // Transparent(intersects[0].object)
          // if(!!name){
            console.log(name,object)
            if(name === 'embrace0'){

            }
          // }
        }
        //将所有的相交的模型的颜色设置为红色，如果只需要将第一个触发事件，那就数组的第一个模型改变颜色即可
        
      })
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