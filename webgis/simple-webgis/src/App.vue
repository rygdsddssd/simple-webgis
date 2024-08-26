<template>
  <div id="app">
    <el-container class="app-out-pannel">
      <el-header class="sys-header">WebGIS一张图项目系统</el-header>
      <el-container class="app-content-pannel">
        <el-aside class="sys-menu">左侧菜单栏</el-aside>
        <el-main class="sys-content">
          <MapView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MapView from './components/common/MapView.vue';
export default {
  name: 'App',
  components: {
    MapView,
  },
};
</script>

<style>
html,
body,
#app {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0;
}
.app-out-pannel,
.app-content-pannel {
  height: 100%;
}
.sys-header {
  background-color: #303133;
  line-height: 60px;
  height: 60px;
  color: #fff;
  font-size: 600;
}
.sys-menu {
  background-color: #c0c4cc;
}
.sys-content {
  padding: 5px;
}
</style>

