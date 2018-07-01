<template>
  <div>
    <background></background>
    <navbar></navbar>
    <div style="height:20px;"></div>
    <div class="row">
      <div class="col s8 offset-s2">
      <div class="nav-wrapper" style="border-style: groove; border-width: 2px 2px;background-color: white;">
        <form>
          <div class="input-field">
            <input id="search" type="search" v-model="search_keyword" @keypress="enter_search($event)">
            <label class="label-icon" for="search"><i class="material-icons">search</i></label>
            <i class="material-icons">close</i>
          </div>
        </form>
      </div>
      </div>
    </div>
    <div class="row">
      <div class="col s10 offset-s1">
        <ul class="collection">
          <li class="collection-item" v-for="(res,id) in conferences.result" :key="id">
            <router-link v-bind:to="'/conference/'+res.id"><p style="margin:0px 0px;">{{res.title}}</p></router-link>
            <p style="font-size:14px;margin:0px 0px;font-weight:100;font-family:Georgia;">Held on {{res.convening_date}}</p>
            <p style="font-family:Times New Roman;font-size:12px;">{{res.introduction}}</p>
          </li>
        </ul>
      </div>
    </div>
    <Pagination @page="page" v-bind:number="number" v-bind:current="current"
    style="margin-top: 1em"></Pagination>
  </div>
</template>

<script>
import navbar from '@/include/NavBar';
import background from '@/include/Background'
import getURL, {mapUrl} from '../router/APIget';
import axios from 'axios';
import Pagination from "@/include/Pagination";

export default{
  name:'Search',
  components:{navbar,background, getURL, axios, Pagination},
  data: function(){
      return{
        number: 1,
        current: 1,
        search_field: 0,
        search_keyword: "",
        lazy_keyword: "",
        related: [],
        loader: {
          active: false
        },
        conferences: {
          page_number:1,
          result: [],
          total_num: 10,
        },
      }
  },
  methods: {
      init: function(){
        let keywords_param=this.$route.params.keyword;
        console.log("Xingzhe");
        console.log(keywords_param);
        let that=this;
        axios.post('http://118.89.229.204:8080/server-0.0.1-SNAPSHOT/api/SearchCoferences', {
          "keyword": keywords_param,
          "index": 1,
          "size": 10
        })
          .then(function (response) {
            that.conferences=response.data.data;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
    enter_search: function (event) {
      if (event.keyCode === 13 && this.search_keyword.length>0 )
        this.$router.push("/search/" + this.search_keyword);
    },
  },
  created(){
//    this.lazy_keyword = this.$route.params.keyword;
//    console.log(this.$route.params.keyword)

  },
  mounted(){
    this.init();
  }
};
</script>
