<template>
  <div>
    <background></background>
    <navbar></navbar>
    <!--<div style="height:20px"></div>-->
    <div class="carousel carousel-slider">
      <a class="carousel-item"><img src="../../static/Image/W1.png"></a>
      <a class="carousel-item"><img src="../../static/Image/W2.png"></a>
      <a class="carousel-item"><img src="../../static/Image/W3.png"></a>
    </div>
    <div style="height:10px;"></div>
    <div class="row">
        <!--<div class="col s1"></div>-->
        <div class="col s7 ">
          <ul class="collection with-header blue-grey lighten-3" style="width:100%;height:100%;margin-left: 30px;">
            <li class="collection-header"><h4>热点新闻</h4></li>
            <li class="collection-item avatar">
              <i class="material-icons circle deep-purple lighten-3">language</i>
              <span class="title">CVPR 2018 Best Paper Award: "Taskonomy: Disentangling Task Transfer Learning"</span>
              <p style="font-family:Times New Roman;margin-top:8px;font-size:14px;">Amir R. Zamir, Alexander Sax, William Shen, Leonidas J. Guibas, Jitendra Malik, and Silvio Savarese</p>
            </li>
            <li class="collection-item avatar">
              <i class="material-icons circle red lighten-1">language</i>
              <span class="title">Son of U.S. envoy to China using political ties to elevate his business</span>
              <p style="font-family:Times New Roman;margin-top:8px;font-size:14px;">Eric Branstad, son of U.S. Ambassador to China, Terry Branstad, has used his connections to President Trump to improve his business ties in the country, the Wall Street Journal reports.</p>
            </li>
            <li class="collection-item avatar">
              <i class="material-icons circle blue lighten-3">language</i>
              <span class="title">Military needs AI help from companies like Google</span>
              <p style="font-family:Times New Roman;margin-top:8px;font-size:14px;">James Holmes, the leader of the Air Force's Air Combat Command, said the government needs to work with technology companies to develop AI for military.</p>
            </li>
            <!--<li class="collection-item avatar">-->
              <!--<i class="material-icons circle grey lighten-1">language</i>-->
              <!--<span class="title">Convolutional Neural Networks with Alternately Updated Clique</span>-->
              <!--<p style="font-family:Times New Roman;margin-top:8px;font-size:14px;">Yibo Yang, Zhisheng Zhong, IJCAI 2018</p>-->
            <!--</li>-->
          </ul>
        </div>
        <div class="col s5">
          <ul class="collection with-header blue-grey lighten-3" style="margin-left: 30px;margin-right: 20px;">
            <li class="collection-header"><h4>重要日期</h4></li>
            <li class="collection-item">
              <div>2018.03.12 CVPR2018 开始征稿<a class="secondary-content "><i class="material-icons " >alarm</i></a></div>
            </li>
            <li class="collection-item avatar">
               2018
            </li>
            <li class="collection-item avatar">
              2018
            </li>
          </ul>
        </div>
        <!--<div class="col s1"></div>-->
    </div>


      <!--<footer class="page-footer grey lighten-1" >-->
        <!--<div class="container" style="width:100%;height:100%;">-->
          <!--<div class="row" style="width:100%;">-->
            <!--<div class="row" style="width:100%;">-->
              <!--<span class="grey-text text-darken-4" style="position: absolute;left: 10px;">Association for the Advancement of Conferences </span>-->
            <!--</div>-->
            <!--<div class="row" style="width:100%;">-->
              <!--<span class="grey-text text-darken-4" style="position: absolute;left: 10px;">Telephone: 18811526200   Email; 1479792108@qq.com</span>-->
            <!--</div>-->
            <!--<div class="row" style="width:100%;">-->
              <!--<span class="grey-text text-darken-4" style="position: absolute;left: 10px;">Beihang University, Xueyuan Road   Haidian district, Beijing China</span>-->
            <!--</div>-->
          <!--</div>-->

        <!--</div>-->

        <!--<div class="footer-copyright grey" style="width:100%;position: absolute;left: 0px;margin:0px auto;">-->
          <!--<span class="grey-text text-darken-4" style="position: absolute;left: 10px;">© 2018 Copyright.This site is protected by copyright and trademark laws under Chinese and International law. All rights reserved.</span>-->
        <!--</div>-->
      <!--</footer>-->
  </div>
</template>

<script>
import navbar from '@/include/NavBar';
import background from '@/include/Background';

export default{
  name:'Index',
  components: {navbar,background},
  data: function(){
      return{
        msg:undefined,
        instance_carousel: null
      }
  },
  methods: {
   carousel_move: function() {
       console.log(2);
       if(this.instance_carousel)
          this.instance_carousel.next();
       else
           console.log(3);
      setTimeout(this.carousel_move, 500);
    }
  },
  created(){


  },
  mounted(){
    console.log($);
    let options={'responsiveThreshold':1400};
    let option_carousel={
      duration:3000,
      dist: 0,
      padding: 0,
      fullWidth: true,
      indicators: true,
    };

    $(document).ready(function(){
      $('.carousel').carousel(
        {
          dist: 0,
          padding: 0,
          fullWidth: true,
          indicators: true,
          duration: 100,
          shift:50,
        }
      );
    });

    setTimeout(autoplay, 4500);
    function autoplay() {
      $('.carousel').carousel('next');
      setTimeout(autoplay, 4500);
    }
  }
};
</script>

<style>
</style>
