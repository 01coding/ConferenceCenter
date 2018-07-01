<template>
  <div>
    <!--<header>-->
    <!--<div class="top-nav">-->
    <!--<div class="container">-->
    <!--<div class="nav-wrapper">-->
    <!--<h4 class="header">发布新会议</h4>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="divider"></div>-->
    <!--</div>-->
    <!--</header>-->
    <!--<div class="container">-->
    <div class="row">
      <form class="col s12">
        <div class="row">
          <div class="col s6">
            <h5>会议信息</h5>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s8">
            <input id="conf-topic" type="text" v-model="conf_topic" data-length="40"/>
            <label for="conf-topic">会议名称</label>
          </div>
          <div class="input-field col s4">
            <select id="conf-field-select" v-model="conf_field">
              <option value="" disabled selected>选择领域</option>
              <option value="1">机器视觉</option>
              <option value="2">运筹学</option>
            </select>
            <label for="conf-field-select">会议领域</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <textarea id="conf-desc" class="materialize-textarea" v-model="conf_desc"></textarea>
            <label for="conf-desc">会议简介</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6 m5 l5 xl4">
            <input id="conf-start-date" type="text" class="datepicker" v-model="conf_start_date"/>
            <label for="conf-start-date">会议开始日期</label>
          </div>
          <div class="input-field col s6 m5 l5 xl4">
            <input id="conf-end-date" type="text" class="datepicker" v-model="conf_end_date"/>
            <label for="conf-end-date">会议结束日期</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s8">
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
            <input id="conf-eassy-ddl" type="text" class="datepicker" v-model="conf_eassy_ddl"/>
            <label for="conf-eassy-ddl">截稿日期</label>
          </div>
          <div class="input-field col s3">
            <input id="conf-eassy-time" type="text" class="timepicker" v-model="conf_eassy_time"/>
            <label for="conf-eassy-time">截稿时间</label>
          </div>
          <div class="input-field col s6">
            <input id="conf-release-ddl" type="text" class="datepicker" v-model="conf_release_ddl"/>
            <label for="conf-release-ddl">录用通知日期</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <textarea id="conf-eassy-info" class="materialize-textarea" v-model="conf_eassy_info"></textarea>
            <label for="conf-eassy-info">征文信息</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <textarea id="conf-eassy-inst" class="materialize-textarea" v-model="conf_eassy_inst"></textarea>
            <label for="conf-eassy-inst">投稿须知</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <input id="conf-paper-template" type="text" v-model="conf_paper_template"/>
            <label for="conf-paper-template">论文模板</label>
          </div>
        </div>
        <div class="row">
          <div class="col s6">
            <h5>日程及其他</h5>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <textarea id="conf-schedule" class="materialize-textarea" v-model="conf_schedule"></textarea>
            <label for="conf-schedule">日程安排</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s4">
            <input id="conf-register-ddl" type="text" class="datepicker" v-model="conf_register_ddl"/>
            <label for="conf-register-ddl">注册截止日期</label>
          </div>
          <div class="input-field col s2">
            <input id="conf-register-time" type="text" class="timepicker" v-model="conf_register_time"/>
            <label for="conf-register-time">时间</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <textarea id="conf-register-info" class="materialize-textarea" v-model="conf_register_info"></textarea>
            <label for="conf-register-info">注册信息</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <textarea id="conf-commute-info" class="materialize-textarea" v-model="conf_commute_info"></textarea>
            <label for="conf-commute-info">住宿交通</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
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
          <div class="input-field col s12">
            <input id="conf-bg-img" type="text" v-model="conf_bg_img"/>
            <label for="conf-bg-img">背景图片</label>
          </div>
        </div>
      </form>
      <div>
        <div class="center-align">
          <a class="waves-effect waves-light btn grey">取消</a>
          <a class="waves-effect waves-light btn" @click="submit_conference()">提交</a>
        </div>
      </div>
    </div>
    <!--</div>-->
  </div>
</template>

<script>
  export default {
    name: "NewConference",
    data: function () {
      return {
        conf_topic: "",
        conf_field: "",
        conf_desc: "",
        conf_start_date: "",
        conf_end_date: "",
        conf_location: "",
        conf_eassy_info: "",
        conf_eassy_inst: "",
        conf_eassy_ddl: "",
        conf_eassy_time: "23:59",
        conf_release_ddl: "",
        conf_release_time: "",
        conf_register_ddl: "",
        conf_register_time: "23:59",
        conf_schedule: "",
        conf_paper_template: "",
        conf_register_info: "",
        conf_commute_info: "",
        conf_contact: "",
        conf_conference_template: 1,
        conf_bg_img: ""
      };
    },
    created: function () {
      $(document).ready(function () {
        $('#conf-topic').characterCounter();
        // $('#conf-start-date').datepicker();
        // $('#conf-end-date').datepicker();
        // $('.datepicker').datepicker();
        $('.dropdown-trigger').dropdown();
        $('select').formSelect();
      });
    },
    mounted: function () {
      document.addEventListener('DOMContentLoaded', () => {
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
            this.conf_eassy_ddl = date;
          }
        };
        elem = document.querySelector('#conf-eassy-ddl');
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
            this.conf_eassy_time = hour + ':' + minute;
          }
        };
        elem = document.querySelector('#conf-eassy-time');
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
      });
    },
    methods: {
      submit_conference: function () {
        this.$axios.post('/api/postConference', {
          institution_id: 1,
          title: this.conf_topic,
          field: parseInt(this.conf_field),
          introduction: this.conf_desc,
          start_date: this.conf_start_date + ' 00:00:00',
          end_date: this.conf_end_date + ' 23:59:59',
          convening_place: this.conf_location,
          eassy_information: this.conf_eassy_info,
          eassy_instructions: this.conf_eassy_inst,
          paper_ddl: this.conf_eassy_ddl + ' ' + this.conf_eassy_time + ':59',
          employ_date: this.conf_release_ddl + ' 00:00:00',
          register_ddl: this.conf_register_ddl + ' ' + this.conf_register_time + ':59',
          schedule: this.conf_schedule,
          paper_template: this.conf_paper_template,
          register_information: this.conf_register_info,
          ATinformation: this.conf_commute_info,
          contact: this.conf_contact,
          conference_template: this.conf_conference_template,
          backimg: this.conf_bg_img
        }).then(data => {
          if (data.status === 'succ') {
            console.log('post succ');
          }
        }).catch(err => {
          console.log(err);
        })
      },
    }
  }
</script>

<style scoped>
  /*#conf-topic {*/
  /*font-size: 5em;*/
  /*}*/
</style>
