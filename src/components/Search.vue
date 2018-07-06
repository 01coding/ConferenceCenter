<template>
  <div>
    <background></background>
    <navbar></navbar>
    <div class="white" style="width: 100%;">
      <div class="row" style="height: 1rem;"></div>
      <div class="row container">
        <div class="container">
          <div class="nav-wrapper searchBar">
            <form>
              <div class="input-field">
                <input id="search" type="search" class="grey-text text-lighten-1" v-model="search_keyword"
                       @keypress="enter_search($event)">
                <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                <i class="material-icons">close</i>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!--<div class="row" style="height: 0.2rem;"></div>-->
      <div class="row" style="margin-left: 23rem;">
        <a class="waves-effect waves-light btn-small  light-blue darken-1" style="margin:0rem 0rem;padding:0rem 0.5rem;" @click="setDateSearchState()"><i class="material-icons left" style="">date_range</i>使用日期检索</a>
      </div>
      <div class="row" v-if="date_search_state" style="margin-left: 23rem;">
        <form>
          <div class="row">
            <div class="input-field col s4">
              <i class="prefix material-icons">title</i>
              <select id="date-type-select" v-model="date_type">
                <option value="" disabled selected>选择日期类型</option>
                <option value="start">开始日期</option>
                <option value="end">结束日期</option>
                <option value="paper">投稿截止日期</option>
                <option value="register">注册截止日期</option>
              </select>
              <label>选择日期类型</label>
            </div>
            <div class="input-field col s4">
              <i class="medium material-icons prefix">event</i>
              <input id="date-select" type="text" class="datepicker" v-model="date_detail"/>
              <label for="date-select">选择日期</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s4">
              <label>
                <input type="checkbox" v-model="is_keyword"/>
                <span>在结果中检索</span>
              </label>
            </div>
            <div class="input-field col s4 right-align">
              <a class="waves-effect waves-light btn-small grey darken-1" style="margin:0rem 0rem;padding:0rem 0.5rem;" @click="date_search()"><i class="material-icons left" style="margin-right: 0.5rem">search</i>检索</a>
            </div>
          </div>
        </form>
      </div>
      <div class="row" style="height: 0.3rem;"></div>
    </div>
    <div style="height:20px;"></div>

    <div class="row container" style="max-width: 65rem;">
      <div class="card hoverable" v-if="conferences.total_num > 0" v-for="(res,id) in conferences.result" :key="id">
        <div class="card-image waves-effect waves-block waves-light"
             style="height: 8rem; background:black;">
          <img style="opacity: 0.5; object-fit: cover; object-position: center center;" :src="res.conf_bg_img" @click="$router.push('/conference/'+res.id)">
          <!--TODO: 这里放会议的背景图-->
            <span class="card-title" style="font-weight: bold; cursor: pointer;" >
              {{res.title}}
            </span>
        </div>
        <div class="card-content">
          <i class="material-icons right">arrow_forward</i>
          <div style="font-size: 1.35rem;">
            <span v-if="res.convening_date"><strong>{{res.convening_date.substr(0, 10)}},</strong> </span>
            <span><strong>{{res.convening_place}}</strong></span>
          </div>
          <p style="height:1rem;"></p>
          <p >{{res.introduction}}</p>
        </div>
      </div>
      <EmptyView v-if="conferences.total_num <= 0" style="height: 25rem;"></EmptyView>
    </div>
    <div class="center-align" v-if="conferences.total_num > 0">
      <Pagination @page="page"
                  :number="number"
                  :current="current"
      ></Pagination>
    </div>
    <div style="height: 3rem;"></div>
  </div>
</template>

<script>
  import navbar from '@/include/NavBar';
  import background from '@/include/Background'
  import getURL, { mapUrl } from '../router/APIget';
  import axios from 'axios';
  import Pagination from "@/include/Pagination";
  import EmptyView from "@/include/EmptyView";

  export default {
    name: 'Search',
    components: { navbar, background, getURL, axios, Pagination, EmptyView },
    data: function () {
      return {
        number: 1,
        current: 1,
        search_field: 0,
        search_keyword: this.$route.params.keyword,
        lazy_keyword: "",
        related: [],
        loader: {
          active: false
        },
        conferences: {
          page_number: 1,
          result: [],
          total_num: 10,
        },
        date_search_state: false,
        date_type:'none',
        date_detail:'',
        is_keyword:false,
      }
    },
    methods: {
      init: function () {
        let keywords_param = this.$route.params.keyword;
        if(keywords_param=='none')
            keywords_param='';
        this.date_type=this.$route.params.type;

        if(this.$route.params.date=='0')
          this.date_detail='';
        else{
          this.date_detail=this.$route.params.date;
          this.date_detail=this.str_insert(this.date_detail,3,' ');
          this.date_detail=this.str_insert(this.date_detail,6,' ');
          this.date_detail=this.str_insert(this.date_detail,this.date_detail.length,' 00:00:00');
        }

        console.warn("yu");
        console.warn(this.date_detail);

        let that = this;
        // axios.post('http://118.89.229.204:8080/server-0.0.1-SNAPSHOT/api/SearchCoferences', {
        this.$axios.post('/api/SearchConferences', {
          "keyword": keywords_param,
          "index": 1,
          "size": 10,
          "date_type":this.date_type,
          "date":this.date_detail
        }).then(function (response) {
          let resp = response.data;
          if (resp.status === "succ") {
            that.conferences = resp.data;
            that.number = resp.data.page_num;
            that.current = 1;
            let results = that.conferences.result;
            for (let i = 0; i < results.length; i++) {
              let res = results[i];
              let img_num = that.getRandomInt(2, 6);
              res.conf_bg_img = "/static/bg" + img_num + ".jpg";
            }
            //TODO: 实装会议的背景图
          } else {
            M.toast({
              html:"<span style='font-weight: bold'> 请求错误:"+ resp.info +"</span>",
              classes: "rounded red"
            });
          }
        }).catch(function (error) {
          M.toast({
            html:"<span style='font-weight: bold'> 请求错误</span>",
            classes: "rounded red"
          });
        });
      },
      str_insert:function (str,pos,stmp) {
        return str.slice(0,pos)+stmp+str.slice(pos,str.length);
      },
      enter_search: function (event) {
        if (event.keyCode === 13 && this.search_keyword.length > 0)
          this.$router.push("/search/" + this.search_keyword+"/0/none");
      },
      page: function (page) {
        const field = this.search_keyword;
        this.current=page;

        let that = this;
        this.$axios.post('http://118.89.229.204:8080/server-0.0.1-SNAPSHOT/api/SearchConferences', {
          "keyword": field,
          "index": page,
          "size": 10,
          "date_type":this.date_type,
          "date":this.date_detail
        }).then(function (response) {
            let resp = response.data;
            if (resp.status === "succ") {
              console.warn(response.data.data);
              console.warn(response.data.data.result)
              console.warn("yushijie");
              that.conferences = response.data.data;
              that.number = response.data.data.page_num;

              let results = that.conferences.result;
              for (let i = 0; i < results.length; i++) {
                let res = results[i];
                let img_num = that.getRandomInt(2, 6);
                res.conf_bg_img = "/static/bg" + img_num + ".jpg";
              }
            } else {
              M.toast({
                html:"<span style='font-weight: bold'> 请求错误:"+ resp.info +"</span>",
                classes: "rounded red"
              });
            }
          })
          .catch(function (error) {
            M.toast({
              html:"<span style='font-weight: bold'> 请求错误</span>",
              classes: "rounded red"
            });
          });
      },
      getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
      },
      setDateSearchState :function () {
        this.date_search_state=!(this.date_search_state);
      },
      date_search:function () {
        let keyword_info="none";
        if(this.is_keyword){
            keyword_info=this.$route.params.keyword;
            console.warn("zhuhui");
        }
        let date_type_info=this.date_type;
        let date_info;
        if(this.date_detail=="")
            date_info="Jul082018";
        else
            date_info=(this.date_detail).replace(/\s+/g,"");

        this.$router.push('/search/'+keyword_info+'/'+date_info+'/'+date_type_info);
        location.reload();
      }
    },
    created() {
    },
    mounted() {
      $(document).ready(function(){
      });

      this.init();
    },
    updated: function () {
      $('select').formSelect();
      let options = {
        onSelect: date => {
          date = date.toDateString().slice(4, 15);
          this.date_detail = date;
          console.log("tom");
        }
      };
      let elem = document.querySelector('#date-select');
      let instance = M.Datepicker.init(elem, options);
//      $('.datepicker').datepicker();
    },
  };
</script>

<style scoped>
  .searchBar {
    border-color: white;
    border-style: groove;
    border-width: 2px 2px;
    background-color: white;
  }

  .coference-title {
    margin: 0;
  }

  .coference-date {
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0;
  }

  .conference-introduction {
    font-size: 16px;
  }

  .customize {
    background-size: 100% !important;
    background-repeat: no-repeat !important;
    background-position: center center !important;
  }
</style>
