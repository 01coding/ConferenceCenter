<template>
  <div>
    <div>

    </div>
    <ul class="collapsible" id="collaps">
      <li v-for="data in apply">
        <div class="collapsible-header active"><i class="material-icons">filter_drama</i>{{apply.data.name}}</div>
        <div class="collapsible-body"><p>{{apply.data[applyNumber].location}}</p></div>
      </li>
    </ul>
  </div>
</template>

<script>
  import NavBar from "@/include/NavBar";
  export default {
    name:"ReviewApplication",
    components:{NavBar},
    data: function() {
      return {
        applyNumber: 0,
        apply: {
          data: {}
        }
      }
    },

    methods: function() {

    },

    created: function() {
      $(document).ready(function(){
        $('#collaps').collapsible();
      });

      this.$test.post('/review/application').then(response => {
        for(var i=0; i<response.data.length; i++) {
          this.apply.data = response.data[i];
          this.applyNumber = i;
          console.log(response.data[i]);
        }
      }).catch(error => {
        console.log(1);
      });
    }
  }

</script>
















<!--
<template>
  <div>
    <NavBar></NavBar>
    <div class="container">
      <div class="section">
        <h5>主办方申请</h5>

      </div>
      <div class="divider"></div>
      &lt;!&ndash;<div class="row">&ndash;&gt;
      &lt;!&ndash;<div class="col s12">&ndash;&gt;
        &lt;!&ndash;<h2 class="header">水平卡片</h2>&ndash;&gt;
        &lt;!&ndash;<div class="card horizontal sticky-action">&ndash;&gt;
          &lt;!&ndash;<div class="card-image">&ndash;&gt;
            &lt;!&ndash;<img src="../../assets/头像.png">&ndash;&gt;
          &lt;!&ndash;</div>&ndash;&gt;
          &lt;!&ndash;<div class="card-stacked">&ndash;&gt;
            &lt;!&ndash;<div class="card-content card-action">&ndash;&gt;
              &lt;!&ndash;<p>我是一个很简单的卡片。我很擅长于包含少量的信息。</p>&ndash;&gt;
            &lt;!&ndash;</div>&ndash;&gt;
            &lt;!&ndash;<div class="card-action">&ndash;&gt;
              &lt;!&ndash;<a href="#">这是一个链接</a>&ndash;&gt;
            &lt;!&ndash;</div>&ndash;&gt;
          &lt;!&ndash;</div>&ndash;&gt;
        &lt;!&ndash;</div>&ndash;&gt;
      &lt;!&ndash;</div>&ndash;&gt;
      &lt;!&ndash;</div>&ndash;&gt;

      <ul class="collection">
        <li class="collection-item avatar">
          <img src="../../assets/头像.png" alt="" class="circle">
          <span class="title">单位名称</span>
          <p>通讯地址 <br>
            单位介绍
          </p>
          <a  class="secondary-content" href="#modal1">详情<i class="material-icons input">grade</i></a>
        </li>

      </ul>

      <a class="waves-effect waves-light btn" href="#modal1">模态</a>

      &lt;!&ndash; Modal Structure &ndash;&gt;
      <div id="modal1" class="modal">
        <div class="modal-content">
          <h4>模态标题</h4>
          <p>一堆文本</p>
        </div>
        <div class="modal-footer">
          <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">同意</a>
        </div>
      </div>




      <table class="highlight centered responsive-table">
        <thead>
        <tr>
          <th data-field="id">单位名称</th>
          <th data-field="name">单位邮箱</th>
          <th data-field="price">单位介绍</th>
        </tr>
        </thead>

        <tbody>
        <tr>
          <td>张三</td>
          <td>17</td>
          <td>汉</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import NavBar from "../../include/NavBar";
  export default {
    name:"ReviewApplication",
    components:{NavBar},
    data:function () {
      return{
        apps:{

        }
      }
    },
    methods:{

    },
    created:function () {
      $(document).ready(function(){
        // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
        $('.modal').modal();
      });
    }
  }
</script>
-->
