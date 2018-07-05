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
        <div class="col s10 offset-s1 ">
          <div class="row" style="margin-bottom: 0;">
            <h5>以{{identify}}身份注册会议</h5>
          </div>
          <div class="center row">
            <h5 style="font-size: 1.5rem; margin: 0; padding-top: 1rem; padding-bottom: 1rem; margin-left: 1rem; margin-right: 1rem; background: #eeeeee; color: #757575; border-radius: 0.5rem;" v-if="papers.length===0">
              您没有参会论文
            </h5>
            <div class="col s12" v-for="(it, index) in papers"
                 style="margin-bottom: 1rem;">
              <div class="card-panel" style="padding-top: 0.5rem;">
                <div class="row">
                  <h5>{{it.title}}</h5>
                  <h6 class="right">#{{it.paper_number}}</h6>
                </div>
                <div class="row">
                  <div class="col s4" v-for="(item,id) in it.authors"
                  style="margin-bottom: 1rem">
                    <div class="card-panel" style="padding-top: 0.5rem">
                      <div>{{item.name}}</div>
                      <div>{{item.email}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <h5>参会人</h5>
          </div>
          <div class="row" style="margin-bottom: 0;">
            <div class="center row">
              <h5 style="font-size: 1.5rem; margin: 0; padding-top: 1rem; padding-bottom: 1rem; margin-left: 1rem; margin-right: 1rem; background: #eeeeee; color: #757575; border-radius: 0.5rem;" v-if="participants.length===0">
                在这里添加参会人
              </h5>
              <div class="col s4" v-for="(participant, idx) in participants" style="margin-bottom: 1rem;">
                <div class="card-panel" style="padding-top: 0.5rem;" v-bind:id=idx @click="update_participant(idx)">
                  <div style="height: 24px;">
                    <i class="material-icons right"
                       @click="participants.splice(idx, 1)"
                       style="cursor: pointer">
                      clear
                    </i>
                  </div>
                  <div><h5 style="font-weight: bold; margin-top: 0;">{{participant.name}}</h5></div>
                  <i class="material-icons prefix"
                  :class="{ green: participant.sex === '男', red: participant.sex === '女'}">
                    person</i>
                  <i class="material-icons prefix" v-show="participant.is_book">home</i>
                  <div>{{participant.contract}}</div>
                  <div>{{participant.job}}</div>
                </div>
              </div>
            </div>
              <div class="row valign-wrapper" style="margin-bottom: 0;">
                <div class="input-field col s6">
                  <i class="material-icons prefix">account_circle</i>
                  <input id="first_name" type="text" v-model="participant_field.name">
                  <label for="first_name">姓名</label>
                </div>
                <div class="input-field col s6">
                  <i class="material-icons prefix">call</i>
                  <input id="phone" type="text" v-model="participant_field.contract">
                  <label for="phone">联系方式</label>
                </div>
              </div>
              <div class="row valign-wrapper" style="margin-bottom: 0;padding-top: 3px;padding-bottom: 3px;">
                  <div class="col s2 valign-wrapper">
                    <i class="material-icons prefix">person</i>
                    性别
                  </div>
                  <label class="col s2">
                    <input type="radio" value="男" v-model="participant_field.sex" />
                    <span>男</span>
                  </label>
                  <label class="col s2">
                    <input type="radio" value="女" v-model="participant_field.sex" />
                    <span>女</span>
                  </label>
                  <div class="col s3 valign-wrapper">
                    <i class="material-icons prefix">home</i>
                    预定住宿
                  </div>
                  <div class="switch col s3">
                    <label>
                      Off
                      <input type="checkbox" v-model="participant_field.is_book">
                      <span class="lever"></span>
                      On
                    </label>
                </div>
              </div>
            <div class="row valign-wrapper" style="margin-bottom: 0;">
              <div class="input-field col s12">
                <i class="material-icons prefix">work</i>
                <input id="job" type="text" v-model="participant_field.job">
                <label for="job">工作</label>
              </div>
            </div>
            <div class="row valign-wrapper" style="margin-bottom: 0;">
              <div class="input-field col s12">
                <i class="material-icons prefix">note</i>
                <input id="note" type="text" v-model="participant_field.note">
                <label for="note">备注</label>
              </div>
            </div>
            <div class="row valign-wrapper" style="margin-bottom: 0;">
              <div class="waves-effect waves-light btn green col s1" @click="add_participant">添加
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
  import NavBar from "@/include/NavBar";
  import FileUpload from "vue-upload-component";
  import axios from 'axios';

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
        identify: "初始值",
        resp: {
          data: {}
        },
        user_info: {},
        participants: [],
        papers: [],
        upload: {
          files: [],
          url: 'http://140.143.19.133:8001',
          size: 100 * 1024 * 1024,
          maximum: 1
        },
        participant_field: {
          name: "",
          contract: "",
          sex:"",
          is_book: false,
          job: "",
          note: "",
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
      if (!sessionStorage.getItem("session"))  {
        this.$router.push("/login");
      }

      this.load_user_info();
      this.load_conference();
      this.load_papers_info();
    },

    mounted: function () {
    },
    methods: {
      demo_oriented_upload() {
        if (this.upload.files[0]) {
          this.upload.files[0].success = true;
          M.toast({
            html: "<span style='font-weight: bold;'>上传成功</span>",
            classes: 'green rounded'
          });
        }
        else {
          M.toast({
            html: "<span style='font-weight: bold;'>请先选择文件</span>",
            classes: 'yellow darken-2 rounded'
          });
        }
      },
      load_user_info() {
        let that = this;
        this.$axios.post("/api/user/token", {
          token: sessionStorage.getItem("session")
        }).then(response => {
          let resp = response.data;
          if (resp.status === "succ") {
            that.user_info = resp.data;
          } else {
            that.$router.push("/login");
          }
        });
      },
      load_conference() {
        this.$axios.post('api/conference/' + this.conference_id).then(response => {
          this.resp = response.data;
          this.getConferenceState();
          console.log(this.resp);
          this.isAbleRegister();
          this.getConferenceImg();
          // this.load_papers_info();
        }).catch(error => {
          console.log(1);
        });
      },
      load_papers_info: function() {
        let originThis=this;
        /*let thats = this;*/
        this.$test.post('/api/user/getRegister',{
          token: sessionStorage.getItem("session"),
          conference_id: this.conference_id
        }).then(response => {
          if(response.data.data.type === 0) {
            originThis.identify = "作者";
            console.log("go to type === 0");
          }
          else {
            originThis.identify = "聆听者";
          }
          console.log("response.data.data");
          console.log(response.data.data);
          originThis.papers = response.data.data.papers;
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

      update_participant: function(idx) {
        //add shadow
        $('#'+idx).addClass("z-depth-5");
        //auto fill name
        this.participant_field = this.participants[idx];
      },
      add_participant() {
        console.log("participants:");
        console.log(this.participants);

        let name = this.participant_field.name.trim();
        let telephone = this.participant_field.contract.trim();
        let gender = this.participant_field.sex.trim();
        let job = this.participant_field.job.trim();
        let note = this.participant_field.note.trim();
        let accommodate = 0;
        if(this.participant_field.is_book === true) {
          accommodate = 1;
        }

        if (name.length === 0) {
          M.toast({
            html: "<span style='font-weight: bold;'>请填写作者姓名</span>",
            classes: 'yellow darken-2 rounded'
          });
          return;
        }
        if (telephone.length === 0) {
          M.toast({
            html: "<span style='font-weight: bold;'>请填联系方式</span>",
            classes: 'yellow darken-2 rounded'
          });
          return;
        }
        if (gender.length === 0) {
          M.toast({
            html: "<span style='font-weight: bold;'>请选择性别</span>",
            classes: 'yellow darken-2 rounded'
          });
          return;
        }
        if (job.length === 0) {
          M.toast({
            html: "<span style='font-weight: bold;'>请填工作</span>",
            classes: 'yellow darken-2 rounded'
          });
          return;
        }

        //participant is a person in papers.authors
        let inAuthor = false;
        for(let i = 0; i < this.papers.length; i++) {
          for(let j = 0; j< this.papers[i].authors.length; j++) {
            if(name === this.papers[i].authors[j].name) {
              inAuthor = true;
              break;
            }
          }
        }
        if(!inAuthor) {
          M.toast({
            html: "<span style='font-weight: bold;'>参会人员必须是作者之一</span>",
            classes: 'yellow darken-2 rounded'
          });
          return;
        }

        //update or insert
        let tempParticipant = {
          name: name,
          contract: telephone,
          sex: gender,
          job: job,
          note: note,
          is_book: accommodate
        };
        let index = this.participants.findIndex(function(item) {
          return item.name === tempParticipant.name;
        });
        console.log("index==" + index);
        if(index === -1) {
          this.participants.push(tempParticipant);
        }
        else {
          this.participants[index] = tempParticipant;
        }

        //remove shadow
        $('#'+index).removeClass("z-depth-5");
        console.log("temp participant:");
        console.log(tempParticipant);
        console.log("participants:");
        console.log(this.participants);
        //clear
        this.participant_field.name = "";
        this.participant_field.contract = "";
        this.participant_field.job = "";
        this.participant_field.note = "";
        this.participant_field.sex = "";
        this.participant_field.is_book = false;
      },

      submit() {
        let files = this.upload.files;
        let type = 0;
        //update participant type
        if(this.identify === "聆听者") {
          type = 1;
        }
        //check participants including the user himself
        let ok = false;
        for(let i = 0; i < this.participants.length; i++) {
          if(this.participants[i].name == this.user_info.name) {
            ok = true;
            break;
          }
        }
        if(ok === false) {
          M.toast({
            html: "<span style='font-weight: bold;'>参会人中必须有本人</span>",
            classes: 'yellow darken-2 rounded'
          });
        }
        //check have pdf or picture
        if (files.length === 0) {
          M.toast({
            html: "<span style='font-weight: bold;'>请上传文件</span>",
            classes: 'yellow darken-2 rounded'
          });
          return;
        } else {
          if (!files[0].success) {
            // TODO: resolve WebIO
          }
        }
        //check participants information
        let participant_str = JSON.stringify(this.participants);
        if(type === 1) {
          if(this.participants.length != 1) {
            M.toast({
              html: "<span style='font-weight: bold;'>您只能本人参会</span>",
              classes: 'yellow darken-2 rounded'
            });
            return;
          }
        }
        else {
          if(this.participants.length < 1) {
            M.toast({
              html: "<span style='font-weight: bold;'>您需要填写至少一位参会者信息</span>",
              classes: 'yellow darken-2 rounded'
            });
            return;
          }
        }
        //set parameters to transmit
        let file_url = "";
        //let file_url = files[0].response;
        let params = {
          token: sessionStorage.getItem("session"),
          conference_id: this.conference_id,
          payment: file_url,
          type: type,
          participants: participant_str
        };
        //transmit message
        this.$test.post("/api/user/register",params).then(rsp => {
          let data = rsp.data;
          if(data.status === "succ") {
            M.toast({
              html: "<span style='font-weight: bold;'>会议注册成功</span>",
              classes: 'green rounded'
            });
            this.$router.push("/personalspace/registeredconferences");
          }
          else {
            M.toast({
              html: "<span style='font-weight: bold;'>会议注册失败</span>",
              classes: 'red rounded'
            });
          }
        }).catch(error => {
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
