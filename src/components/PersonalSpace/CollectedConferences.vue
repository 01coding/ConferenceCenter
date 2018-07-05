


<template>
  <div>
    <ul class="tabs">
      <li class="tab col s4"><a href="#test1">未开幕</a></li>
      <li class="tab col s4"><a class="active" href="#test2">已开幕</a></li>
      <li class="tab col s4"><a href="#test3">已结束</a></li>
    </ul>

    <div id="test1" class="col s12" style="padding-top: 1%">
      <div class="container">
        <div class="card" v-for="item in this.conferencesBefore">
          <div class="card-image waves-effect waves-block waves-light"
               style="height: 10rem; background:black;">
            <img class="activator" style="opacity: 0.5;" src="/static/bg2.jpg"></img>
            <!--TODO: 这里放会议的背景图-->
            <router-link v-bind:to="'/conference/'">
            <span class="card-title" style="font-weight: bold">
              {{item.title}}
            </span>
            </router-link>
          </div>
          <div class="card-content">
          <span class="card-title activator grey-text text-darken-4">
            <i class="material-icons right">language</i>
          </span>
            <p>{{item.start_date}}, {{item.convening_place}}</p>
            <p style="height:1rem;"></p>
            <p>{{item.introduction}}</p>
          </div>

        </div>
      </div>
    </div>
    <div id="test2" class="col s12" style="padding-top: 1%">
      <div class="container">
        <div class="card" v-for="item in this.conferencesOn">
          <div class="card-image waves-effect waves-block waves-light"
               style="height: 10rem; background:black;">
            <img class="activator" style="opacity: 0.5;" src="/static/bg2.jpg"></img>
            <!--TODO: 这里放会议的背景图-->
            <router-link v-bind:to="'/conference/'">
            <span class="card-title" style="font-weight: bold">
              {{item.title}}
            </span>
            </router-link>
          </div>
          <div class="card-content">
          <span class="card-title activator grey-text text-darken-4">
            <i class="material-icons right">language</i>
          </span>
            <p>{{item.start_date}}, {{item.convening_place}}</p>
            <p style="height:1rem;"></p>
            <p>{{item.introduction}}</p>
          </div>

        </div>
      </div>
    </div>


    <div id="test3" class="col s12" style="padding-top: 1%">
      <div class="container">
        <div class="card" v-for="item in conferencesAfter">
          <div class="card-image waves-effect waves-block waves-light"
               style="height: 10rem; background:black;">
            <img class="activator" style="opacity: 0.5;" src="/static/bg2.jpg"></img>
            <!--TODO: 这里放会议的背景图-->
            <router-link v-bind:to="'/conference/'">
            <span class="card-title" style="font-weight: bold">
              标题
            </span>
            </router-link>
          </div>
          <div class="card-content">
          <span class="card-title activator grey-text text-darken-4">
            <i class="material-icons right">language</i>
          </span>
            <p>{{item.start_date}}, {{item.convening_place}}</p>
            <p style="height:1rem;"></p>
            <p class="conference-introduction">{{item.introduction}}</p>
          </div>

        </div>
      </div>
    </div>


  </div>
</template>


<script>
  export default {
    name: 'CollectedConferences',
    created: function () {
      $(document).ready(function () {
        $('.tabs').tabs();
      });


      let that = this;
      this.$axios.post('/api/user/getCollectConference', {"type": 'notOpen'})
        .then(response => {
            that.conferencesBefore = response.data.data.result;
            //alert(JSON.stringify(response));
          }
        ).catch(
        error => {
          M.toast({
            html: error,
            classes: "rounded red darken-2"
          });
        }
      );


      this.$axios.post('/api/user/getCollectConference', {"type": 'opened'})
        .then(response => {
            that.conferencesOn = response.data.data.result;
            //alert(JSON.stringify(response));
          }
        ).catch(
        error => {
          M.toast({
            html: error,
            classes: "rounded red darken-2"
          });
        }
      );


      this.$axios.post('/api/user/getCollectConference', {"type": 'enden'})
        .then(response => {
            that.conferencesAfter = response.data.data.result;
            //alert(JSON.stringify(response));
          }
        ).catch(
        error => {
          M.toast({
            html: error,
            classes: "rounded red darken-2"
          });
        }
      );
    },
    data: function () {
      return {
        conferencesBefore: {},
        conferencesOn: {},
        conferencesAfter: {}
      }
    },
    mounted: function () {
      this.$bus.emit('manage-change-title', {text: '收藏的会议'});
    },
    methods: {}
  }
</script>
