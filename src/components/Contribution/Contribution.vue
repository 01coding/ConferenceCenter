<template>
<div>
  <NavBar></NavBar>
  <div style="height: 3rem;"></div>
  <div class="container" style="max-width: 75rem;">
    <div class="card">
      <div class="card-content">
        <div class="row">
          <div class="col s12 center-align">
            <!--<span class="flow-text">Card Title</span>-->
            <h4 style="font-weight: bold; margin: 0;">{{contrib.title}}</h4>
          </div>
        </div>
        <div class="row center-align" style="margin-bottom: 0;">
          <div v-bind:class="'col s'+12/(contrib.authors.length < 4 ? contrib.authors.length: 4)"
               v-for="author in contrib.authors">
            <h5>{{author.name}}</h5>
            <p>{{author.institution}}</p>
            <p style="font-size: 1rem; font-family: 'Courier';">{{author.email}}</p>
          </div>
        </div>
      </div>
      <div class="card-action">
        <span>
          投稿至 <span class="chip" style="margin: 0;">{{contrib.conference}}</span>
        </span>
        <span class="right" style="line-height: 2.5rem;">
          <strong>创建于 4 天前</strong>&nbsp&nbsp&nbsp
          <strong class="blue-text">{{contrib.state}}</strong>
          </span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import NavBar from "../../include/NavBar";
export default {
  name: "Contribution",
  components: {NavBar},
  data: function() {
    return {
      contrib: {
        session_token: null,
        title: "Deep Hashing: A Joint Approach for Image Signature Learning",
        conference: "International Conference on Computer Vision 2019",
        state: "修改后录用",
        authors: [
          {
            name: "Yadong Mu",
            institution: "Institute of Computer Science and Technology Peking University, China",
            email: "myd@pku.edu.cn"
          },
          {
            name: "Zhu Liu",
            institution: "Multimedia Department AT&T Labs, U.S.A.",
            email: "zliu@researh.att.com"
          }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
