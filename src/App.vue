<template>
  <div class="background">
    <div class="nav">
      <router-link to="/">home</router-link>
      <router-link to="/about">about</router-link>
        <router-link to="/earth">earth</router-link>
          <router-link to="/compass">compass</router-link>
            <router-link to="/slide">slide</router-link>
              <router-link to="/d3">d3</router-link>
                <router-link to="/D3js">D3js</router-link>
    </div>
    <transition name="slide-fade">
      <router-view v-slot="{ Component, route }">
        <keep-alive>
          <component :is="Component" :key="route.name || undefined" />
        </keep-alive>
      </router-view>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.background {
  height: 100%;
  background-image: url("assets/bg.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  .nav {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    a {
      display: inline-block;
      margin: 0 6px;
    }
  }
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: matrix(1, 0, 0, 1, 20, 0);
  opacity: 0;
}
</style>
