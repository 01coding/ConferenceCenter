<template>
<div>
  <NavBar></NavBar>
  <div class="card" style="margin-top: 0; border-top: none; box-shadow: 0 3px 3px #e4e4e4;">
    <div class="card-action container" style="border-top: none;">
        <span>
          投稿至 <span class="chip" style="margin: 0;">{{contrib.conference}}</span>
        </span>
      <span class="right" style="line-height: 2.5rem;">
          <strong>创建于 {{contrib.datetime }}</strong>&nbsp&nbsp&nbsp
          <span class="green-text" style="font-weight: bold">{{contrib.state}}</span>
        </span>
    </div>
    <div class="card-content container">
      <div class="row">
        <div class="col s12 center-align">
          <h4 style="font-weight: bold; margin: 0;">{{contrib.title}}</h4>
        </div>
      </div>
      <div class="row center-align" style="margin-bottom: 0;">
        <div v-bind:class="'col s'+12/(contrib.authors.length < 4 ? contrib.authors.length: 4)"
             v-for="author in contrib.authors">
          <h5>{{author.name}}</h5>
          <p>{{author.institution}}</p>
          <p style="font-size: 1rem; font-family: 'Courier';">{{author.email}}</p>
        </div>
      </div>
    </div>
    <div class="card-action center-align container" style="border-top: none; padding-bottom: 2rem;">
      <div class="btn-large green">提交新版本</div>
      <div class="btn-large black" style="margin: 0;">撤稿</div>
    </div>
  </div>
  <div class="container">
    <div class="row" style="margin-top: 2rem;">
      <div class="col s4 offset-s2 center-align">
        <div class="chip" :class="{'my_active': active_tab===0}"
             @click="switch_tab(0)"
             style="font-size: 1.2rem; padding: 0 1.5rem; cursor: pointer">
          审稿过程
        </div>
      </div>
      <div class="col s4 center-align">
        <div class="chip" :class="{'my_active': active_tab===1}"
             @click="switch_tab(1)"
             style="font-size: 1.2rem; padding: 0 1.5rem; cursor: pointer">
          基本信息
        </div>
      </div>
    </div>
    <div class="row" v-if="active_tab===0">
      <div class="card" v-for="(subm, idx) in contrib.subms" style="margin-bottom: 2rem;">
        <div class="card-content">
          <span class="card-title"
                :class="{'green-text':subm.decision==='录用', 'blue-text':subm.decision==='修改后录用'}">
            {{subm.decision}}
          </span>
          <div style="line-height: 3rem; font-weight: bold; margin-bottom: 1rem;">
            文件：
            <span class="btn-small blue-grey" style="margin: 0;">
              {{subm.file}}<i class="material-icons right">file_download</i>
            </span>
          </div>
          <p>
            <span class="grey-text text-darken-2" style="font-weight: bold;">审稿意见：</span>
            {{subm.comments}}
          </p>
        </div>
        <div class="card-action center-align"
             :class="{'blue darken-2': subm.decision==='修改后录用', 'green darken-2': subm.decision==='录用'}">
          &nbsp
          <span class="right white-text">{{subm.datetime}}</span>
        </div>
      </div>
    </div>
    <div class="row" v-if="active_tab===1">
    </div>
  </div>
</div>
</template>

<script>
import NavBar from "@/include/NavBar";
import {humanize_time} from "@/js/utils";
export default {
  name: "Contribution",
  components: {NavBar},
  data: function() {
    return {
      active_tab: 0,
      contrib: {
        session_token: null,
        title: "Deep Hashing: A Joint Approach for Image Signature Learning",
        conference: "International Conference on Computer Vision 2019",
        state: "已录用",
        datetime: humanize_time("2018-06-21 18:04:56"),
        authors: [
          {
            name: "Yadong Mu",
            institution: "Institute of Computer Science and Technology Peking University, China",
            email: "myd@pku.edu.cn"
          },
          {
            name: "Zhu Liu",
            institution: "Multimedia Department AT&T Labs, U.S.A.",
            email: "zliu@researh.att.com"
          }
        ],
        subms: [
          {
            datetime: humanize_time('2018-06-21 18:04:56'),
            decision: '修改后录用',
            file: 'paper1.pdf',
            comments: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          },
          {
            datetime: humanize_time('2018-06-22 18:04:56'),
            decision: '修改后录用',
            file: 'paper2.pdf',
            comments: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          },
          {
            datetime: humanize_time('2018-06-23 18:04:56'),
            decision: '录用',
            file: 'paper3.pdf',
            comments: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          },
        ]
      }
    }
  },
  methods: {
    switch_tab(i) {
      this.active_tab = i;
    }
  }
}
</script>

<style scoped>
.download {
  cursor: pointer;
  float: right;
  font-size: 16px;
  line-height: 32px;
  padding-left: 8px;
}
.my_active {
  background-color: white;
  box-shadow: 0 2px 2px #e4e4e4;
}
</style>
