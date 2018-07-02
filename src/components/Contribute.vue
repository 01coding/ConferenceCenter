<template>
  <div class="width: 100%">
    <NavBar></NavBar>

    <div class="card"
         style="width: 100%; padding-top: 2rem; padding-bottom: 2rem; margin: 0;"
         :style="{'background-image':'url('+conference.background_img+')'}">
      <div class="white-text row container">
        <div class="col s10 offset-s1">
          <h5>投稿至</h5>
          <h4 style="font-weight: bold">{{resp.data.title}}</h4>
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
            <h5>论文信息</h5>
          </div>
          <div class="row" style="margin-bottom: 0;">
            <div class="input-field col s12">
              <i class="material-icons prefix">title</i>
              <input id="title" type="text" v-model="title">
              <label for="title">标题</label>
            </div>
          </div>
          <div class="row" style="margin-bottom: 0;">
            <div class="input-field col s12">
              <i class="material-icons prefix">subject</i>
              <textarea id="abstract" class="materialize-textarea" v-model="abstract"></textarea>
              <label for="abstract">摘要</label>
            </div>
          </div>
          <div class="row">
            <h5>作者</h5>
          </div>
          <div class="row" style="margin-bottom: 0;">
            <div class="center row">
              <h5 style="font-size: 1.5rem; margin: 0; padding-top: 1rem; padding-bottom: 1rem; margin-left: 1rem; margin-right: 1rem; background: #eeeeee; color: #757575; border-radius: 0.5rem;" v-if="authors.length===0">
                在这里添加作者
              </h5>
              <div class="col s4" v-for="(author, idx) in authors" style="margin-bottom: 1rem;">
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
                <input id="first_name" type="text" v-model="authors_field.name">
                <label for="first_name">姓名</label>
              </div>
              <div class="input-field col s4">
                <i class="material-icons prefix">account_balance</i>
                <input id="institution" type="text" v-model="authors_field.institution">
                <label for="institution">机构</label>
              </div>
              <div class="input-field col s4">
                <i class="material-icons prefix">email</i>
                <input id="email" type="email" v-model="authors_field.email">
                <label for="email">邮箱</label>
              </div>
              <div class="waves-effect waves-light btn green col s1" @click="add_author">添加
                <i class="material-icons right">add</i>
              </div>
            </div>
          </div>
          <div class="row">
            <h5>上传文件</h5>
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
          <div class="row" style="height: 2rem;">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../include/NavBar";
import FileUpload from "vue-upload-component";

export default {
  name: "Contribute",
  components: { NavBar, FileUpload },
  data: function () {
    return {
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
      display_id: 1,
      conference: {
        id: 0,
        name: "ICCV 2018: International Conference on Computer Vision",
        time: "October 22-29, 2017",
        place: "Venice, Italy",
        background_img: "http://iccv2017.thecvf.com/images/home_hero.jpg"
      },
      title: "",
      abstract: "",
      authors: [
      ],
      upload: {
        files: [],
        url: 'http://140.143.19.133:8001',
        size: 100 * 1024 * 1024,
        maximum: 1
      },
      authors_field: {
        name: "",
        institution: "",
        email: "",
      },
    }
  },
  created: function() {
    if (this.$route.params.id) {
      this.conference_id = this.$route.params.id;
      this.load_conference();
    } else {
      M.toast({
        html: "<span style='font-weight: bold;'>需要路由参数</span>",
        classes: 'red rounded'
      });
      this.$router.push("/404");
    }
  },
  mounted: function () {
  },
  methods: {
    load_conference() {
      this.$axios.post('api/conference/' + this.conference_id).then(response => {
        this.resp = response.data;
        console.log(this.resp.data);
        this.getConferenceState();
        this.isAbleContribute();
        this.getConferenceImg();
        console.log("contribute to link:" + this.contributeToLink);
        console.log("conference state:" + this.conferenceState);
      }).catch(error => {
        console.log(1);
      });
    },
    toContribute: function () {
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
    },
    isAbleContribute: function () {
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
    add_author() {
      let name = this.authors_field.name.trim();
      let institution = this.authors_field.institution.trim();
      let email = this.authors_field.email.trim();
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
      this.authors.push(author);
      this.authors_field.name = "";
      this.authors_field.institution = "";
      this.authors_field.email = "";
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
      console.log(params);
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
</style>
