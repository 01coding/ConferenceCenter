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
      <div class="btn-large green" @click="to_sub_new">提交新版本</div>
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
                style="font-weight: 400"
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
        <div class="card-action center-align grey lighten-5" style="padding-top: 0.5rem; padding-bottom: 0.5rem;">
          &nbsp
          <span class="right grey-text text-darken-1">{{subm.datetime}}</span>
        </div>
        <div :class="{'blue': subm.decision==='修改后录用', 'green': subm.decision==='录用'}"
             style="height: 0.2rem;"></div>
      </div>

      <div class="card" id="newver">
        <div class="card-content">
          <span class="btn blue darken-1 right" @click="submit">
            <i class="material-icons left">send</i>
            提交
          </span>
          <span class="card-title" style="font-weight: bold">提交新版本</span>
          <div class="row" style="margin-bottom: 0;">
            <div class="input-field col s12">
              <i class="material-icons prefix">subject</i>
              <textarea id="abstract" class="materialize-textarea" v-model="abstract"></textarea>
              <label for="abstract">说明</label>
            </div>
          </div>
          <div class="row" style="margin-bottom: 0;">
            <div class="center row" v-if="upload.files.length===0">
              <h5 style="font-size: 1.5rem; margin: 0; padding-top: 2rem; padding-bottom: 2rem; margin-left: 1rem; margin-right: 1rem; background: #eeeeee; color: #757575; border-radius: 0.5rem;">
                在这里上传文件
              </h5>
            </div>
            <div class="center row" v-if="upload.files.length>0">
              <div class="col s12" style="font-size: 1.5rem; margin: 0; padding-top: 2rem; padding-bottom: 2rem; margin-left: 1rem; margin-right: 1rem; background: #eeeeee; color: #757575; border-radius: 0.5rem;">
                <button class="btn"
                        style="cursor: pointer"
                        :class="{ green: file.success, teal: file.active, red: file.error, 'blue-grey': !file.success && !file.active && !file.error}"
                        v-for="(file, index) in upload.files" :key="file.id">
                  {{file.name}}&nbsp
                  <span v-if="file.error">{{file.error}}</span>
                  <span v-else-if="file.success">成功</span>
                  <span class="detail" v-else-if="file.active">{{file.progress}}%</span>
                  <span class="detail" v-else></span>
                  <i class="material-icons right"
                     style="cursor: pointer"
                     @click.prevent="$refs.upload.remove(file)">
                    clear
                  </i>
                </button>
              </div>
            </div>
            <div class="center row">
              <file-upload
                class="waves-effect waves-light btn blue-grey lighten-1"
                :post-action="upload.url"
                :size="upload.size"
                :maximum="upload.maximum"
                v-model="upload.files"
                ref="upload">
                <i class="material-icons right">attach_file</i>
                选择文件
              </file-upload>
              <button type="button" class="btn green"
                      v-if="!$refs.upload || !$refs.upload.active"
                      @click.prevent="$refs.upload.active = true">
                <i class="material-icons right" aria-hidden="true">file_upload</i>
                开始上传
              </button>
              <button type="button" class="btn red" v-else @click.prevent="$refs.upload.active = false">
                <i class="material-icons right" aria-hidden="true">clear</i>
                停止上传
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-if="active_tab===1">
    </div>
    <div style="height: 5rem;"></div>
  </div>
</div>
</template>

<script>
import NavBar from "@/include/NavBar";
import {humanize_time} from "@/js/utils";
import FileUpload from "vue-upload-component";

export default {
  name: "Contribution",
  components: {NavBar, FileUpload},
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
        ],
      },
      upload: {
        files: [],
        web_io: "http://118.89.229.204:8080",
        url: 'http://118.89.229.204:8080/ERM-WebIO-1.0/file/upload.do',
        size: 100 * 1024 * 1024,
        maximum: 1
      },
    }
  },
  methods: {
    switch_tab(i) {
      this.active_tab = i;
    },
    to_sub_new() {
      $('html, body').animate({
        scrollTop: $("#newver").offset().top
      }, 1000);
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
