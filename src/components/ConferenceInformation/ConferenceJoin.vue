<template>
  <div class="width: 100%">
    <NavBar></NavBar>

    <div class="card customize"
         style="width: 100%; padding-top: 2rem; padding-bottom: 2rem; margin: 0;"
         :style="{'background-image':bg_overlay+'url(/static/bg1.jpg)'}">
      <div class="white-text row container">
        <div class="col s10 offset-s1">
          <h5>参与会议</h5>
          <h4 style="font-weight: bold; cursor: pointer;"
              @click="$router.push('/conference/'+conference_id)">
            {{resp.data.title}}
          </h4>
          <h5>&nbsp</h5>
          <h5>{{resp.data.convening_place}}</h5>
          <h5>{{resp.data.start_date}}</h5>
          <a class="btn-floating btn-large halfway-fab waves-effect waves-light blue"
             style="right:25%;"
             @click="submit">
            <i class="material-icons">send</i>
          </a>
        </div>
      </div>
    </div>

    <div class="section white">
      <div class="row container">
        <div class="col s10 offset-s1">
          <div class="row" style="margin-bottom: 0;">
            <div class="row">
              <h5>是否带论文参会</h5>
            </div>
            <div>
                <div class="row valign-wrapper">
                  <label class="col s3">
                    <input type="radio" name="yesAuthor" value="yesAuthor" v-model="whetherAuthor" checked />
                    <span>是</span>
                  </label>
                  <div class="input-field col s9">
                    <i class="material-icons prefix">title</i>
                    <input id="thesis-code" type="text" v-model="whetherAuthor"
                    :class="{disabled: whetherAuthor === 'yesAuthor'}">
                    <label for="thesis-code">论文编号</label>
                  </div>
                </div>
                <div class="row">
                  <label class="col s3">
                    <input type="radio" name="noAuthor" value="noAuthor" v-model="whetherAuthor" />
                    <span>否</span>
                  </label>
                </div>
              </div>
          </div>
          <div class="row">
            <h5>参会人</h5>
          </div>
          <div class="row" style="margin-bottom: 0;">
            <div class="center row">
              <h5 style="font-size: 1.5rem; margin: 0; padding-top: 1rem; padding-bottom: 1rem; margin-left: 1rem; margin-right: 1rem; background: #eeeeee; color: #757575; border-radius: 0.5rem;" v-if="authors.length===0">
                在这里添加参会人
              </h5>
              <div class="col s4" v-for="(participate, idx) in participates" style="margin-bottom: 1rem;">
                <div class="card-panel"
                     style="padding-top: 0.5rem;">
                  <div style="height: 24px;">
                    <i class="material-icons right"
                       @click="participates.splice(idx, 1)"
                       style="cursor: pointer">
                      clear
                    </i>
                  </div>
                  <div><h5 style="font-weight: bold; margin-top: 0;">{{participate.name}}</h5></div>
                  <div>{{participate.phone}}</div>
                  <div>{{participate.work}}</div>
                </div>
              </div>
            </div>
              <div class="row valign-wrapper" style="margin-bottom: 0;">
                <div class="input-field col s6">
                  <i class="material-icons prefix">account_circle</i>
                  <input id="first_name" type="text" v-model="participate_field.name">
                  <label for="first_name">姓名</label>
                </div>
                <div class="input-field col s6">
                  <i class="material-icons prefix">call</i>
                  <input id="email" type="email" v-model="participate_field.phone">
                  <label for="email">联系方式</label>
                </div>
              </div>
              <div class="row valign-wrapper" style="margin-bottom: 0;padding-top: 3px;padding-bottom: 3px;">
                  <div class="col s2 valign-wrapper">
                    <i class="material-icons prefix">person</i>
                    性别
                  </div>
                  <label class="col s2">
                    <input type="radio" name="male" value="male" v-model="participate_field.gender" />
                    <span>男</span>
                  </label>
                  <label class="col s2">
                    <input type="radio" name="famale" value="female" v-model="participate_field.gender" />
                    <span>女</span>
                  </label>
                  <div class="col s3 valign-wrapper">
                    <i class="material-icons prefix">home</i>
                    预定住宿
                  </div>
                  <div class="switch col s3">
                    <label>
                      Off
                      <input type="checkbox" v-model="participate_field.accommodate">
                      <span class="lever"></span>
                      On
                    </label>
                </div>
              </div>
            <div class="row valign-wrapper" style="margin-bottom: 0;">
              <div class="input-field col s12">
                <i class="material-icons prefix">work</i>
                <input id="job" type="text" v-model="participate_field.work">
                <label for="job">工作</label>
              </div>
            </div>
            <div class="row valign-wrapper" style="margin-bottom: 0;">
              <div class="input-field col s12">
                <i class="material-icons prefix">note</i>
                <input id="note" type="text" v-model="participate_field.note">
                <label for="note">备注</label>
              </div>
            </div>
            <div class="row valign-wrapper" style="margin-bottom: 0;">
              <div class="waves-effect waves-light btn green col s1" @click="add_author">添加
                <i class="material-icons right">add</i>
              </div>
            </div>
            </div>
          <div class="row">
            <h5>缴费凭证</h5>
          </div>
          <div class="row" style="margin-bottom: 0;">
            <div class="center row" v-if="upload.files.length===0">
              <h5 style="font-size: 1.5rem; margin: 0; padding-top: 2rem; padding-bottom: 2rem; margin-left: 1rem; margin-right: 1rem; background: #eeeeee; color: #757575; border-radius: 0.5rem;">
                在这里上传文件
              </h5>
            </div>
            <div class="center row" v-if="upload.files.length>0">
              <div class="col s12" style="font-size: 1.5rem; margin: 0; padding-top: 2rem; padding-bottom: 2rem; margin-left: 1rem; margin-right: 1rem; background: #eeeeee; color: #757575; border-radius: 0.5rem;">
                <button class="btn blue-grey"
                        style="cursor: pointer"
                        :class="{ green: file.success, teal: file.active, red: file.error}"
                        v-for="(file, index) in upload.files" :key="file.id">
                  {{file.name}}
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
                      @click.prevent="demo_oriented_upload">
                <!--TODO: 把面向演示编程的东西删掉-->
                <!--@click.prevent="$refs.upload.active = true"-->
                <i class="material-icons right" aria-hidden="true">file_upload</i>
                开始上传
              </button>
              <button type="button" class="btn red" v-else @click.prevent="$refs.upload.active = false">
                <i class="material-icons right" aria-hidden="true">clear</i>
                停止上传
              </button>
            </div>
          </div>
          <div class="row" style="height: 2rem;">
          </div>
          <div class="row center-align">
            <div class="btn-large blue darken-1" @click="submit">
              <i class="material-icons left">send</i>
              提交
            </div>
          </div>
          <div class="row" style="height: 2rem;">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from "../../include/NavBar";
  import FileUpload from "vue-upload-component";

  export default {
    name: "ConferenceJoin",
    components: { NavBar, FileUpload },
    data: function () {
      return {
        session_token: sessionStorage.getItem('session'),
        bg_overlay: "linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)),",
        conference_id: 1,
        conferenceImg: "/static/bg1.jpg",
        conferenceState: '默认',
        contributeToLink: 0,
        registerToLink: 0,
        /*contributeLink: '',
        registerLink: '',*/
        whetherAuthor: yes,
        resp: {
          data: {}
        },
        user: null,
        display_id: 1,
        title: "",
        abstract: "",
        participates: [
        ],
        upload: {
          files: [],
          url: 'http://140.143.19.133:8001',
          size: 100 * 1024 * 1024,
          maximum: 1
        },
        participate_field: {
          name: "",
          phone: "",
          gender:"",
          accommodate: 0,
          work: "",
          note: ""
        },
      }
    },
    created: function() {
      if (this.$route.params.id) {
        this.conference_id = this.$route.params.id;
      } else {
        M.toast({
          html: "<span style='font-weight: bold;'>需要路由参数</span>",
          classes: 'red rounded'
        });
        this.$router.push("/404");
      }

      if (!this.session_token)  {
        this.$router.push("/login");
      }

      this.load_user_info();
      this.load_conference();
    },
    mounted: function () {
    },
    methods: {
      demo_oriented_upload() {
        if (this.upload.files[0]) {
          this.upload.files[0].success = true;
          M.toast({html: "<span style='font-weight: bold;'>上传成功</span>", classes: 'green rounded'});
        } else {
          M.toast({html: "<span style='font-weight: bold;'>请先选择文件</span>", classes: 'yellow darken-2 rounded'});
        }
      },
      load_user_info() {
        let that = this;
        this.$axios.post("/api/user/token", {
          token: this.session_token
        }).then(response => {
          let resp = response.data;
          if (resp.status === "succ") {
            that.user_info = resp.data;
          } else {
            that.$router.push("/login");
          }
        })
      },
      load_conference() {
        this.$axios.post('api/conference/' + this.conference_id).then(response => {
          this.resp = response.data;
          this.getConferenceState();
          this.isAbleRegister();
          this.getConferenceImg();
        }).catch(error => {
          console.log(1);
        });
      },
      /*toContribute: function () {
        if(sessionStorage.getItem("session")) {
          console.log(sessionStorage.getItem("session"));
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
      },*/
      isAbleRegister: function () {
        if (this.conferenceState !== "征稿中") {
          this.$router.push("/404");
        }
      },
      getConferenceImg: function () {
        this.conferenceImg = "http://140.143.19.133:8001/uploads/" + this.resp.data.backimg;
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
      },

      hasThesis: function() {
        if(this.whetherAuthor === '是') {

        }
        else {

        }
      },

      add_author() {
        let name = this.participate_field.name.trim();
        let telephone = this.participate_field.phone.trim();
        let gender = this.participate_field.gender.trim();
        let accommodate = this.participate_field.accommodate.trim();
        let job = this.participate_field.work.trim();
        let note = this.participate_field.note.trim();

        if (name.length === 0) {
          M.toast({html: "<span style='font-weight: bold;'>请填写作者姓名</span>", classes: 'yellow darken-2 rounded'});
          return;
        }
        if (telephone.length === 0) {
          M.toast({html: "<span style='font-weight: bold;'>请填联系方式</span>", classes: 'yellow darken-2 rounded'});
          return;
        }
        if (gender.length === 0) {
          M.toast({html: "<span style='font-weight: bold;'>请选择性别</span>", classes: 'yellow darken-2 rounded'});
          return;
        }
        if (job.length === 0) {
          M.toast({html: "<span style='font-weight: bold;'>请填工作</span>", classes: 'yellow darken-2 rounded'});
          return;
        }

        let participate = {
          name: name,
          phone:telephone,
          work: job
        };
        this.participates.push(participate);
        this.participate_field.name = "";
        this.participate_field.phone = "";
        this.participate_field.work = "";
        this.participate_field.note = "";
      },
      submit() {
        let title = this.title;
        let abstract = this.abstract;
        let authors = this.authors;
        let files = this.upload.files;
        if (title.length === 0) {
          M.toast({html: "<span style='font-weight: bold;'>请填写标题</span>", classes: 'yellow darken-2 rounded'});
          return;
        }
        if (abstract.length === 0) {
          M.toast({html: "<span style='font-weight: bold;'>请填写摘要</span>", classes: 'yellow darken-2 rounded'});
          return;
        }
        if (authors.length === 0) {
          M.toast({html: "<span style='font-weight: bold;'>请填写作者</span>", classes: 'yellow darken-2 rounded'});
          return;
        } else {
          let ok = false;
          for (let i = 0; i < authors.length; i++) {
            if (authors[i].name === this.user_info.name) {
              ok = true;
              break;
            }
          }
          if (!ok) {
            M.toast({
              html: "<span style='font-weight: bold;'>你必须是作者之一才能投递这篇论文</span>",
              classes: 'yellow darken-2 rounded'
            });
            return;
          }
        }
        if (files.length === 0) {
          M.toast({
            html: "<span style='font-weight: bold;'>请上传文件</span>",
            classes: 'yellow darken-2 rounded'
          });
          return;
        } else {
          if (!files[0].success) {
            // M.toast({
            //   html: "<span style='font-weight: bold;'>请先点“开始上传”</span>",
            //   classes: 'yellow darken-2 rounded'
            // });
            // return;
            // TODO: resolve WebIO
          }
        }
        let authors_str = JSON.stringify(authors);
        let file_url = "";
        //let file_url = files[0].response;
        let params = {
          conference_id: this.conference_id,
          title: title,
          abstract: abstract,
          authors: authors_str,
          file_url: file_url,
        };
        let that = this;
        this.$axios.post("/api/contribute", params).then(
          rsp => {
            let data = rsp.data;
            if (data.status==="succ") {
              let contribution_id = data.data.contribution_id;
              //this.$router.push("/contribution/"+contribution_id);
              M.toast({
                html: "<span style='font-weight: bold;'>投稿成功</span>",
                classes: 'green rounded'
              });
              that.$router.push("/conference/"+this.conference_id);
            } else {
              M.toast({
                html: "<span style='font-weight: bold;'>投稿失败</span>",
                classes: 'red rounded'
              });
            }
          }
        ).catch(err=>{
          M.toast({
            html: "<span style='font-weight: bold;'>error occurred</span>",
            classes: 'red rounded'
          });
        });
      }
    }
  }
</script>

<style scoped>
  .customize {
    background-size: 100% !important;
    background-repeat: no-repeat !important;
    background-position: center center !important;
  }
</style>
