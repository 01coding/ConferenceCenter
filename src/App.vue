<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->

    <router-view/>
    <NEXT></NEXT>
  </div>
</template>

<script>
  import NEXT from "./include/NEXT";
  export default {
    name: 'App',
    components: {NEXT}
  }
</script>

<style>
  body {
    background: #f5f5f7;
  }

  #app {
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    font-family: 'Microsoft YaHei UI Light', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
    /*margin-top: 60px;*/
    /*overflow: 'overlay';*/
  }

  pre {
    font-family: 'Microsoft YaHei UI Light', Helvetica, Arial, sans-serif;
  }

  ::-webkit-scrollbar {
    /*width: 2px;*/
    width: 8px;
    margin-left: -8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    /*box-shadow: inset 0 0 5px grey;*/
    /*background: #fafafa;*/
    background: transparent;
    /*background: white;*/
    /*border-radius: 2px;*/
    border-radius: 8px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    /*background: #009688;*/
    background: #9e9e9e;
    border-radius: 8px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    /*background: #009688;*/
    background-color: #757575;
  }

  .pagination li.active {
    background-color: teal !important;
  }
</style>
