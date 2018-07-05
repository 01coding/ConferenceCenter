<template>
  <div>
    <ul class="tabs">
      <li class="tab col s4"><a href="#test1" >审稿中</a></li>
      <li class="tab col s4"><a class="active" href="#test2">已录用</a></li>
      <li class="tab col s4"><a href="#test3">被拒稿</a></li>
    </ul>


    <div id="test1" class="col s12" style="padding-top: 1%">
      <div class="container">

            <div class="card" v-for="item in submissionsPending">
              <div class="card-content">
                <div class="row">
                  <div class="col s10 center-align">
                    <!--<span class="flow-text">Card Title</span>-->
                    <h5>{{item.title}}</h5>

                  </div>
                  <div class="col s2" style="text-align: right;">
                    <p style="color: #03a9f4">审稿中</p>
                    <p style="color: #4fc3f7">修改后录用</p>
                  </div>
                </div>
                <div class="row center-align">
                  <div v-bind:class="'col s'+12/item.author.length" v-for="author in item.author">
                    <p>{{author.email}}</p>
                    <p>{{author.name}}</p>
                  </div>

                </div>

              </div>
              <div class="card-action" style="text-align: right">
                <a href="#" style="color: #03a9f4">查看详情</a>
                <a href="#" style="color: #bf360c">放弃投稿</a>
              </div>
            </div>
          </div>
    </div>



    <div id="test2" class="col s12" style="padding-top: 1%">
      <div class="container">

        <div class="card" v-for="item in submissionsPassed">
          <div class="card-content">
            <div class="row">
              <div class="col s10 center-align">
                <!--<span class="flow-text">Card Title</span>-->
                <h5>{{item.title}}</h5>

              </div>
              <div class="col s2" style="text-align: right;">
                <p style="color: #03a9f4">已录用</p>
                <!--<p style="color: #4fc3f7">修改后录用</p>-->
              </div>
            </div>
            <div class="row center-align">
              <div v-bind:class="'col s'+12/item.author.length" v-for="author in item.author">
                <p>{{author.email}}</p>
                <p>{{author.name}}</p>
              </div>

            </div>

          </div>
          <div class="card-action" style="text-align: right">
            <a href="#" style="color: #03a9f4">查看详情</a>
            <!--<a href="#" style="color: #bf360c">放弃投稿</a>-->
          </div>
        </div>
      </div>
    </div>



    <div id="test3" class="col s12" style="padding-top: 1%">
      <div class="container">

        <div class="card" v-for="item in submissionsRejected">
          <div class="card-content">
            <div class="row">
              <div class="col s10 center-align">
                <!--<span class="flow-text">Card Title</span>-->
                <h5>{{item.title}}</h5>

              </div>
              <div class="col s2" style="text-align: right;">
                <p style="color: #03a9f4">已拒绝</p>
                <!--<p style="color: #4fc3f7">修改后录用</p>-->
              </div>
            </div>
            <div class="row center-align">
              <div v-bind:class="'col s'+12/item.author.length" v-for="author in item.author">
                <p>{{author.email}}</p>
                <p>{{author.name}}</p>
              </div>

            </div>

          </div>
          <div class="card-action" style="text-align: right">
            <a href="#" style="color: #03a9f4">查看详情</a>
            <!--<a href="#" style="color: #bf360c">放弃投稿</a>-->
          </div>
        </div>
      </div>
    </div>




  </div>
</template>

<script>
  export default {
    name:'MySubmissions',
    data:function () {
      return{
        submissionsPending:{},
        submissionsPassed:{},
        submissionsRejected:{}
      }
    },
    methods:{

    },
    created:function () {
      $(document).ready(function(){
        $('.tabs').tabs();
      });



      let that=this;
      this.$axios.post('/api/user/getContribution',{type:'pending'})
        .then(response=>{
          //console.log('ok');
          that.submissionsPending=response.data.data.contributions;
          console.log(JSON.stringify(that.submissionsPending));
        }).catch(error=>{
        M.toast({
          html: error,
          classes: "rounded red darken-2"
        });
      });


      this.$axios.post('/api/user/getContribution',{type:'passed'})
        .then(response=>{
          //console.log('ok');
          that.submissionsPassed=response.data.data.contributions;
          //console.log(JSON.stringify(that.submissionsPassed));
        }).catch(error=>{
        M.toast({
          html: error,
          classes: "rounded red darken-2"
        });
      });


      this.$axios.post('/api/user/getContribution',{type:'rejected'})
        .then(response=>{
          //console.log('ok');
          that.submissionsRejected=response.data.data.contributions;
          //console.log(JSON.stringify(that.submissionsPending));
        }).catch(error=>{
        M.toast({
          html: error,
          classes: "rounded red darken-2"
        });
      });
    },
    mounted:function () {
      this.$bus.emit('manage-change-title', { text: '我的投稿' });
    },
  }
</script>
