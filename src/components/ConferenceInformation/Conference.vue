<template>
  <div>
    <div class="row">
      <div class="col s1"></div>
      <div class="col s10" v-bind:style="{'background':'url('+conferenceImg+')'}">
        <div class="row titleBgimg">
          <div class="col s8">
              <div>
                <h1 class="title">{{resp.data.title}}</h1>
                <p class="title">{{resp.data.start_date}}</p>
                <p class="title">{{resp.data.convening_place}}</p>
              </div>
            </div>
          <div class="col s4">
              <div class="row rightdiv">
                <div class="col s5">
                  <button class="title button">投稿</button>
                </div>
                <div class="col s5">
                  <button class="title button">会议注册</button>
                </div>
              </div>
              <div class="title confstate">{{conferenceState}}</div>
            </div>
        </div>
      </div>
      <div class="col s1"></div>
    </div>
    <div class="row">
      <div class="col s1"></div>
      <div class="col s3">
        <ul id="slide-out" class="sidenav-fixed">
          <li class="bold active">
            <a class="waves-effect" @click="displayIntroduction">会议介绍</a>
          </li>
          <li class="bold">
            <a class="waves-effect" @click="displayContribution">投稿须知</a>
          </li>
          <li class="bold">
            <a class="waves-effect" @click="displaySchedule">日程安排</a>
          </li>
          <li class="bold">
            <a class="waves-effect" @click="displayTraffic">住宿交通</a>
          </li>
          <li class="bold">
            <a class="waves-effect" @click="displayRelation">联系方式</a>
          </li>
        </ul>
      </div>
      <div class="col s7">
        <div v-if="display_id ==1">
          <p>开始日期：{{resp.data.start_date}}</p>
          <p>结束日期：{{resp.data.end_date}}</p>
          <p>会议简介</p>
          {{resp.data.introduction}}
          <p>注册须知</p>
          {{resp.data.register_information}}
        </div>
        <div v-else-if="display_id ==2">
          <p>征文信息</p>
          {{resp.data.essay_instruction}}
          <p>征稿日期：{{resp.data.start_Date}}--{{resp.data.paper_ddl}}</p>
          <p>投稿须知</p>
          {{resp.data.essay_information}}
          <p>论文模板：{{resp.data.paper_template}}</p>
          <p>查看审核结果日期：{{resp.data.employ_date}}</p>
        </div>
        <div v-else-if="display_id ==3">
          <p>本次会议议程：</p>
          {{resp.data.schedule}}
        </div>
        <div v-else-if="display_id ==4">
          组委会已经为参会人员订购了xx酒店的房间，请参会人员到达时到前台签到并领取房卡。
        </div>
        <div v-else-if="display_id ==5">
          <p>联系方式：{{resp.data.contact}}</p>
        </div>
      </div>
      <div class="col s1"></div>
    </div>
  </div>
</template>

<script>
  import NavBar from "../../include/NavBar";
  import axios from 'axios';
  import mapUrl  from '../../router/APIget';

  export default {
    name: "Conference",
    components: {NavBar, axios, mapUrl},
    data() {
      return {
        conferenceTitle:'International Conference on Circuits, Systems, Communications and Computers',
        conferenceDate:'June 30,2018',
        conferenceLocation:'LAS,USA',
        conferenceState:'投稿中',
        conferenceImg:'../../../../static/bgimg.jpg',
        resp:{
          data: {

          }
        },
        display_id:1
      }
    },
    methods: {
      displayIntroduction: function (){
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
        if (resp.data.state == 4)
          conferenceState = '已结束';
        else if (resp.data.state == 12)
          conferenceState = '正在进行中';
        else if (resp.data.state == 3 || resp.data.state == 11)
          conferenceState = '征稿中';
        else if (resp.data.state == 2 || resp.data.state == 10)
          conferenceState = '会议注册中';
      }
    },
      created() {
        let that = this;
        console.log('en');
        axios.post(mapUrl('conference'), {
          id: 1
        })
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            that.resp = response.data;
            console.log(that.resp.data);
            that.getConferenceState();
          })
          .catch(function (error) {
            console.log('o');
            console.log(error);
          });

      }
  }
</script>

<style scoped>
  h1 {
    font-family:Georgia;
    font-size:2em;
  }

  .title {
    color:white;
  }

  .titleBgimg {
    background: black;
    opacity: 0.5;
  }

  .button {
    background-color: #465a6c;
    width:100%;
    height:70%;
    text-align: center;

  }

  .rightdiv {
    margin-top: auto;
    margin-bottom: auto;

  }

  .confstate {
    vertical-align: text-bottom;
  }

  .row .col.s10{
    margin-left: 0rem;
    margin-right: 0rem;
  }

  .row {
    margin-bottom: 0px;
  }
</style>
