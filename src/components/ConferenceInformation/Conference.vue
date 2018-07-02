<template>

  <div>
    <NavBar></NavBar>
    <div class="row">
      <div class="col s1"></div>
      <div class="card customize"
           style="width: 100%; padding-top: 2rem;
                  padding-bottom: 2rem; margin: 0;"
           :style="{'background': bg_overlay+'url('+conferenceImg+')'}">
        <div class="white-text row container">
          <div class="col s12">
            <h4 class="center" style="font-weight: bold">{{resp.data.title}}</h4>
            <h5 class="center">{{resp.data.start_date}}，{{resp.data.convening_place}}</h5>
            <h5 style="font-weight: bold" class="center">{{conferenceState}}</h5>
            <h5>&nbsp</h5>
            <div class="row center-align">
              <div class="btn btn-large green"
                   :class="{ disabled: contributeToLink === 0 }"
                   @click="toContribute">
                <div class="white-text">投稿</div>
              </div>
              <div id="register" class="btn btn-large blue-grey"
                   @click="toRegisterConference"
                   :class="{ disabled: registerToLink === 0 }">
                <div class="white-text">
                  报名参会
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="white section">
        <div class="container">
          <div class="row">
            <div class="card-panel center-align"
                 style="position: fixed; left: 7%; bottom: 1.5rem; width: 20%;">
                <ul class="section table-of-contents"
                    style="padding-top: 0; padding-bottom: 0; padding-right: 1rem;">
                  <li><a href="#introduction" class="active">会议介绍</a></li>
                  <li><a href="#register_notion">投稿须知</a></li>
                  <li><a href="#schedule">日程安排</a></li>
                  <li><a href="#traffic">住宿交通</a></li>
                  <li><a href="#relation">联系我们</a></li>
                </ul>
            </div>
            <div class="col s9 offset-s3">
              <div id="introduction" class="section scrollspy">
                <h4 style="font-weight: bold">会议介绍</h4>
                <strong>开始日期</strong>：{{resp.data.start_date}}<br>
                <strong>结束日期</strong>：{{resp.data.end_date}}<br><br>
                <strong>会议简介</strong>:<br>
                <pre style="word-wrap: break-word;white-space: pre-wrap;">{{resp.data.introduction}}</pre><br>
                <strong>注册须知</strong>:<br>
                <pre style="word-wrap: break-word;white-space: pre-wrap;">{{resp.data.register_information}}</pre>
              </div>
              <div id="register_notion" class="section scrollspy">
                <h4>投稿须知</h4>
                <strong>征文信息</strong><br>
                <pre style="word-wrap: break-word;white-space: pre-wrap;">{{resp.data.essay_instructions}}</pre>
                <strong>征稿日期</strong>：{{resp.data.start_date}}--{{resp.data.paper_ddl}}<br><br>
                <strong>投稿须知</strong>
                <pre style="word-wrap: break-word;white-space: pre-wrap;">{{resp.data.essay_information}}</pre><br>
                <strong>论文模板</strong>：
                <a class="btn blue-grey" v-bind:href="'http://140.143.19.133:8001' + resp.data.paper_template">点我获取</a>
                <br><br>
                <strong>查看审核结果日期</strong>：{{resp.data.employ_date}}<br>
              </div>
              <div id="schedule" class="section scrollspy">
                <h4 style="font-weight: bold">日程安排</h4>
                <strong>本次会议议程：</strong><br>
                <pre style="word-wrap: break-word;white-space: pre-wrap;">{{resp.data.schedule}}</pre>
              </div>
              <div id="traffic" class="section scrollspy">
                <h4 style="font-weight: bold">住宿交通</h4>
                <pre style="word-wrap: break-word;white-space: pre-wrap;">{{resp.data.ATinformation}}</pre>
              </div>
              <div id="relation" class="section scrollspy">
                <h4 style="font-weight: bold">联系我们</h4>
                <strong>联系方式：</strong>
                <pre style="word-wrap: break-word;white-space: pre-wrap;">{{resp.data.contact}}</pre>
              </div>
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
        bg_overlay: "linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)),",
        conference_id: 1,
        conferenceImg: "/static/bg1.jpg",
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
        this.contributeLink = "/contribute/" + this.conference_id;
        this.$router.push(this.contributeLink);
      },
      toRegisterConference: function () {
        this.registerLink = "/login";
        this.$router.push(this.registerLink)
      },

      isAbleRegister: function () {
        if (this.conferenceState !== "征稿中" && this.conferenceState !== "会议注册中") {
            this.registerToLink = 0;
        }
        else {
            this.registerToLink = 1;
        }
      },
      isAbleContribute: function () {
        if (this.conferenceState === "征稿中") {
            this.contributeToLink = 1;
        }
        else {
          this.contributeToLink = 0;
        }
      },

      getConferenceImg: function () {
        //this.conferenceImg = "http://140.143.19.133:8001/uploads/" + this.resp.data.backimg;
      },
      getConferenceState: function () {
        if (this.resp.data.state === 4)
          this.conferenceState = '已结束';
        else if (this.resp.data.state === 12)
          this.conferenceState = '正在进行中';
        else if (this.resp.data.state === 3 || this.resp.data.state === 11)
          this.conferenceState = '征稿中';
        else if (this.resp.data.state === 2 || this.resp.data.state === 10)
          this.conferenceState = '会议注册中';
      }
    },

    created() {
      $(document).ready(function(){
        $('.scrollspy').scrollSpy();
      });

      this.conference_id = parseInt(this.$route.params.id);
      this.$axios.post('/api/conference/' + this.conference_id).then(response => {
        if(response.status === 200) {
          if (response.data.status === "succ") {
            this.resp = response.data;
            console.log(this.resp.data);
            this.getConferenceState();
            this.isAbleRegister();
            this.isAbleContribute();
            this.getConferenceImg();
            console.log("contribute to link:" + this.contributeToLink);
            console.log("conference state:" + this.conferenceState);
          }
          else {
            M.toast({
              html: response.data.info,
              classes: "rounded red darken-2"
            });
            this.$router.push('/404');
          }
        }
        else {
          M.toast({
            html: response.statusText,
            classes: "rounded red darken-2"
          });
        }
      }).catch(error => {
        M.toast({
          html: error,
          classes: "rounded red darken-2"
        });
        console.log(1);
      });
    }
  }
</script>

<style scoped>
  .customize {
    background-size: 100% !important;
    background-repeat: no-repeat !important;
    background-position: center center !important;
  }

  h1 {
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
