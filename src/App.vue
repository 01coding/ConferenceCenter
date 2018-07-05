<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->

    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
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
    width: 2px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    /*box-shadow: inset 0 0 5px grey;*/
    background: #fafafa;
    /*background: white;*/
    border-radius: 2px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #009688;
    border-radius: 2px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #009688;
  }

  .pagination li.active {
    background-color: teal !important;
  }
</style>
