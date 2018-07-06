<template>
<div>
  <NavBar></NavBar>
  <div class="card" style="margin-top: 0; border-top: none; box-shadow: 0 3px 3px #e4e4e4;">
    <div class="card-action container" style="border-top: none;">
        <span>
          投稿至 <span class="chip" style="margin: 0;">{{contrib.conf.title}}</span>
        </span>
      <span class="right" style="line-height: 2.5rem;">
          <strong>创建于 {{contrib.total_submit }}</strong>&nbsp&nbsp&nbsp
          <span style="font-weight: bold"
                :class="{'blue-grey-text':contrib.state===0, 'green-text':contrib.state===1, 'blue-text':contrib.state===2, 'red-text':contrib.state===3}">
            {{contrib.state_text}}
          </span>
        </span>
    </div>
    <div class="card-content container">
      <div class="row">
        <div class="col s12 center-align">
          <h4 style="font-weight: bold; margin: 0;">{{contrib.title}}</h4>
        </div>
      </div>
      <div class="row center-align" style="margin-bottom: 0;">
        <div v-bind:class="'col s'+12/(contrib.author.length < 4 ? contrib.author.length: 4)"
             v-for="author in contrib.author">
          <h5>{{author.name}}</h5>
          <p style="font-size: 1rem;">{{author.institution}}</p>
          <p style="font-size: 1rem; font-family: 'Courier';">{{author.email}}</p>
        </div>
      </div>
    </div>
    <div class="card-action center-align container"
         v-if="contrib.state===2"
         style="border-top: none; padding-bottom: 2rem;">
      <div class="btn-large green" @click="to_sub_new">提交新版本</div>
    </div>
  </div>
  <div class="container">
    <div class="row" style="margin-top: 2rem;">
      <div class="col s4 offset-s2 center-align">
        <div class="chip" :class="{'my_active': active_tab===0}"
             @click="switch_tab(0)"
             style="font-size: 1.2rem; padding: 0 1.5rem; cursor: pointer; border-radius: 5px;">
          审稿过程
        </div>
      </div>
      <div class="col s4 center-align">
        <div class="chip" :class="{'my_active': active_tab===1}"
             @click="switch_tab(1)"
             style="font-size: 1.2rem; padding: 0 1.5rem; cursor: pointer; border-radius: 5px;">
          基本信息
        </div>
      </div>
    </div>
    <div class="row" v-if="active_tab===0">
      <div class="card" v-for="(subm, idx) in contrib.review" style="margin-bottom: 2rem;">
        <div class="card-content">
          <span class="card-title"
                style="font-weight: 400"
                :class="{'blue-grey-text':subm.result==='0', 'green-text':subm.result==='1', 'blue-text':subm.result==='2', 'red-text':subm.result==='3'}">
            {{subm.state_text}}
          </span>
          <div style="line-height: 3rem; font-weight: bold; margin-bottom: 1rem;">
            文件：
            <span class="btn-small blue-grey" style="margin: 0;" @click="download(subm.download_link)">
              {{subm.file_name}}<i class="material-icons right">file_download</i>
            </span>
          </div>
          <p v-if="subm.state==='0'">
            <span class="grey-text text-darken-2" style="font-weight: bold;">审稿意见：</span>
            {{subm.comments}}
          </p>
        </div>
        <div class="card-action grey lighten-5" style="padding-top: 0.5rem; padding-bottom: 0.5rem;">
          <span class="grey-text text-darken-1">第{{idx+1}}次提交</span>
          <span class="right grey-text text-darken-1">{{subm.submit_time}}</span>
        </div>
        <div :class="{'blue-grey':subm.result==='0', 'green':subm.result==='1', 'blue':subm.result==='2', 'red':subm.result==='3'}"
             style="height: 0.2rem;"></div>
      </div>

      <div class="card" id="newver" v-if="contrib.state===2">
        <div class="card-content">
          <span class="btn blue darken-1 right" @click="submit">
            <i class="material-icons left">send</i>
            提交
          </span>
          <span class="card-title" style="font-weight: bold">提交新版本</span>
          <div class="row" style="margin-bottom: 0;">
            <div class="input-field col s12">
              <i class="material-icons prefix">subject</i>
              <textarea id="description" class="materialize-textarea" v-model="new_sub.description"></textarea>
              <label for="description">说明</label>
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
      <div class="card">
        <div class="card-content">
          <span class="btn blue darken-1 right" @click="submit">
            <i class="material-icons left">send</i>
            提交
          </span>
          <span class="card-title" style="font-weight: bold;">论文信息</span>
          <div class="row" style="margin-bottom: 0;">
            <div class="input-field col s12">
              <i class="material-icons prefix">title</i>
              <input id="title" type="text" v-model="info.title">
              <label for="title">标题</label>
            </div>
          </div>
          <div class="row" style="margin-bottom: 0;">
            <div class="input-field col s12">
              <i class="material-icons prefix">subject</i>
              <textarea id="abstract" class="materialize-textarea" v-model="info.abstract"></textarea>
              <label for="abstract">摘要</label>
            </div>
          </div>
          <div class="row">
            <h5>作者</h5>
          </div>
          <div class="row" style="margin-bottom: 0;">
            <div class="center row">
              <h5 style="font-size: 1.5rem; margin: 0; padding-top: 1rem; padding-bottom: 1rem; margin-left: 1rem; margin-right: 1rem; background: #eeeeee; color: #757575; border-radius: 0.5rem;" v-if="info.authors.length===0">
                在这里添加作者
              </h5>
              <div class="col s4" v-for="(author, idx) in info.authors" style="margin-bottom: 1rem;">
                <div class="card-panel"
                     style="padding-top: 0.5rem;">
                  <div style="height: 24px;">
                    <i class="material-icons right"
                       @click="authors.splice(idx, 1)"
                       style="cursor: pointer">
                      clear
                    </i>
                  </div>
                  <div><h5 style="font-weight: bold; margin-top: 0;">{{author.name}}</h5></div>
                  <div>{{author.institution}}</div>
                  <div>{{author.email}}</div>
                </div>
              </div>
            </div>
            <div class="row valign-wrapper" style="margin-bottom: 0;">
              <div class="input-field col s4">
                <i class="material-icons prefix">account_circle</i>
                <input id="first_name" type="text" v-model="info.authors_field.name">
                <label for="first_name">姓名</label>
              </div>
              <div class="input-field col s4">
                <i class="material-icons prefix">account_balance</i>
                <input id="institution" type="text" v-model="info.authors_field.institution">
                <label for="institution">机构</label>
              </div>
              <div class="input-field col s4">
                <i class="material-icons prefix">email</i>
                <input id="email" type="email" v-model="info.authors_field.email">
                <label for="email">邮箱</label>
              </div>
              <div class="waves-effect waves-light btn green col s1" @click="add_author">添加
                <i class="material-icons right">add</i>
              </div>
            </div>
          </div>
        </div>
      </div>
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
      contrib_id: null,
      session_token: null,
      contrib: {
        title: "Deep Hashing: A Joint Approach for Image Signature Learning",
        conference: "International Conference on Computer Vision 2019",
        conf: { title: "" },
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
      new_sub: {
        description: null,
      },
      info: {
        title: "",
        abstract: "",
        authors: [],
        authors_field: {
          name: "",
          institution: "",
          email: "",
        },
      },
      user_info: null,
    }
  },

  created: function() {
    if (this.$route.params.id) {
      this.contrib_id = this.$route.params.id;
    } else {
      M.toast({
        html: "<span style='font-weight: bold;'>需要路由参数</span>",
        classes: 'red rounded'
      });
      this.$router.push("/404");
    }

    this.session_token = sessionStorage.getItem('session');

    if (!this.session_token)  {
      this.$router.push("/login");
    } else {
      this.load_user_info().then(ret => {
        this.load_contrib().then(ret=>{
          this.load_conf_name();
        });
      })
    }
  },
  mounted:function(){
    this.$bus.emit("toContribute")
  },
  methods: {
    switch_tab(i) {
      this.active_tab = i;
    },

    to_sub_new() {
      $('html, body').animate({
        scrollTop: $("#newver").offset().top
      }, 1000);
    },

    submit() {

    },

    load_user_info() {
      return this.$axios.post("/api/user/token", {token: this.session_token}).then(response => {
        let resp = response.data;
        if (resp.status === "succ") {
          this.user_info = resp.data;
        } else {
          this.$router.push("/login");
        }
      });
    },

    load_contrib() {
      let params = {
        token: this.session_token,
        id: this.contrib_id
      };
      return this.$axios.post('/api/manage/contribution', params).then(response => {
        let resp = response.data;
        if (resp.status === "succ") {
          console.log(resp.data);
          let contrib = resp.data;
          contrib.total_submit = humanize_time(contrib.total_submit);
          contrib.state_text = this.state_text(contrib.state);
          for (let i = 0; i < contrib.review.length; i++) {
            contrib.review[i].state_text = this.state_text(contrib.review[i].result);
            contrib.review[i].submit_time = humanize_time(contrib.review[i].submit_time);
            contrib.review[i].download_link = this.upload.web_io + "/" + contrib.review[i].attachment;
            let ind = contrib.review[i].attachment.lastIndexOf("/");
            contrib.review[i].file_name = contrib.review[i].attachment.substring(ind);
          }
          contrib.conf = { title: "" };
          this.contrib = contrib;
        } else {
          M.toast({
            html: "<span style='font-weight: bold;'>加载投稿信息时出错："+resp.info+"</span>",
            classes: 'red rounded'
          });
        }
      }).catch(error => {
        console.log(error);
        M.toast({
            html: "<span style='font-weight: bold;'>加载投稿信息出错</span>",
            classes: 'red rounded'
          });
      });
    },

    load_conf_name() {
      return this.$axios.post('/api/conference/' + this.contrib.conference_id).then(response => {
        let resp = response.data;
        if (resp.status === "succ") {
          console.log(resp.data);
          this.contrib.conf = resp.data;
        } else {
          M.toast({
            html: "<span style='font-weight: bold;'>加载会议名称时出错："+resp.info+"</span>",
            classes: 'red rounded'
          });
        }
      }).catch(error => {
        console.log(error);
        M.toast({
          html: "<span style='font-weight: bold;'>加载会议名称时出错</span>",
          classes: 'red rounded'
        });
      });
    },

    add_author() {
      let name = this.info.authors_field.name.trim();
      let institution = this.info.authors_field.institution.trim();
      let email = this.info.authors_field.email.trim();
      if (name.length === 0) {
        M.toast({html: "<span style='font-weight: bold;'>请填写作者姓名</span>", classes: 'yellow darken-2 rounded'});
        return;
      }
      if (institution.length === 0) {
        M.toast({html: "<span style='font-weight: bold;'>请填写作者单位</span>", classes: 'yellow darken-2 rounded'});
        return;
      }
      if (email.length === 0) {
        M.toast({html: "<span style='font-weight: bold;'>请填写邮箱</span>", classes: 'yellow darken-2 rounded'});
        return;
      }
      let author = {
        name: name,
        institution: institution,
        email: email
      };
      this.info.authors.push(author);
      this.info.authors_field.name = "";
      this.info.authors_field.institution = "";
      this.info.authors_field.email = "";
    },

    state_text(state) {
      state = parseInt(state);
      let state_text = "ERROR";
      switch(state) {
        case 0:
          state_text = "待审稿";
          break;
        case 1:
          state_text = "已录用";
          break;
        case 2:
          state_text = "修改后录用";
          break;
        case 3:
          state_text = "拒稿";
          break;
        default:
          break;
      }
      return state_text;
    },

    download(link) {
      window.open(link, '_blank');
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
