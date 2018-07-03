<template>
  <div>
    <NavBar></NavBar>
    <div class="carousel carousel-slider center" style="height: 30rem;margin-top:3rem;">
      <div class="carousel-fixed-item center">
        <a class="btn btn-large waves-effect white grey-text darken-text-4"
           style="bottom: 3rem; font-weight: bold;" @click="learn_more">
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
      <div style="padding-left: 7rem; padding-right: 7rem;">
        <div class="row">
          <div class="col s7"
               style="height:100%;">

            <ul class="collection with-header hoverable" style="height:100%;width:100%;margin:0;">
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
          <div class="col s5"
               style="margin-left:0; padding-bottom: 1rem;">
            <ul class="collection with-header hoverable" style="height:100%;width:100%;margin:0;">
              <li class="collection-header"><h4>近期事项</h4></li>
              <li class="collection-item">
                <div class="row valign-wrapper"
                     v-for="schedule in scheds"
                     style="margin-bottom: 0;">
                  <div class="col s2 center-align" style="padding-left: 0;">
                    <h5 style="margin: 0; font-weight: bold;">{{schedule.day}}</h5>
                    <p style="margin: 0;">{{schedule.month}}</p>
                  </div>
                  <div class="col s10">
                    <div class="card-panel white-text"
                         :class="schedule.color"
                         style="margin-top: 0; margin-bottom: 1rem;
                            padding-top: 0.5rem; padding-bottom: 0.5rem;
                            box-shadow: unset;">
                      <div class="row" style="margin: 0; font-weight: bold;">
                        {{schedule.conference.title}}
                      </div>
                      <div class="row" style="margin: 0;">
                        {{schedule.event}}
                      </div>
                    </div>
                  </div>
                </div>
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
            bg: "/static/bg1.jpg",
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
            bg: "/static/bg2.jpg",
          },
        ],
      },
      scheds: [
        {
          day: 5,
          month: "JUN",
          year: 2018,
          color: 'grey darken3',
          conference: {
            id: 1,
            title: "CVPR2018"
          },
          event: "公布接收稿件"
        },
        {
          day: 14,
          month: "FEB",
          year: 2019,
          color: 'purple lighten3',
          conference: {
            id: 1,
            title: "AAAI2018"
          },
          event: "开幕"
        },
        {
          day: 23,
          month: "OCT",
          year: 2018,
          color: 'teal darken3',
          conference: {
            id: 1,
            title: "IJCAI2018"
          },
          event: "开始征稿"
        },
        {
          day: 5,
          month: "JUN",
          year: 2018,
          color: 'blue darken3',
          conference: {
            id: 1,
            title: "CVPR2018"
          },
          event: "公布接收稿件"
        },
        {
          day: 14,
          month: "FEB",
          year: 2019,
          color: 'red darken3',
          conference: {
            id: 1,
            title: "AAAI2018"
          },
          event: "开幕"
        },
        {
          day: 23,
          month: "OCT",
          year: 2018,
          color: 'purple lighten3',
          conference: {
            id: 1,
            title: "IJCAI2018"
          },
          event: "开始征稿"
        },
      ],
    }
  },
  methods: {
    learn_more() {
      this.$router.push("/conference/1");
    }
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
  },
  beforeDestroy: function() {
    clearTimeout();
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
