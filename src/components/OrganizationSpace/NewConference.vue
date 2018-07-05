<template>
  <div>
    <test-robot v-on:child-say="fill_form"></test-robot>
    <div class="row white section">
      <div class="col s10 offset-s1">
        <div style="height: 3rem;"></div>
        <form class="col s12">
          <div class="row">
            <div class="col s6">
              <h5>会议信息</h5>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s8">
              <i class="prefix material-icons">title</i>
              <input id="conf-topic" type="text" v-model="conf_topic" data-length="40"/>
              <label for="conf-topic">会议名称</label>
            </div>
            <div class="input-field col s4">
              <select id="conf-field-select" v-model="conf_field">
                <option value='' disabled selected>选择领域</option>
                <option v-bind:value="field.tag_id" v-bind:key="id" v-for="(field, id) in field_list">{{ field.name }}
                </option>
                <!--<option value="1">机器视觉</option>-->
                <!--<option value="2">运筹学</option>-->
              </select>
              <label for="conf-field-select">会议领域</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="medium material-icons prefix">subject</i>
              <textarea id="conf-desc" class="materialize-textarea" v-model="conf_desc"></textarea>
              <label for="conf-desc">会议简介</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6 m5 l5 xl4">
              <i class="medium material-icons prefix">event</i>
              <input id="conf-start-date" type="text" class="datepicker" v-model="conf_start_date"/>
              <label for="conf-start-date">会议开始日期</label>
            </div>
            <div class="input-field col s6 m5 l5 xl4">
              <i class="medium material-icons prefix">event</i>
              <input id="conf-end-date" type="text" class="datepicker" v-model="conf_end_date"/>
              <label for="conf-end-date">会议结束日期</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s8">
              <i class="medium material-icons prefix">place</i>
              <input id="conf-location" type="text" v-model="conf_location"/>
              <label for="conf-location">会议地点</label>
            </div>
          </div>
          <div class="row">
            <div class="col s6">
              <h5>稿件信息</h5>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s3">
              <i class="medium material-icons prefix">event</i>
              <input id="conf-essay-ddl" type="text" class="datepicker" v-model="conf_essay_ddl"/>
              <label for="conf-essay-ddl">截稿日期</label>
            </div>
            <div class="input-field col s3">
              <i class="medium material-icons prefix">access_time</i>
              <input id="conf-essay-time" type="text" class="timepicker" v-model="conf_essay_time"/>
              <label for="conf-essay-time">截稿时间</label>
            </div>
            <div class="input-field col s6">
              <i class="medium material-icons prefix">event</i>
              <input id="conf-release-ddl" type="text" class="datepicker" v-model="conf_release_ddl"/>
              <label for="conf-release-ddl">录用通知日期</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="medium material-icons prefix">library_books</i>
              <textarea id="conf-essay-info" class="materialize-textarea" v-model="conf_essay_info"></textarea>
              <label for="conf-essay-info">征文信息</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="medium material-icons prefix">event_note</i>
              <textarea id="conf-essay-inst" class="materialize-textarea" v-model="conf_essay_inst"></textarea>
              <label for="conf-essay-inst">投稿须知</label>
            </div>
          </div>
          <div class="row">
            <div class="file-field input-field col s10">
              <div class="btn" @change="get_template($event)">
                <span>上传论文模板</span>
                <input type="file">
              </div>
              <div class="file-path-wrapper">
                <input class="file-path validate" type="text" placeholder="论文模板"/>
              </div>
            </div>
            <!--<div class="input-field col s6">-->
            <!--<input id="conf-paper-template" type="text" v-model="conf_paper_template"/>-->
            <!--<label for="conf-paper-template">论文模板</label>-->
            <!--</div>-->
          </div>
          <div class="row">
            <div class="col s6">
              <h5>日程及其他</h5>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="medium material-icons prefix">event</i>
              <textarea id="conf-schedule" class="materialize-textarea" v-model="conf_schedule"></textarea>
              <label for="conf-schedule">日程安排</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s5">
              <i class="medium material-icons prefix">event</i>
              <input id="conf-register-ddl" type="text" class="datepicker" v-model="conf_register_ddl"/>
              <label for="conf-register-ddl">注册截止日期</label>
            </div>
            <div class="input-field col s6 offset-l1">
              <i class="medium material-icons prefix">access_time</i>
              <input id="conf-register-time" type="text" class="timepicker" v-model="conf_register_time"/>
              <label for="conf-register-time">时间</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="medium material-icons prefix">subject</i>
              <textarea id="conf-register-info" class="materialize-textarea" v-model="conf_register_info"></textarea>
              <label for="conf-register-info">注册信息</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="medium material-icons prefix">airport_shuttle</i>
              <textarea id="conf-commute-info" class="materialize-textarea" v-model="conf_commute_info"></textarea>
              <label for="conf-commute-info">住宿交通</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="medium material-icons prefix">local_phone</i>
              <textarea id="conf-contact" class="materialize-textarea" v-model="conf_contact"></textarea>
              <label for="conf-contact">联系方式</label>
            </div>
          </div>
          <div class="row">
            <div class="col s6">
              <h5>页面外观</h5>
            </div>
          </div>
          <!--<div class="row">-->
          <!--<div class="input-field col s6">-->
          <!--<input id="conf-conference-template"/>-->
          <!--<label for="conf"-->
          <!--</div>-->
          <!--</div>-->
          <div class="row">
            <div class="file-field input-field col s10">
              <div class="btn" @change="get_image($event)">
                <span>上传背景图片</span>
                <input type="file">
              </div>
              <div class="file-path-wrapper">
                <input class="file-path validate" type="text" placeholder="背景图片"/>
              </div>
            </div>
            <!--<div class="input-field col s12">-->
            <!--<input id="conf-bg-img" type="text" v-model="conf_bg_img"/>-->
            <!--<label for="conf-bg-img">背景图片</label>-->
            <!--</div>-->
          </div>
        </form>
        <div>
          <div class="center-align">
            <a class="waves-effect waves-light btn grey">取消</a>
            <a class="waves-effect waves-light btn" @click="submit_conference()">提交</a>
          </div>
        </div>
      </div>
      <div style="height: 3rem;"></div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import TestRobot from "../../include/TestRobot";
  // import NavBar from "../../include/NavBar";

  export default {
    name: "NewConference",
    components: {TestRobot},
    // components: { NavBar },
    data: function () {
      return {
        conf_topic: '',
        conf_field: '',
        conf_desc: '',
        conf_start_date: '',
        conf_end_date: '',
        conf_location: '',
        conf_essay_info: '',
        conf_essay_inst: '',
        conf_essay_ddl: '',
        // conf_essay_time: "23:59",
        conf_essay_time: '',
        conf_release_ddl: '',
        conf_release_time: '',
        conf_register_ddl: '',
        // conf_register_time: "23:59",
        conf_register_time: '',
        conf_schedule: '',
        conf_paper_template: '',
        conf_register_info: '',
        conf_commute_info: '',
        conf_contact: '',
        conf_conference_template: 1,
        conf_bg_img: '',
        field_list: [],
        paper_template: '',
        back_img: '',
        template_path: '',
        image_path: ''
      };
    },
    created: function () {
      $(document).ready(function () {
        $('#conf-topic').characterCounter();
        // $('#conf-start-date').datepicker();
        // $('#conf-end-date').datepicker();
        // $('.datepicker').datepicker();
        $('.dropdown-trigger').dropdown();
      });
    },
    mounted: function () {
      this.$bus.emit('manage-change-title', { text: '发布新会议' });
      // document.addEventListener('DOMContentLoaded', () => {
      let options = {
        onSelect: date => {
          date = date.toDateString().slice(4, 15);
          this.conf_start_date = date;
        }
      };
      let elem = document.querySelector('#conf-start-date');
      let instance = M.Datepicker.init(elem, options);

      options = {
        onSelect: date => {
          date = date.toDateString().slice(4, 15);
          this.conf_end_date = date;
        }
      };
      elem = document.querySelector('#conf-end-date');
      instance = M.Datepicker.init(elem, options);

      options = {
        onSelect: date => {
          date = date.toDateString().slice(4, 15);
          this.conf_essay_ddl = date;
        }
      };
      elem = document.querySelector('#conf-essay-ddl');
      instance = M.Datepicker.init(elem, options);

      options = {
        onSelect: date => {
          date = date.toDateString().slice(4, 15);
          this.conf_release_ddl = date;
        }
      };
      elem = document.querySelector('#conf-release-ddl');
      instance = M.Datepicker.init(elem, options);

      options = {
        onSelect: date => {
          date = date.toDateString().slice(4, 15);
          this.conf_register_ddl = date;
        }
      };
      elem = document.querySelector('#conf-register-ddl');
      instance = M.Datepicker.init(elem, options);

      options = {
        defaultTime: '23:59',
        twelveHour: false,
        onSelect: (hour, minute) => {
          this.conf_essay_time = hour + ':' + minute;
        }
      };
      elem = document.querySelector('#conf-essay-time');
      instance = M.Timepicker.init(elem, options);

      options = {
        defaultTime: '23:59',
        twelveHour: false,
        onSelect: (hour, minute) => {
          this.conf_register_time = hour + ':' + minute;
        }
      };
      elem = document.querySelector('#conf-register-time');
      instance = M.Timepicker.init(elem, options);
      // });

      // get fields
      this.$axios.post('/api/subjects', {}).then(rsp => {
        let data = rsp.data;
        if (data.status === 'succ') {
          this.field_list = data.data;
          // console.log(data.data);
        }
      }).catch(err => {
        M.toast({
          html: "<span style='font-weight: bold'>获取领域失败</span>",
          classes: "rounded red"
        });
      })
    },
    updated: function () {
      $('select').formSelect();
    },
    methods: {
      fill_form:function(form_data){
          this.conf_topic=form_data.conf_topic;
          this.conf_field=form_data.conf_field;
          this.conf_desc = form_data.conf_desc;
          this.conf_start_date=form_data.conf_start_date;
          this.conf_end_date=form_data.conf_end_date;
          this.conf_location=form_data.conf_location;
          this.conf_essay_info=form_data.conf_essay_info;
          this.conf_essay_inst=form_data.conf_essay_inst;
          this.conf_essay_ddl=form_data.conf_essay_ddl;
          // conf_essay_time: "23:59",
          this.conf_essay_time=form_data.conf_essay_time;
          this.conf_release_ddl=form_data.conf_release_ddl;
          this.conf_register_ddl=form_data.conf_release_ddl;
          // conf_register_time: "23:59",
          this.conf_register_time=form_data.conf_register_time;
          this.conf_schedule=form_data.conf_schedule;
          this.conf_register_info=form_data.conf_register_info;
          this.conf_commute_info=form_data.conf_commute_info;
          this.conf_contact=form_data.conf_contact;
      },
      submit_conference: function () {
        let that = this;
        axios.all([ this.upload_template(), this.upload_image() ]).then(
          axios.spread(function (ut, ui) {
            that.$axios.post('/api/postConference', {
              // institution_id: 1,
              title: that.conf_topic,
              field: parseInt(that.conf_field),
              introduction: that.conf_desc,
              start_date: that.conf_start_date + ' 00:00:00',
              end_date: that.conf_end_date + ' 23:59:59',
              convening_place: that.conf_location,
              essay_information: that.conf_essay_info,
              essay_instructions: that.conf_essay_inst,
              paper_ddl: that.conf_essay_ddl + ' ' + that.conf_essay_time + ':59',
              employ_date: that.conf_release_ddl + ' 00:00:00',
              register_ddl: that.conf_register_ddl + ' ' + that.conf_register_time + ':59',
              schedule: that.conf_schedule,
              paper_template: that.template_path,
              register_information: that.conf_register_info,
              ATinformation: that.conf_commute_info,
              contact: that.conf_contact,
              conference_template: that.conf_conference_template,
              backimg: that.image_path
            }).then(rsp => {
              if (rsp.data.status === 'succ') {
                M.toast({
                  html: "<span style='font-weight: bold'>发布会议成功</span>",
                  classes: "rounded green"
                });
                this.$router.push('/orgspace');
              }
            }).catch(err => {
              M.toast({
                html: "<span style='font-weight: bold'>" + err.toString() + "</span>",
                classes: "rounded red"
              });
            });
          })
        );
      },
      get_template: function (event) {
        this.paper_template = event.target.files[ 0 ];
      },
      get_image: function (event) {
        this.back_img = event.target.files[ 0 ];
      },
      upload_template: function () {
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        let FileData = new FormData();
        FileData.append('file', this.paper_template);
        return this.$file.post('/', FileData, config).then(response => {
          this.template_path = response.data;
        });
      },
      upload_image: function () {
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        let FileData = new FormData();
        FileData.append('file', this.back_img);
        return this.$file.post('/', FileData, config).then(response => {
          this.image_path = response.data;
        });
      }
    }
  }
</script>

<style scoped>
  /*#conf-topic {*/
  /*font-size: 5em;*/
  /*}*/
  .col .row {
    margin-right: 0;
  }
</style>
