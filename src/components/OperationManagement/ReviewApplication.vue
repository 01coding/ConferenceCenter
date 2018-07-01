<template>
  <div>
    <NavBar></NavBar>
    <div class="container">
      <div class="section">
        <h5>主办方申请</h5>

      </div>
      <div class="divider"></div>
      <!--<div class="row">-->
      <!--<div class="col s12">-->
        <!--<h2 class="header">水平卡片</h2>-->
        <!--<div class="card horizontal sticky-action">-->
          <!--<div class="card-image">-->
            <!--<img src="../../assets/头像.png">-->
          <!--</div>-->
          <!--<div class="card-stacked">-->
            <!--<div class="card-content card-action">-->
              <!--<p>我是一个很简单的卡片。我很擅长于包含少量的信息。</p>-->
            <!--</div>-->
            <!--<div class="card-action">-->
              <!--<a href="#">这是一个链接</a>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--</div>-->

      <ul class="collection">
        <li class="collection-item avatar">
          <img src="../../assets/头像.png" alt="" class="circle">
          <span class="title">单位名称</span>
          <p>通讯地址 <br>
            单位介绍
          </p>
          <div  class="secondary-content">详情<i class="material-icons input">grade</i></div>
        </li>

      </ul>


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

    }
  }
</script>
