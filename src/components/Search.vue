<template>
  <div>
    <background></background>
    <navbar></navbar>
    <div class="valign-wrapper white" style="width: 100%; height: 10rem;">
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
    </div>
    <div style="height:20px;"></div>

    <div class="row container" style="max-width: 65rem;">
      <div class="card hoverable" v-if="conferences.total_num > 0" v-for="(res,id) in conferences.result" :key="id">
        <div class="card-image waves-effect waves-block waves-light"
             style="height: 8rem; background:black;">
          <img style="opacity: 0.5; object-fit: cover" :src="res.conf_bg_img">
          <!--TODO: 这里放会议的背景图-->
            <span class="card-title" style="font-weight: bold; cursor: pointer;" @click="$router.push('/conference/'+res.id)">
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
      }
    },
    methods: {
      init: function () {
        let keywords_param = this.$route.params.keyword;
        let that = this;
        // axios.post('http://118.89.229.204:8080/server-0.0.1-SNAPSHOT/api/SearchCoferences', {
        this.$axios.post('/api/SearchConferences', {
          "keyword": keywords_param,
          "index": 1,
          "size": 10
        }).then(function (response) {
          let resp = response.data;
          if (resp.status === "succ") {
            that.conferences = resp.data;
            that.number = resp.page_num;
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
      enter_search: function (event) {
        if (event.keyCode === 13 && this.search_keyword.length > 0)
          this.$router.push("/search/" + this.search_keyword);
      },
      page: function (page) {
        const field = this.search_field;
        let that = this;
        axios.post('http://118.89.229.204:8080/server-0.0.1-SNAPSHOT/api/SearchCoferences', {
          "keyword": field,
          "index": page,
          "size": 10
        }).then(function (response) {
            let resp = response.data;
            if (resp.status === "succ") {
              that.conferences = response.data.data;
              that.number = response.data.page_num;
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
      }
    },
    created() {
    },
    mounted() {
      this.init();
    }
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
