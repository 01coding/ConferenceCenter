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
            <input id="search" type="search" required>
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
          <li class="collection-item">
            <p style="margin:0px 0px;">ICCV2018: International Conference on Computer Vision</p>
            <p style="font-size:14px;margin:0px 0px;font-weight:100;font-family:Georgia;">held on 2018.5.7</p>
            <p style="font-family:Times New Roman;">ICCV is the premier international computer vision event comprising the main conference
              and several co-located workshops and tutorials. With its high quality and low cost, it
              provides an exceptional value for students, academics and industry researchers</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from '@/include/NavBar';
import background from '@/include/Background'
import getURL, {mapUrl} from '../router/APIget';
import axios from 'axios';

export default{
  name:'Search',
  components:{navbar,background, getURL, axios},
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
          pagination: {
            index: 1,
            size: 10,
            page_num: 1
          },
          list: [],
          total_num: 0
        },
      }
  },
  methods: {

  },
  created(){
    this.lazy_keyword = this.$route.params.keyword;
    console.log(this.$route.params.keyword)
    axios.post(mapUrl('Search'), {
      "keyword": 'IEEE',
      "index": 1,
      "size": 10
    })
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        that.resp = response.data;
        console.log(that.resp.data);
        that.getConferenceState();
      })
      .catch(function (error) {
        console.log('o');
        console.log(error);
      });
  },
  mounted(){

  }
};
</script>
