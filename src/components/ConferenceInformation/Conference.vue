<template>
  <div>
    <div class="row">
      <div class="col s1"></div>
      <div class="col s10">
        <img v-bind:src="conferenceImg" class="responsive-img"/>
        <div class="row">
          <div id="title_left" class="col s8">
            <div>
              <h1>{{resp.data.title}}</h1>
              <p>{{resp.data.start_date}}</p>
              <p>{{resp.data.convening_place}}</p>
            </div>
          </div>
          <div id="title_right" class="col s4">
            <div class="row">
              <br>
              <div class="col s5">
                <button class="btn button" v-bind:class="{ disabled: contributeToLink === 0 }">
                  <router-link to="/api/contribute" class="white-text">投稿</router-link>
                </button>
              </div>
              <div class="col s2"></div>
              <div class="col s5">
                <button id="register" class="title btn button" v-bind:class="{ disabled: registerToLink === 0 }">
                  <router-link to="/new/conference" class="white-text">会议注册</router-link>
                </button>
              </div>
            </div>
            <br><br>
            <div class="confstate">{{conferenceState}}</div>
          </div>
        </div>
        <div class="row">
          <div class="row">
            <div class="col s12 m9 l10">
              <div id="introduction" class="section scrollspy">
                <h2>会议介绍</h2>
                开始日期：{{resp.data.start_date}}<br>
                结束日期：{{resp.data.end_date}}<br>
                会议简介:<br>
                {{resp.data.introduction}}
                注册须知:<br>
                {{resp.data.register_information}}
              </div>
              <div id="register_notion" class="section scrollspy">
                <h2>投稿须知</h2>
                <p>征文信息</p>
                {{resp.data.essay_instruction}}
                <p>征稿日期：{{resp.data.start_date}}--{{resp.data.paper_ddl}}</p>
                <p>投稿须知</p>
                {{resp.data.essay_information}}
                <p>论文模板：{{resp.data.paper_template}}</p>
                <p>查看审核结果日期：{{resp.data.employ_date}}</p>
              </div>
              <div id="schedule" class="section scrollspy">
                <h2>日程安排</h2>
                <p>本次会议议程：</p>
                {{resp.data.schedule}}
              </div>
              <div id="traffic" class="section scrollspy">
                <p>住宿交通</p>
                组委会已经为参会人员订购了xx酒店的房间，请参会人员到达时到前台签到并领取房卡。
              </div>
              <div id="relation" class="section scrollspy">
                <h2>联系我们</h2>
                <p>联系方式：</p>
                {{resp.data.contact}}
              </div>
            </div>
            <div class="col hide-on-small-only m3 l2">
              <ul class="section table-of-contents">
                <li><a href="#introduction" class="active">会议介绍</a></li>
                <li><a href="#register_notion">注册须知</a></li>
                <li><a href="#schedule">日程安排</a></li>
                <li><a href="#traffic">住宿交通</a></li>
                <li><a href="#relation">联系我们</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col s1"></div>
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
        resp: {
          data: {}
        },
        display_id: 1
      }
    },
    methods: {
      isAbleRegister: function () {
        if (this.conferenceState != "征稿中" && this.conferenceState != "会议注册中") {
          this.registerToLink = 0;
        }
        else {
          this.registerToLink = 1;
        }
      },

      tocontribute: function () {
        if (this.conferenceState == "征稿中") {
          this.contributeToLink = 1;
        }
        else {
          this.contributeToLink = 0;
        }
      },

      autoheight: function () {
        if (document.getElementById("title_left").clientHeight < document.getElementById("title_right").clientHeight) {
          document.getElementById("title_right").style.height = document.getElementById("title_left").clientHeight + "px";
        }
        else {
          document.getElementById("title_left").style.height = document.getElementById("title_right").clientHeight + "px";
        }
      },

      displayIntroduction: function () {
        this.display_id = 1;
      },
      displayContribution: function () {
        console.log("mahui");
        this.display_id = 2;
      },
      displaySchedule: function () {
        this.display_id = 3;
      },
      displayTraffic: function () {
        this.display_id = 4;
      },
      displayRelation: function () {
        this.display_id = 5;
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
        this.tocontribute();
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
