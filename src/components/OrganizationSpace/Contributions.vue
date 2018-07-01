<template>
<div>
  <div class="row">
    <div class="col s12">
      <ul class="tabs">
        <!--<li class="tab col s3">Test 1</li>-->
        <!--<li class="tab col s3">Test 1</li>-->
        <!--<li class="tab col s3">Test 1</li>-->
        <!--<li class="tab col s3">Test 1</li>-->
        <!--<li class="tab col s2"><a href="#test1">全部 <span class="new badge blue">45</span></a></li>-->
        <li class="tab col s2"><a href="#all">全部 145</a></li>
        <li class="tab col s2"><a class="active" href="#passed">已通过 23</a></li>
        <li class="tab col s2"><a href="#pending">审核中 80</a></li>
        <li class="tab col s2"><a href="#fixing">修改中 20</a></li>
        <li class="tab col s2"><a href="#rejected">已拒绝 22</a></li>
      </ul>
    </div>
    <div id="all" class="col s12">
      <table class="striped">
        <thead>
          <tr>
            <th></th>
          </tr>
        </thead>
        <tbody>
        <tr v-for="item in all_list">

        </tr>
        </tbody>
      </table>
    </div>
    <div id="passed" class="col s12"></div>
    <div id="pending" class="col s12"></div>
    <div id="fixing" class="col s12"></div>
    <div id="rejected" class="col s12"></div>
  </div>
</div>
</template>

<script>
  export default {
    name: "Contributions",
    data: function() {
      return {
        conference_id: 1,
      }
    },
    created: function() {
      this.conference_id = parseInt(this.$route.params.id);
    },
    mounted: function() {
      $(document).ready(function() {
        $('.tabs').tabs();
      })
    }
  }
</script>

<style scoped>

</style>
