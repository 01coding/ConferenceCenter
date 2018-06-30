<template>
  <div>
    <navbar></navbar>
    <div style="height:20px"></div>
    <div class="carousel carousel-slider">
      <a class="carousel-item"><img src="../../static/Image/W1.png"></a>
      <a class="carousel-item"><img src="../../static/Image/W2.png"></a>
      <a class="carousel-item"><img src="../../static/Image/W3.png"></a>
    </div>
    <div style="height:10px;"></div>


      <footer class="page-footer grey lighten-1" >
        <div class="container" style="width:100%;height:100%;">
          <div class="row" style="width:100%;">
            <div class="row" style="width:100%;">
              <span class="grey-text text-darken-4" style="position: absolute;left: 10px;">Association for the Advancement of Conferences </span>
            </div>
            <div class="row" style="width:100%;">
              <span class="grey-text text-darken-4" style="position: absolute;left: 10px;">Telephone: 18811526200   Email; 1479792108@qq.com</span>
            </div>
            <div class="row" style="width:100%;">
              <span class="grey-text text-darken-4" style="position: absolute;left: 10px;">Beihang University, Xueyuan Road   Haidian district, Beijing China</span>
            </div>
          </div>

        </div>

        <div class="footer-copyright grey" style="width:100%;position: absolute;left: 0px;margin:0px auto;">
          <span class="grey-text text-darken-4" style="position: absolute;left: 10px;">© 2018 Copyright.This site is protected by copyright and trademark laws under Chinese and International law. All rights reserved.</span>
        </div>
      </footer>
  </div>
</template>

<script>
import navbar from '@/include/NavBar';

export default{
  name:'Index',
  components: {navbar},
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
          shift:30,
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
