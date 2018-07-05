<template>
  <div>
    <ul class="tabs">
      <li class="tab col s4"><a href="#test1" >未开幕</a></li>
      <li class="tab col s4"><a class="active" href="#test2">已开幕</a></li>
      <li class="tab col s4"><a href="#test3">已结束</a></li>
    </ul>

    <div id="test1" class="col s12">
      <div class="container">
      <div class="card" >
        <div class="card-image waves-effect waves-block waves-light"
             style="height: 10rem; background:black;">
          <img class="activator" style="opacity: 0.5;" src="/static/bg2.jpg"></img>
          <!--TODO: 这里放会议的背景图-->
          <router-link v-bind:to="'/conference/'">
            <span class="card-title" style="font-weight: bold">
              为开幕
            </span>
          </router-link>
        </div>
        <div class="card-content">
          <span class="card-title activator grey-text text-darken-4">
            <i class="material-icons right">language</i>
          </span>
          <p class="coference-date">某日期</p>
          <p class="coference-date">某日期</p>
          <p style="height:1rem;"></p>
          <p class="conference-introduction">某机构</p>
        </div>

      </div>
      </div>
    </div>
    <div id="test2" class="col s12">
      <div class="container">
        <div class="card" >
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
            <p class="coference-date">某日期</p>
            <p class="coference-date">某日期</p>
            <p style="height:1rem;"></p>
            <p class="conference-introduction">某机构</p>
          </div>

        </div>
      </div>
    </div>


    <div id="test3" class="col s12">
      <div class="container">
        <div class="card" >
          <div class="card-image waves-effect waves-block waves-light"
               style="height: 10rem; background:black;">
            <img class="activator" style="opacity: 0.5;" src="/static/bg2.jpg"></img>
            <!--TODO: 这里放会议的背景图-->
            <router-link v-bind:to="'/conference/'">
            <span class="card-title" style="font-weight: bold" >
              标题
            </span>
            </router-link>
          </div>
          <div class="card-content">
          <span class="card-title activator grey-text text-darken-4">
            <i class="material-icons right">language</i>
          </span>
            <p class="coference-date">某日期</p>
            <p class="coference-date">某日期</p>
            <p style="height:1rem;"></p>
            <p class="conference-introduction">某机构</p>
          </div>

        </div>
      </div>
    </div>



  </div>
</template>


<script>
  export default {
    name:'RegisteredConferences',
    created:function () {
      $(document).ready(function(){
        $('.tabs').tabs();
      });






      let that=this;
      this.$axios.post('/api/user/getRegisterConference',{"type":'notOpen'})
        .then(response=>{
          //alert(JSON.stringify(response));
          console.log(JSON.stringify(response.data.data));
          that.conferencesBefore=response.data.data.result;
        }
      ).catch(
        error=>{
          M.toast({
            html: error,
            classes: "rounded red darken-2"
          });
        }
      );
    },
    data:function () {
      return{
        conferencesBefore:{

        },
        conferencesOn:{

        },
        conferencesAfter:{

        }
      }
    },
    methods:{

    },
    mounted:function () {
      this.$bus.emit('manage-change-title', { text: '参加的会议' });
    },

  }
</script>
