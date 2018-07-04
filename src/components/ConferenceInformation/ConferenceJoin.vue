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
              <h5>以xx身份注册会议</h5>
            </div>
          </div>
          <div class="row">
            <h5>参会人</h5>
          </div>
          <div class="row" style="margin-bottom: 0;">
            <div class="center row">
              <h5 style="font-size: 1.5rem; margin: 0; padding-top: 1rem; padding-bottom: 1rem; margin-left: 1rem; margin-right: 1rem; background: #eeeeee; color: #757575; border-radius: 0.5rem;" v-if="participates.length===0">
                在这里添加参会人
              </h5>
              <div class="col s4" v-for="(participate, idx) in participates"
                   style="margin-bottom: 1rem;">
                <div class="card-panel" v-bind:id=idx style="padding-top: 0.5rem;" @click="update_participate(idx)">
                  <div style="height: 24px;">
                    <i class="material-icons right"
                       @click="participates.splice(idx, 1)"
                       style="cursor: pointer">
                      clear
                    </i><!--delete card-->
                  </div>
                  <div>
                    <h5 style="font-weight: bold; margin-top: 0;">{{participate.name}}</h5>
                    <i class="material-icons prefix after-add">person</i>
                    <i class="material-icons prefix after-add"
                    v-bind:class="{disabled: participate.accommodate === false}">home</i>
                  </div>
                  <div class="init">{{participate.institution}}</div>
                  <div class="init">{{participate.email}}</div>
                  <div class="after-add">{{participate.phone}}</div>
                  <div class="after-add">{{participate.work}}</div>
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
                    <input type="radio" value="male" v-model="participate_field.gender" />
                    <span>男</span>
                  </label>
                  <label class="col s2">
                    <input type="radio" value="female" v-model="participate_field.gender" />
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
              <div class="waves-effect waves-light btn green col s1" @click="add_participate">添加
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
        bg_overlay: "linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)),",
        conference_id: 1,
        conferenceImg: "/static/bg1.jpg",
        conferenceState: '默认',
        contributeToLink: 0,
        registerToLink: 0,
        identify: "",
        resp: {
          data: {}
        },
        user_info: {},
        participates: [],
        papers: [],
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
      //hide some of card attributions
      $(document).ready(function() {
        $('.after-add').hide();
        $('.init').show();
      });

      if (this.$route.params.id) {
        this.conference_id = this.$route.params.id;
      } else {
        M.toast({
          html: "<span style='font-weight: bold;'>需要路由参数</span>",
          classes: 'red rounded'
        });
        this.$router.push("/404");
      }
      if (!sessionStorage.getItem("session"))  {
        this.$router.push("/login");
      }

      this.load_user_info();
      this.load_conference();
      this.load_author_info();
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
          token: sessionStorage.getItem("session")
        }).then(response => {
          let resp = response.data;
          console.log(resp);
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
          console.log(this.resp);
          this.isAbleRegister();
          this.getConferenceImg();
        }).catch(error => {
          console.log(1);
        });
      },
      load_author_info: function() {
        this.$axios.post('/api/user/getRegister',{
          token: sessionStorage.getItem("session"),
          conference_id: this.conference_id
        }).then(response => {
          if(response.data.data.type === 0) {
            this.identify = "作者";
          }
          else {
            this.identify = "聆听者";
          }
          this.participates = response.data.data.author;
          this.papers = response.data.data.paper;
        }).catch(error => {
          console.log(1);
        });
      },

      isAbleRegister: function () {
        if (this.conferenceState !== "征稿中") {
          this.$router.push("/404");
        }
      },
      getConferenceImg: function () {
        this.conferenceImg = "http://140.143.19.133:8001/uploads/" + this.resp.data.backimg;
      },
      getConferenceState: function () {
        if (this.resp.data.state & 0b1000) {
          this.conferenceState = '已结束';
        }
        else if (!this.resp.data.state & 0b0100) {
          this.conferenceState = '正在进行中';
        }
        else if (this.resp.data.state & 0b0001) {
          this.conferenceState = '征稿中';
        }
        else if (this.resp.data.state & 0b0010) {
          this.conferenceState = '会议注册中';
        }
      },

      update_participate: function(idx) {
        //加阴影
        $('#'+idx).addClass("z-depth-5");
        //自动填充name

      },

      add_participate() {
        let name = this.participate_field.name.trim();
        let telephone = this.participate_field.phone.trim();
        let gender = this.participate_field.gender.trim();
        let job = this.participate_field.work.trim();
        let note = this.participate_field.note.trim();
        let accommodate = this.participate_field.accommodate;

        console.log("gender:" + this.participate_field.gender);

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

        let index = this.participates.findIndex(name);
        let institution = this.participates[index].institution;
        let email = this.participates[index].email;

        let participate = {
          name: name,
          phone:telephone,
          work: job,
          note: note,
          gender: gender,
          accommodate: accommodate,
          institution: institution,
          email: email
        };
        this.participates[index] = participate;
        this.participates.push(participate);

        $(document).ready(function() {
          $('.after-add').show();
          $('.init').hide();
          $('#'+idx).addClass("teal z-depth-5");
        });

        this.participate_field.name = "";
        this.participate_field.phone = "";
        this.participate_field.work = "";
        this.participate_field.note = "";
      },
      submit() {
        let registerType = 0;
        let thesisCode = "";
        if(this.whetherAuthor === "yes") {
          registerType = 0;
          }
          else {
          registerType = 2;
        }
        let files = this.upload.files;

        if (registerType.length === 0) {
          M.toast({html: "<span style='font-weight: bold;'>请选择参会类型</span>", classes: 'yellow darken-2 rounded'});
          return;
        } else {
          let ok = false;
          for (let i = 0; i < participates.length; i++) {
            /*user is a person of participates*/
            if (participates[i].name === this.user_info.name) {
              ok = true;
              break;
            }
          }
          if (!ok) {
            M.toast({
              html: "<span style='font-weight: bold;'>你必须是作者之一才能参与</span>",
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
        let participate_str = JSON.stringify(participates);
        let file_url = "";
        //let file_url = files[0].response;
        let params = {
          conference_id: this.conference_id,
          participates: participate_str,
          file_url: file_url
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
