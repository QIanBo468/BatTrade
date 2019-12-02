<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* @import'./utils/utils.less'; */
html,body{
  width: 100%;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 12px;
  width: 100%;
  height: 100%;
  /* text-align: center;
  color: #2c3e50; */
  /* margin-top: 60px; */
}
.van-nav-bar .van-icon{
    /* color: #111; */
}
.overText{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
</style>
