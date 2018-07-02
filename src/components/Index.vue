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
        <div style="height: 5rem"></div>
        <h3 style="font-size:2.5rem; font-weight: bold">{{slide.name}}</h3>
        <h5>{{slide.time}},&nbsp{{slide.venue}}</h5>
        <h5>{{slide.state}}</h5>
      </div>
    </div>

    <div class="grey section lighten-5" style="padding-top: 3rem; padding-bottom: 1rem;">
      <div style="padding-left: 8rem; padding-right: 3rem;">
        <div class="row">
          <div class="col s7 card-panel" style="height:100%;padding:0px 0px;">
            <ul class="collection with-header hoverable" style="height:100%;width:100%;margin:0px 0px;">
              <li class="collection-header"><h4>活跃学者</h4></li>
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
          <div class="col s4 card-panel" style="height:100%;padding:0px 0px;margin-left:2rem;">
            <ul class="collection with-header hoverable" style="height:100%;margin:0px 0px;">
              <li class="collection-header blue-grey white-text"><h4>近期事项</h4></li>
              <li class="collection-item blue-grey white-text">
                <p>2018.03.12 CVPR2018 开始征稿</p>
                <p>2018.05.24 AAAi2018 会议召开</p>
                <p>2018.05.24 IJCAI2017 宣布⼊入选⽂文章</p>
                <p>2018.03.12 CVPR2018 开始征稿</p>
                <p>2018.05.24 AAAi2018 会议召开</p>
                <p>2018.05.24 IJCAI2017 宣布⼊入选⽂文章</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="page-footer grey lighten-3">
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
  .title {
    font-weight: bold !important;
  }
  .index_page_slide {
    background-size: 100% !important;
    background-repeat: no-repeat !important;
    background-position: center center !important;
  }
  .famous-expert-institution{
    font-size: 14px;
  }
  .famous-expert-intro{
    font-size: 16px;
  }
</style>
