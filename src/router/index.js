import { createRouter, createWebHashHistory } from "vue-router";

// 1. 定义路由组件.
import Home from "@/components/home/index.vue";
import About from "@/components/about/index.vue";
import Earth from "@/components/earth/index.vue";
import Compass from "@/components/compass/index.vue";
import Slide from "@/components/slide/index.vue";

// 2. 定义一些路由
const routes = [
  {
    path: "/",
    component: Home,
    name: "Home",
  },
  {
    path: "/about",
    component: About,
    name: "About",
  },
   {
    path: "/earth",
    component: Earth,
    name: "Earth",
  },
   {
    path: "/compass",
    component: Compass,
    name: "Compass",
  },
  {
    path: "/slide",
    component: Slide,
    name: "Slide",
  },
];

// 3. 创建路由实例并传递 `routes` 配置
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

export default router;
