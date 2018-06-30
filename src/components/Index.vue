<template>
  <div>
        <navbar></navbar>
        <div class="carousel carousel-slider">
          <a class="carousel-item"><img src="../../static/Image/C1.png"></a>
          <a class="carousel-item"><img src="../../static/Image/C2.png"></a>
          <a class="carousel-item"><img src="../../static/Image/C3.png"></a>
        </div>
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
