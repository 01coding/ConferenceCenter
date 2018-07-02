<template>
  <div>
    <NavBar></NavBar>
    <div class="row">
      <div class="col s1"></div>
      <div class="card"
           style="width: 100%; padding-top: 2rem; padding-bottom: 2rem; margin: 0;"
           :style="{background:'url(/static/bg3.jpg)'}">
        <div class="white-text row container">
          <div class="col s10 offset-s1">
            <h4 style="font-weight: bold">{{resp.data.title}}</h4>
            <h5>{{resp.data.convening_place}}</h5>
            <h5>{{resp.data.start_date}}</h5>
            <h5>{{conferenceState}}</h5>
          </div>
        </div>
      </div>
      <div class="container">
        <div style="height: 2rem"></div>
        <div class="row">
          <div class="col s4"></div>
          <div class="col s2">
            <div class="btn green" v-bind:class="{ disabled: contributeToLink === 0 }">
              <router-link to="/contribute" class="white-text">投稿</router-link>
            </div>
          </div>
          <div class="col s2">
            <div id="register" class="btn blue-grey" v-bind:class="{ disabled: registerToLink === 0 }" @click="toRegisterConference">
              <router-link v-bind:to=registerLink class="white-text">会议注册</router-link>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="row">
            <div class="col s12 m9 l10">
              <div id="introduction" class="section scrollspy">
                <h4>会议介绍</h4>
                开始日期：{{resp.data.start_date}}<br>
                结束日期：{{resp.data.end_date}}<br>
                会议简介:<br>
                {{resp.data.introduction}}<br>
                注册须知:<br>
                {{resp.data.register_information}}
              </div>
              <div id="register_notion" class="section scrollspy">
                <h4>投稿须知</h4>
                <p>征文信息</p>
                {{resp.data.essay_instructions}}
                <p>征稿日期：{{resp.data.start_date}}--{{resp.data.paper_ddl}}</p>
                <p>投稿须知</p>
                {{resp.data.essay_information}}
                <p>论文模板：{{resp.data.paper_template}}</p>
                <p>查看审核结果日期：{{resp.data.employ_date}}</p>
              </div>
              <div id="schedule" class="section scrollspy">
                <h4>日程安排</h4>
                <p>本次会议议程：</p>
                {{resp.data.schedule}}
              </div>
              <div id="traffic" class="section scrollspy">
                <h4>住宿交通</h4>
                {{resp.data.ATinformation}}
              </div>
              <div id="relation" class="section scrollspy">
                <h4>联系我们</h4>
                <p>联系方式：</p>
                {{resp.data.contact}}
              </div>
            </div>
            <div class="col hide-on-small-only m3 l2"
                 style="position: fixed; right: 7%; bottom: 2rem;">
              <ul class="section table-of-contents">
                <li><a href="#introduction" class="active">会议介绍</a></li>
                <li><a href="#register_notion">投稿须知</a></li>
                <li><a href="#schedule">日程安排</a></li>
                <li><a href="#traffic">住宿交通</a></li>
                <li><a href="#relation">联系我们</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from "../../include/NavBar";
  import axios from 'axios';
  import getURL, { mapUrl } from '../../router/';


  export default {
    name: "Conference",
    components: { NavBar, axios, getURL },
    data() {
      return {
        conference_id: 1,
        conferenceImg: "../../../static/Image/bgimg.jpg",
        conferenceState: '默认',
        contributeToLink: 0,
        registerToLink: 0,
        contributeLink: '',
        registerLink: '',
        resp: {
          data: {}
        },
        display_id: 1
      }
    },
    methods: {
      toContribute: function () {
        if(sessionStorage.getItem("session")) {
          this.contributeLink = "/contribute";
        }
        else {
          this.contributeLink = '/login';
        }
      },
      toRegisterConference: function () {
        if(sessionStorage.getItem("session")) {
          this.registerLink = "/";
        }
        else {
          this.registerLink = "/login";
        }
      },

      isAbleRegister: function () {
        if (this.conferenceState != "征稿中" && this.conferenceState != "会议注册中") {
            this.registerToLink = 0;
        }
        else {
            this.registerToLink = 1;
        }
      },
      isAbleContribute: function () {
        if (this.conferenceState == "征稿中") {
            this.contributeToLink = 1;
        }
        else {
          this.contributeToLink = 0;
        }
      },

      getConferenceImg: function () {
        this.conferenceImg = "http://140.143.19.133:8001/uploads/" + this.resp.data.backimg;
      },
      getConferenceState: function () {
        if (this.resp.data.state == 4)
          this.conferenceState = '已结束';
        else if (this.resp.data.state == 12)
          this.conferenceState = '正在进行中';
        else if (this.resp.data.state == 3 || this.resp.data.state == 11)
          this.conferenceState = '征稿中';
        else if (this.resp.data.state == 2 || this.resp.data.state == 10)
          this.conferenceState = '会议注册中';
      }
    },

    created() {
      $(document).ready(function(){
        $('.scrollspy').scrollSpy();
      });

      this.conference_id = parseInt(this.$route.params.id);
      this.$axios.post('api/conference/' + this.conference_id).then(response => {
        this.resp = response.data;
        console.log(this.resp.data);
        this.getConferenceState();
        this.isAbleRegister();
        this.isAbleContribute();
        this.getConferenceImg();
        console.log("contribute to link:" + this.contributeToLink);
        console.log("conference state:" + this.conferenceState);
      }).catch(error => {
        console.log(1);
      });
    }
  }
</script>

<style scoped>
  h1 {
    font-family: Georgia;
    font-size: 2em;
  }

  li {
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .title {
    color: white;
  }

  .titleBgimg {
    background: black;
    opacity: 0.5;
  }

  .button {
    width: 100%;
    text-align: center;

  }

  .sidediv {
    text-align: center;
  }

  .confstate {
    text-align: center;
  }

  .row .col.s10 {
    margin-left: 0rem;
    margin-right: 0rem;
  }

  .row {
    margin-bottom: 0px;
    height: 100%;
  }
</style>
