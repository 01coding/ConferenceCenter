<template>
  <div>
    <NavBar></NavBar>
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

    <div class="white section" style="padding-top: 5rem; padding-bottom: 1rem;">
      <div style="padding-left: 3rem; padding-right: 3rem;">
        <div class="row">
          <div class="col s8">
            <ul class="collection with-header">
              <li class="collection-header"><h4>著名学者</h4></li>
              <li class="collection-item avatar">
                <img src="../../static/Image/C1.png" alt="" class="circle"></img>
                <span class="title">Qiang Yang</span>
                <p class="famous-expert-institution">HongKong University</p>
                <p style="height:10px;"></p>
                <p class="famous-expert-intro">Qiang Yang is Chair Professor and former Head of Department of Computer Science and Engineering at Hong Kong University of Science and Technology. He is president of the International Joint Conference on Artificial Intelligence.
                </p>
                <a class="secondary-content"><i class="material-icons">grade</i></a>
              </li>
              <li class="collection-item avatar">
                <img src="../../static/Image/C2.png" alt="" class="circle"></img>
                <span class="title">Dr. Michael S. Brown</span>
                <p class="famous-expert-institution">BSc PhD University of Kentucky</p>
                <p style="height:10px;"></p>
                <p class="famous-expert-intro">He is the Canada Research Chair in Computer Vision. His studys in several fields including omputer vision, image processing, and computer graphics.
                 He is the Demo Chair of CVPR 2014.</p>
                <a class="secondary-content"><i class="material-icons">grade</i></a>
              </li>
              <li class="collection-item avatar">
                <img src="../../static/Image/C3.png" alt="" class="circle"></img>
                <span class="title">Walter J. Scheirer</span>
                <p class="famous-expert-institution">University of Notre Dame</p>
                <p style="height:10px;"></p>
                <p class="famous-expert-intro">His research is primarily focused around the problem of recognition, including the representations and algorithms supporting solutions to it. He is particularly interested in features and learning-based methods that apply to both vision and language.</p>
                <a class="secondary-content"><i class="material-icons">grade</i></a>
              </li>
            </ul>
          </div>
          <div class="col s4">
            <div class="card-panel blue-grey white-text">
              <h4>近期事项</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer grey lighten-5">
      <div class="center containe grey-text"
           style="padding-bottom: 1rem;">
        © 2018 Copyright 探玩揽月
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
    setTimeout(autoplay, 5000);
    function autoplay() {
      $('.carousel').carousel('next');
      setTimeout(autoplay, 5000);
    }
  },
  mounted() {
  }
};
</script>

<style scoped>
  .index_page_slide {
    background-size: 100% !important;
    background-repeat: no-repeat !important;
    background-position: center center !important;
  }
  .famous-expert-institution{
    font-family:"Georgia";
    font-size: 12px;
  }
  .famous-expert-intro{
    font-family:"Times New Roman";
    font-size: 14px;
  }
</style>
