<template>
  <div>
    <!--<nav class="transparent black-text">-->
    <!--<div class="nav-wrapper">-->
      <!--<div class="row black-text">-->
        <!--<div class="col s12 black-text">-->
          <!--<a href="#" class="breadcrumb black-text">会议管理</a>-->
          <!--<a href="#" class="breadcrumb">会议管理</a>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--</nav>-->
    <div class="row">
      <div class="col s12 m6">
        <div class="card">
          <div class="card-image">
            <img src="https://materializecss.com/images/sample-1.jpg">
            <span class="card-title">
              <h3>CVPR 2018</h3>
              <h5>2018/06/18 - 06/23</h5>
            </span>
          </div>
          <div class="card-content">
            <div class="row">
              <div class="col s5 offset-s1 center-align">
                <span><h6>投稿数</h6></span>
                <span><h3 class="light-green-text">123</h3></span>
              </div>
              <div class="col s5 center-align">
                <span><h6>注册数</h6></span>
                <span><h3 class="cyan-text">54</h3></span>
              </div>
            </div>
          </div>
          <div class="card-action">
            <div class="row">
              <div class="col s5 offset-s1 center-align">
                <router-link to="/orgspace">管理投稿</router-link>
              </div>
              <div class="col s5 center-align">
                <router-link to="/orgspace">管理注册</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col s12 m6" v-for="conf in conference_list">
        <div class="card">
          <div class="card-image">
            <img src="https://materializecss.com/images/sample-1.jpg">
            <span class="card-title">
              <h3>{{ conf.title }}</h3>
              <h5>2018/06/18 - 06/23</h5>
            </span>
          </div>
          <div class="card-content">
            <div class="row">
              <div class="col s5 offset-s1 center-align">
                <span><h6>投稿数</h6></span>
                <span><h3 class="light-green-text">{{ conf.papers }}</h3></span>
              </div>
              <div class="col s5 center-align">
                <span><h6>注册数</h6></span>
                <span><h3 class="cyan-text">{{ conf.registers }}</h3></span>
              </div>
            </div>
          </div>
          <div class="card-action">
            <div class="row">
              <div class="col s5 offset-s1 center-align">
                <router-link v-bind:to="'/orgspace/conference/'+conf.id+'/contributions'">管理投稿</router-link>
              </div>
              <div class="col s5 center-align">
                <router-link v-bind:to="'/orgspace/conference/'+conf.id+'/registries'">管理注册</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Conferences",
    data: function () {
      return {
        conference_list: []
      };
    },
    created: function () {
      // M.toast({html: 'test'});
      this.refresh();
    },
    methods: {
      refresh: function () {
        this.$axios.post('/api/manage/conferences', {}).then(rsp => {
          let data = rsp.data;
          if (data.status === 'succ') {
            this.conference_list = data.data;
          }
        }).catch(err => {
          M.toast({ html: err.toString() });
        });
      }
    }
  }
</script>

<style scoped>
  .card-content .row {
    margin-bottom: 0;
  }

  .card-action .row {
    margin-bottom: 0;
  }

  .card-action a {
    margin-right: 0 !important;
  }

  .card-content h3, .card-content h6 {
    margin-top: .2em;
    margin-bottom: .2em;
  }

  .card-content h6 {
    font-weight: 600;
  }

  .card-content {
    padding: 1em 1em 0 1em;
  }

  .card-action {
    padding: .5em 1em;
  }

  .card-image {
    height: 240px;
    overflow: hidden;
  }
</style>
