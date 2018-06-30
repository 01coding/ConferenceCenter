<template>
  <div>
    <!--<header>-->
    <!--<div class="top-nav">-->
    <!--<div class="container">-->
    <!--<div class="nav-wrapper">-->
    <h4 class="header">发布新会议</h4>
    <!--</div>-->
    <!--</div>-->
    <!--<div class="divider"></div>-->
    <!--</div>-->
    <!--</header>-->
    <!--<div class="container">-->
    <div class="row">
      <form class="col s12">
        <div class="row">
          <div class="input-field col s8">
            <input id="conf-topic" type="text" v-model="conf_topic" data-length="40"/>
            <label for="conf-topic">会议名称</label>
          </div>
          <div class="input-field col s4">
            <select id="conf-field-select">
              <option value="" disabled selected>选择领域</option>
              <option value="1">机器视觉</option>
              <option value="2">运筹学</option>
            </select>
            <label for="conf-field-select">会议领域</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <textarea id="conf-desc" class="materialize-textarea"></textarea>
            <label for="conf-desc">会议简介</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <input id="conf-start-date" type="text" class="datepicker"/>
            <label for="conf-start-date">会议开始日期</label>
          </div>
          <div class="input-field col s6">
            <input id="conf-end-date" type="text" class="datepicker"/>
            <label for="conf-end-date">会议结束日期</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s8">
            <input id="conf-location" type="text"/>
            <label for="conf-location">会议地点</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <textarea id="conf-eassy-info" class="materialize-textarea"></textarea>
            <label for="conf-eassy-info">征文信息</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <textarea id="conf-eassy-inst" class="materialize-textarea"></textarea>
          </div>
        </div>
      </form>
    </div>
    <!--</div>-->
  </div>
</template>

<script>
  export default {
    name: "NewConference",
    data: function () {
      return {
        conf_topic: ""
      };
    },
    created: function () {
      $(document).ready(function () {
        $('#conf-topic').characterCounter();
        // $('#conf-start-date').datepicker();
        // $('#conf-end-date').datepicker();
        $('.datepicker').datepicker();
        $('.dropdown-trigger').dropdown();
        $('select').formSelect();
      });
    }
  }
</script>

<style scoped>
  /*#conf-topic {*/
  /*font-size: 5em;*/
  /*}*/
</style>
