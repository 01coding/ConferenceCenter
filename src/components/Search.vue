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
                <input id="search" type="search" class="grey-text text-lighten-1"  v-model="search_keyword" @keypress="enter_search($event)">
                <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                <i class="material-icons">close</i>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div style="height:20px;"></div>

    <div class="row container">
      <div class="card" v-if="conferences.total_num > 0" v-for="(res,id) in conferences.result" :key="id">
        <div class="card-image waves-effect waves-block waves-light"
             style="height: 10rem; background:black;">
          <img class="activator" style="opacity: 0.5;" src="/static/bg2.jpg"></img>
          <!--TODO: 这里放会议的背景图-->
          <router-link v-bind:to="'/conference/'+res.id">
            <span class="card-title" style="font-weight: bold">
              {{res.title}}
            </span>
          </router-link>
        </div>
        <div class="card-content">
          <span class="card-title activator grey-text text-darken-4">
            <i class="material-icons right">arrow_upward</i>
          </span>
          <p>{{res.convening_date.substr(0, 10)}}, 会议地点, 会议状态</p>
        </div>
        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">
            {{res.title}}<i class="material-icons right">arrow_downward</i>
          </span>
          <p>{{res.introduction}}</p>
        </div>
      </div>
      <EmptyView  v-if="conferences.total_num <= 0" ></EmptyView>
    </div>
    <div class="center-align">
      <Pagination @page="page"
                  :number="number"
                  :current="current"
      ></Pagination>
    </div>
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
        axios.post('http://118.89.229.204:8080/server-0.0.1-SNAPSHOT/api/SearchCoferences', {
          "keyword": keywords_param,
          "index": 1,
          "size": 10
        })
          .then(function (response) {
            console.log(response);
            that.conferences = response.data.data;
            this.number = response.data.page_num;
            this.current = 1;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      enter_search: function (event) {
        if (event.keyCode === 13 && this.search_keyword.length > 0)
          this.$router.push("/search/" + this.search_keyword);
      },
      page: function (page) {
        const field = this.search_field;
        // console.log(page);
        let that = this;
        axios.post('http://118.89.229.204:8080/server-0.0.1-SNAPSHOT/api/SearchCoferences', {
          "keyword": field,
          "index": page,
          "size": 10
        })
          .then(function (response) {
            that.conferences = response.data.data;
            this.number = response.data.page_num;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
    },
    created() {
//    this.lazy_keyword = this.$route.params.keyword;
//    console.log(this.$route.params.keyword)

    },
    mounted() {
      this.init();
    }
  };
</script>

<style scoped>
.searchBar{
  border-color: white;
  border-style:groove;
  border-width: 2px 2px;
  background-color: white;
}
.coference-title{
  margin:0px 0px;
}
.coference-date{
  font-size:14px;
  margin:0px 0px;
  font-weight:100;
}
.conference-introduction{
  font-size:12px;
}
</style>
