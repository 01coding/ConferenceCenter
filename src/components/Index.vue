<template>
  <div>
    <NavBar></NavBar>
    <div class="card" style="margin: 0;">
      <div class="carousel carousel-slider center" style="height: 30rem;">
        <div class="carousel-fixed-item center">
          <a class="btn btn-large waves-effect white grey-text darken-text-4"
             style="bottom: 3rem; font-weight: bold;">
            了解更多
          </a>
        </div>
        <div class="carousel-item white-text index_page_slide" href="#one!"
             v-for="slide in slides.slides"
             :style="{'background': slides.bg_overlay+'url('+slide.bg+')'}">
          <div style="height: 3rem"></div>
          <h3 style="font-size:2.5rem; font-weight: bold">{{slide.name}}</h3>
          <h5>{{slide.time}},&nbsp{{slide.venue}}</h5>
          <h5>{{slide.state}}</h5>
        </div>
      </div>
    </div>
    <div class="white section" style="padding-top: 5rem; padding-bottom: 5rem;">
      <!--<div class="container">-->
        <div class="row">
          <div class="col s7" style="padding-right: 5rem;margin-left:3em;">
            <ul class="collection with-header">
              <li class="collection-header"><h4>投稿积极学者</h4></li>
              <li class="collection-item avatar">
                <i class="material-icons circle">folder</i>
                <span class="title">Title</span>
                <p>First Line <br>
                  Second Line
                </p>
                <a class="secondary-content"><i class="material-icons">grade</i></a>
              </li>
            </ul>
          </div>
          <div class="col s4">
            <div class="card-panel blue-grey white-text">
              <h4>这里是会议日期</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
          </div>
        </div>
      <!--</div>-->
    </div>

    <div class="page-footer grey darken-4">
      <div class="footer-copyright">
        <div class="center container">
          © 2018 Copyright 探玩揽月
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Background from "../include/Background";
import NavBar from "../include/NavBar";
export default{
  name:'Index',
  components: {NavBar, Background},
  data: function(){
    return{
      slides: {
        instance: null,
        bg_overlay: "linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)),",
        slides: [
          {
            name: "AAAI Conference on Artificial Intelligence",
            time: "2018年2月7日",
            venue: "New Orleans Riverside, USA",
            state: "征稿中",
            bg: "/static/bg2.jpg",
          },
          {
            name: "IEEE Conference on Computer Vision and Pattern Recognition",
            time: "2018年8月9日",
            venue: "盐湖城, USA",
            state: "已开幕",
            bg: "/static/bg3.jpg",
          },
          {
            name: "Annual Conference on Neural Information Processing Systems",
            time: "2018年11月2日",
            venue: "Palais des Congres de Montreal, CANADA",
            state: "征稿中",
            bg: "/static/bg4.jpg",
          },
        ]
      },
    }
  },
  methods: {
  },
  created(){
    $(document).ready(function(){
      $('.carousel').carousel();
    });
    $('.carousel.carousel-slider').carousel({
      fullWidth: true,
      indicators: true
    });
    // setTimeout(autoplay, 5000);
    // function autoplay() {
    //   $('.carousel').carousel('next');
    //   setTimeout(autoplay, 5000);
    // }
  },
  mounted() {
  }
};
</script>

<style>
  .index_page_slide {
    background-size: 100% !important;
    background-repeat: no-repeat !important;
    background-position: center center !important;
  }
</style>
