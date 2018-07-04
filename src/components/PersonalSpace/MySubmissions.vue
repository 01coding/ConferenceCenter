<template>
  <div>
    <ul class="tabs">
      <li class="tab col s4"><a href="#test1" >审稿中</a></li>
      <li class="tab col s4"><a class="active" href="#test2">已录用</a></li>
      <li class="tab col s4"><a href="#test3">被拒稿</a></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name:'MySubmissions',
    data:function () {
      return{
        submissions:{

        }
      }
    },
    methods:{

    },
    created:function () {

    }
  }
</script>
