<template>
  <div class="container" style="padding-top: 3%">
      <div class="col s12">
        <ul class="tabs">
          <li class="tab col s6"><a class="active" href="#tab1">未读</a></li>
          <li class="tab col s6"><a href="#tab2">已读</a></li>
        </ul>
      </div>
      <div id="tab1" class="col s12">
        <div class="row" style="padding-right: 1.2%;padding-left: 1.2%">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <h4 style="padding-top: 0;margin-top: 0">2018-7-6</h4>
              <p>I am a very simple card. I am good at containing small bits of information.
                I am convenient because I require little markup to use effectively.</p>
            </div>
            <div class="card-action right-align">
               <button class="btn green">标记为已读</button>
            </div>
          </div>
        </div>
        <div v-for="item in notReadYet">
          <div class="row">
            <span></span>
          </div>
          <div class="divider"></div>
        </div>
      </div>
      <div id="tab2" class="col s12">
        <div v-for="item in alreadyRead">
          <div class="row">
            <span>{{item.content}}</span>
          </div>
          <div class="divider"></div>
        </div>
      </div>
  </div>
</template>

<script>
    export default {
        name: "PersonalMessage",
        data:function(){
          return{
            notReadYet:[],
            alreadyRead:[]
          }
        },
        mounted(){
          this.$bus.emit('manage-change-title', {text: '我的消息'});
        },
        created(){
          $(document).ready(function(){
            $('.tabs').tabs();
          });

          let that = this;
          this.$axios.post('/api/user/messages', {index:1,size:5,state:0})
            .then(response => {
                for(item in response.data.data.messages){
                  if(item.state===0){
                    that.notReadYet.push(item);
                  }
                  else{
                    that.alreadyRead.push(item);
                  }
                }
              }
            ).catch(
            error => {
              M.toast({
                html: error,
                classes: "rounded red darken-2"
              });
            }
          );
        }
    }
</script>

<style scoped>

</style>
